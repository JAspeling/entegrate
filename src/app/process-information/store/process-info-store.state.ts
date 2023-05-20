export interface ProcessInformationState {
  isOpen: boolean;

  peopleCount: number;
  // This might have a different flow if only one of the people has citizenship
  euCitizenship: boolean;
  partner: boolean;
  children: boolean;
  childrenCount: number;
  pets: boolean;
  petsCount: number;
}

export const initialState: ProcessInformationState = {
  isOpen: false,
  peopleCount: 1,
  euCitizenship: false,
  partner: false,
  children: false,
  childrenCount: 0,
  pets: false,
  petsCount: 0
}
