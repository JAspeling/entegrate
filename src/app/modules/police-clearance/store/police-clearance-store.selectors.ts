import { createFeatureSelector } from "@ngrx/store";
import { PoliceClearanceState } from "./police-clearance-store.state";

const featureSelector = createFeatureSelector<PoliceClearanceState>('police-clearance')
