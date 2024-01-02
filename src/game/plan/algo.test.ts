import {
  solve,
  Task,
} from './algo';

describe('Algo', () => {
  const WORKER = { name: 'WA' };

  type TT = Task<string>;

  const A: TT = {
    data: 'A',
    time: 10,
  };
  const B: TT = {
    data: 'B',
    time: 20,
  };
  const C: TT = {
    data: 'C',
    time: 15,
    deps: {
      worker: WORKER,
      tasks: [A],
    },
  };
  const D: TT = {
    data: 'D',
    time: 50,
    deps: {
      worker: WORKER,
      tasks: [B],
    },
  };
  const E: TT = {
    data: 'E',
    time: 10,
    deps: {
      worker: WORKER,
      tasks: [C, D],
    },
  };

  C.next = D.next = E;
  B.next = D;
  A.next = C;

  const tasks = [A, B, C, D, E];
  it('should work', () => {
    const time = solve(tasks);
    console.log('Time:', time);
    console.log('tasks:', tasks);

    expect(time > 0).toBeTruthy();
  });
});
