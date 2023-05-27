import { CostTimeInterface } from "../../../shared/models/cost-time.interface";

export interface UnabridgedState extends CostTimeInterface {
  id?: string;
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
  time: 8,
  cost: 1500,
  error: null
}
