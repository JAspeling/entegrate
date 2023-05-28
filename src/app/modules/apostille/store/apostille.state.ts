export interface ApostilleState {
  id?: string;
  time: number;
  cost: number;
  done: boolean;
  selectedOption: number;
}

export const initialState: ApostilleState = {
  selectedOption: 0,
  done: false,
  time: 4,
  cost: 0,
}
