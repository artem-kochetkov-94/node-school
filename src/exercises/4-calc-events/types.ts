export type CalcEventTypes = {
  sum: [arg1: number, arg2: number];
  multiply: [arg1: number, arg2: number];
};

export type Operations = {
  sum: (a: number, b: number) => void;
  multiply: (a: number, b: number) => void;
};
