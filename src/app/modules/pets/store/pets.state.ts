export interface PetsState {
  id: string;
  cost: number;
  time: number;
  done: boolean;
  petsCount: number;
  arriveTogether: boolean;
  selectedOption: number;

  microchip: boolean;
  rabies_vaccination: boolean;
  antibody_titre: boolean;
  normal_vaccinations: boolean;
  non_commercial_certificate: boolean;
  commercial_certificate: boolean;
  tapeworm_treatment: boolean;
}

export const initialState: PetsState = {
  id: 'pets',
  done: false,
  cost: 0,
  time: 12,
  petsCount: 0,
  arriveTogether: false,
  selectedOption: 1,

  microchip: false,
  rabies_vaccination: false,
  antibody_titre: false,
  normal_vaccinations: false,
  non_commercial_certificate: false,
  commercial_certificate: false,
  tapeworm_treatment: false,
}
