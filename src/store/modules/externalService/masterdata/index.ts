import { combineReducers } from "redux";
import allDistrictDataReducer from "./getDistrictList";
import docTypeForImporterRegReducer from './getDocTypeForImporterRegistration';
import getLocalBodyByDistrictIdDataReducer from "./getLocalBodyByDistrictId";

const masterDataReducer = combineReducers({
  docTypeForImporterRegData: docTypeForImporterRegReducer,
  getLocalBodyByDistrictIdData: getLocalBodyByDistrictIdDataReducer,
  getAllDistrictData: allDistrictDataReducer
})

export default masterDataReducer