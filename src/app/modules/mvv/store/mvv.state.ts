export interface MvvState {
  id: string;
  time: number;
  cost: number;
  done: boolean;
}

export const initialState: MvvState = {
  id: 'mvv',
  done: false,
  time: 4,
  cost: 0,
}
