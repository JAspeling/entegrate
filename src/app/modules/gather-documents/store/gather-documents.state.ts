export interface GatherDocsState {
  id?: string;
  done: boolean;
  cost: number;
  time: number;
}

export const initialState: GatherDocsState = {
  done: false,
  cost: 0,
  time: 1,
}
