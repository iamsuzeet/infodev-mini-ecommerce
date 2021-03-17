import { Dispatch } from "redux";

import { AppThunk } from "../../..";
import { apiList } from "../../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

type LocalBodyResponse = {
  id: number, nameNp: string, nameEn: string, code: string
}

const initialLocalBodyByDistrictState = initialState;
const apiDetails = Object.freeze(apiList.external.masterdata.getLocalBodyByDistrictId);

export default function getLocalBodyByDistrictIdDataReducer(state = initialLocalBodyByDistrictState, action: DefaultAction): DefaultState<LocalBodyResponse[]> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getLocalBodyByDistrictId = (districtId: string): AppThunk<APIResponseDetail<LocalBodyResponse[]>> => async (dispatch: Dispatch) => {
  let newApiDetails = { ...apiDetails }
  newApiDetails.controllerName = newApiDetails.controllerName.replace("{districtId}", districtId)
  return await initDefaultAction(newApiDetails, dispatch, { requestData: null, disableSuccessToast: true });
};