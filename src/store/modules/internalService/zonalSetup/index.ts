import { combineReducers } from "redux";
import allLocalBodyDataReducer from './getAllLocalBody';
import getDistrictByProvinceId from "./getDistrictByProvinceId";
import allProvinceDataReducer from './getAllProvince';

const zonalSetupDataReducer = combineReducers({
  allLocalBodyData: allLocalBodyDataReducer,
  allProvinceData: allProvinceDataReducer,
  getDistrictByProvinceIdData: getDistrictByProvinceId,
})

export default zonalSetupDataReducer