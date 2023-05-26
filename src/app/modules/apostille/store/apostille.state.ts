export interface ApostilleState {
  time: number;
  cost: number;
  done: boolean;
}

export const initialState: ApostilleState = {
  done: false,
  time: 4,
  cost: 0,
}
