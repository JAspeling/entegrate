export interface IProcessInformation {
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
