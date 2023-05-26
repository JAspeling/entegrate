export interface PoliceClearanceState {
  time: number;
  cost: number;
  done: boolean;
}

export const initialState: PoliceClearanceState = {
  done: false,
  time: 8,
  cost: 150
}
