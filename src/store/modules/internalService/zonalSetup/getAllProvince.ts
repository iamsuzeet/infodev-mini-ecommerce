import { Dispatch } from "redux";

import { AppThunk } from "../../..";
import { apiList } from "../../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

type LocalBodyResponse = {
  /**register response */
  data?: { label: string, value: string }[]
}

const initialProvinceState = initialState;
const apiDetails = Object.freeze(apiList.internal.zonalSetup.getAllProvince);

export default function allProvinceDataReducer(state = initialProvinceState, action: DefaultAction): DefaultState<LocalBodyResponse> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getAllProvince = (): AppThunk<APIResponseDetail<LocalBodyResponse>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData: null });
};