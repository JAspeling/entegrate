export interface PoliceClearanceState {
  id: string;
  time: number;
  cost: number;
  done: boolean;
}

export const initialState: PoliceClearanceState = {
  id: 'police-clearance',
  done: false,
  time: 8,
  cost: 150
}
