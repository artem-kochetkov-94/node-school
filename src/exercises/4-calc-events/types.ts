export type CalcEventTypes = {
  sum: [arg1: number, arg2: number];
  multiply: [arg1: number, arg2: number];
};

export type Operations = {
  sum: (...args: unknown[]) => void;
  multiply: (...args: unknown[]) => void;
};
