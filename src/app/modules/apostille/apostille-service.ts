import { Injectable } from "@angular/core";
import { ApostilleState, initialState } from "./store/apostille.state";
import { GenericLocalService } from "../../shared/services/generic-local-service";

export abstract class IApostilleService extends GenericLocalService<ApostilleState>{ }

@Injectable()
export class ApostilleService  extends GenericLocalService<ApostilleState>{
  override storeName: string = 'apostille';
  override initialState: ApostilleState = initialState;
}
