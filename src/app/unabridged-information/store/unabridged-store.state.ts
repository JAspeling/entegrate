import { UnabridgedOptions } from "../models/unabridged-options.interface";

export interface UnabridgedState {
  options: UnabridgedOptions;
  error: string;
}

export const initialState: UnabridgedState = {
  options: {
    selectedOption: 0,
    done: false
  },
  error: null
}
