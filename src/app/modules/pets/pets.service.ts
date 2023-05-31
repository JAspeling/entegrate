import { Injectable } from "@angular/core";
import { GenericLocalService } from "../../shared/services/generic-local-service";
import { initialState, PetsState } from "./store/pets.state";

export abstract class IPetsService extends GenericLocalService<PetsState> {}

@Injectable()
export class LocalPetsService extends IPetsService {
  override readonly storeName = 'pets';
  override readonly initialState: PetsState = initialState;
}
