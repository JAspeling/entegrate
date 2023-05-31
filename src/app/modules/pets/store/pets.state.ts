export interface PetsState {
  id: string;
  cost: number;
  time: number;
  done: boolean;
  petsCount: number;
  arriveTogether: boolean;
  selectedOption: number;
}

export const initialState: PetsState = {
  id: 'pets',
  done: false,
  cost: 0,
  time: 12,
  petsCount: 0,
  arriveTogether: false,
  selectedOption: 1
}
