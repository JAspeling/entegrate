import { CostTimeInterface } from "../../models/cost-time.interface";

export interface UnabridgedState extends CostTimeInterface {
  options: CostTimeInterface;
  selectedOption: number;
  done: boolean;
  time: number;
  cost: number;
  error: string;
}

export const initialState: UnabridgedState = {
  options: {
    cost: 0,
    time: 0
  },
  selectedOption: 0,
  done: false,
  time: 0,
  cost: 0,
  error: null
}
