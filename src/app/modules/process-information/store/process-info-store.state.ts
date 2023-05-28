import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface ProcessInformationState {
  isOpen: boolean;

  // This might have a different flow if only one of the people has citizenship
  euCitizenship: boolean;
  partner: boolean;
  married: boolean;
  children: boolean;
  childrenCount: number;
  pets: boolean;
  petsCount: number;
  cost?: number;
  time?: number;
  startDate?: NgbDateStruct;
}

export const initialState: ProcessInformationState = {
  isOpen: true,
  euCitizenship: false,
  partner: false,
  married: false,
  children: false,
  childrenCount: 0,
  pets: false,
  petsCount: 0,
  startDate: null,
}
