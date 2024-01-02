import { assertNonNull } from '@dozerg/condition';

export interface Task<T> {
  data: T;
  time: number;
  next?: Task<T>;
  deps?: { worker: Worker; tasks: Task<T>[] };
  start?: number;
  // internal
  nonTrivial?: boolean;
}

export interface Worker {
  name: string;
  // internal
  slots?: { start: number; end: number }[];
}

export function solve<T>(tasks: Task<T>[]) {
  init(tasks);
  const result = helper(tasks);
  result.steps.forEach(s => (s.task.start = s.start));
  return result.time;
}

function init<T>(tasks: Task<T>[]) {
  const map = tasks.reduce((m, t) => {
    if (t.deps) {
      const key = t.deps.worker.name;
      m.set(key, (m.get(key) ?? 0) + 1);
    } else startTask(t); // Start tasks without deps.
    return m;
  }, new Map<string, number>());
  tasks.forEach(t => {
    if (!t.deps) return;
    const key = t.deps.worker.name;
    const count = map.get(key);
    assertNonNull(count);
    if (count > 1) t.nonTrivial = true; // A task is non-trivial if there are other tasks for the same worker.
  });
}

interface Result<T> {
  time: number;
  steps: { task: Task<T>; start: number }[];
}

function helper<T>(tasks: Task<T>[]): Result<T> {
  const { trivial, nonTrivial } = findReadyTasks(tasks);
  if (trivial.length + nonTrivial.length < 1) return translateToResult(tasks);
  trivial.forEach(startTask); // Start trivial tasks right away.
  let result = trivial.length < 1 ? translateToResult<T>([]) : helper(tasks);
  for (const task of nonTrivial) {
    startTask(task);
    const r = helper(tasks);
    if (result.time <= 0 || result.time > r.time) result = r;
    revertTask(task);
  }
  trivial.forEach(revertTask);
  return result;
}

function startTask<T>(task: Task<T>) {
  const startMin = findStartTime(task);
  task.start = task.deps ? findTimeSlot(task.deps.worker, startMin, task.time) : startMin;
}

function revertTask<T>(task: Task<T>) {
  if (task.deps) {
    task.deps.worker.slots = task.deps.worker.slots?.filter(s => s.start != task.start);
  }
  task.start = undefined;
}

function findTimeSlot(worker: Worker, start: number, time: number) {
  if (!worker.slots) worker.slots = [];
  const end = start + time;
  if (worker.slots.length < 1) {
    worker.slots.push({ start, end });
    return start;
  }
  let prev = start;
  for (const slot of worker.slots) {
    if (prev + time <= slot.start) break;
    else if (prev < slot.end) prev = slot.end;
  }
  worker.slots.push({ start: prev, end: prev + time });
  worker.slots.sort((a, b) => a.start - b.start);
  return prev;
}

function translateToResult<T>(tasks: Task<T>[]): Result<T> {
  const steps = tasks.map(task => {
    assertNonNull(task.start);
    return { task, start: task.start };
  });
  const time = Math.max(0, ...steps.map(s => s.start + s.task.time));
  return { time, steps };
}

function findReadyTasks<T>(tasks: Task<T>[]) {
  return tasks.reduce(
    (r, task) => {
      if (task.start !== undefined || task.deps?.tasks.some(t => t.start === undefined)) return r;
      if (task.nonTrivial) r.nonTrivial.push(task);
      else r.trivial.push(task);
      return r;
    },
    { trivial: new Array<Task<T>>(), nonTrivial: new Array<Task<T>>() },
  );
}

function findStartTime<T>(task: Task<T>) {
  if (!task.deps) return 0;
  return Math.max(
    ...task.deps.tasks.map(t => {
      assertNonNull(t.start);
      return t.start + t.time;
    }),
  );
}
