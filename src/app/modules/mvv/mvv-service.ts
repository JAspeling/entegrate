import { Injectable } from "@angular/core";
import { initialState, MvvState } from "./store/mvv.state";
import { GenericLocalService } from "../../shared/services/generic-local-service";

export abstract class IMvvService extends GenericLocalService<MvvState>{ }

@Injectable()
export class LocalMvvService extends GenericLocalService<MvvState> {
  override storeName: string = 'mvv';
  override initialState: MvvState = initialState;
}
