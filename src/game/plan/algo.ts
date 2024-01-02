import { assertNonNull } from '@dozerg/condition';

export interface Task {
  name: string;
  time: number;
  next?: Task;
  deps?: { worker: Worker; tasks: Task[] };
  start?: number;
  // internal
  nonTrivial?: boolean;
}

export interface Worker {
  name: string;
  // internal
  slots?: { start: number; end: number }[];
}

export function solve(tasks: Task[]) {
  if (tasks.length < 1) return 0;
  init(tasks);
  const result = helper(tasks);
  result.steps.forEach(s => (s.task.start = s.start));
  return result.time;
}

function init(tasks: Task[]) {
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

interface Result {
  time: number;
  steps: { task: Task; start: number }[];
}

function helper(tasks: Task[]): Result {
  const { trivial, nonTrivial } = findReadyTasks(tasks);
  if (trivial.length + nonTrivial.length < 1) return translateToResult(tasks);
  trivial.forEach(startTask); // Start trivial tasks right away.
  let result: Result = { time: -1, steps: [] };
  for (const task of nonTrivial) {
    startTask(task);
    const r = helper(tasks);
    if (result.time < 0 || result.time > r.time) result = r;
    revertTask(task);
  }
  trivial.forEach(revertTask);
  return result;
}

function startTask(task: Task) {
  const startMin = findStartTime(task);
  task.start = task.deps ? findTimeSlot(task.deps.worker, startMin, task.time) : startMin;
}

function revertTask(task: Task) {
  if (task.nonTrivial && task.deps) {
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
  let prev = 0;
  for (const slot of worker.slots) {
    if (end <= slot.start && prev + time <= slot.start) {
      prev = Math.max(prev, start);
      break;
    } else prev = slot.end;
  }
  worker.slots.push({ start: prev, end: prev + time });
  worker.slots.sort((a, b) => a.start - b.start);
  return prev;
}

function translateToResult(tasks: Task[]) {
  const steps = tasks.map(task => {
    assertNonNull(task.start);
    return { task, start: task.start };
  });
  const time = Math.max(...steps.map(s => s.start + s.task.time));
  return { time, steps };
}

function findReadyTasks(tasks: Task[]) {
  return tasks.reduce(
    (r, task) => {
      if (task.start !== undefined || task.deps?.tasks.some(t => t.start === undefined)) return r;
      if (task.nonTrivial) r.nonTrivial.push(task);
      else r.trivial.push(task);
      return r;
    },
    { trivial: new Array<Task>(), nonTrivial: new Array<Task>() },
  );
}

function findStartTime(task: Task) {
  if (!task.deps) return 0;
  return Math.max(
    ...task.deps.tasks.map(t => {
      assertNonNull(t.start);
      return t.start + t.time;
    }),
  );
}
