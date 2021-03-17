import { combineReducers } from "redux";
import organizationProfileSetupReducer from './organizationProfileSetup';
import masterDataReducer from "./masterdata";
import importerDetailsExternalReducer from "./get-importer-details-external";

const externalServiceReducer = combineReducers({
  organizationProfileSetupData: organizationProfileSetupReducer,
  externalMasterData: masterDataReducer,
  importerDetailsExternalData: importerDetailsExternalReducer
})

export default externalServiceReducer;