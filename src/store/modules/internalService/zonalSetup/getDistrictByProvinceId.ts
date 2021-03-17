import { Dispatch } from "redux";

import { AppThunk } from "../../..";
import { apiList } from "../../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

type DistrictBodyResponse = {
  /**register response */
  data?: { id: number, nameEn: string, nameNp: string, code: string }[]
}

const initialDistrictByProvinceState = initialState;
const apiDetails = Object.freeze(apiList.internal.zonalSetup.getDistrictByProvinceId);

export default function getDistrictByProvinceIdDataReducer(state = initialDistrictByProvinceState, action: DefaultAction): DefaultState<DistrictBodyResponse> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getDistrictByProvinceId = (provinceId: string): AppThunk<APIResponseDetail<DistrictBodyResponse>> => async (dispatch: Dispatch) => {
  let newApiDetails = { ...apiDetails }
  newApiDetails.controllerName = newApiDetails.controllerName.replace("{provinceId}", provinceId)
  return await initDefaultAction(newApiDetails, dispatch, { requestData: null });
};