export interface GatherDocsState {
  id: string;
  done: boolean;
  cost: number;
  time: number;
}

export const initialState: GatherDocsState = {
  id: 'gather-docs',
  done: false,
  cost: 0,
  time: 1,
}
