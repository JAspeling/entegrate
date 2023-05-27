export interface AppState {
  name: string

  /**
   * Time is measured in weeks.
   */
  totalTime: number;
  currentTime: number;

  time: { [key: string]: number };
}

export const initialState: AppState = {
  name: 'Entegrate',
  time: {},
  totalTime: 0,
  currentTime: 0
}
