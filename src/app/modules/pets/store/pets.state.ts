export interface PetsState {
  id: string;
  cost: number;
  time: number;
  done: boolean;
}

export const initialState: PetsState = {
  id: 'pets',
  done: false,
  cost: 0,
  time: 12,
}
