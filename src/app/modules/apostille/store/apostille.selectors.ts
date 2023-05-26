import { createFeatureSelector } from "@ngrx/store";
import { ApostilleState } from "./apostille.state";

const getFeatureSelector = createFeatureSelector<ApostilleState>("apostille");

