import { Dispatch } from "redux";

import { AppThunk } from "../../..";
import { apiList } from "../../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

type DistrictResponse = {
  /**District data response */
  id: number, nameNp: string, nameEn: string, code: string
}

const initialDistrictState = initialState;
const apiDetails = Object.freeze(apiList.external.masterdata.getDistrictList);

export default function allDistrictDataReducer(state = initialDistrictState, action: DefaultAction): DefaultState<DistrictResponse[]> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getAllDistrict = (): AppThunk<APIResponseDetail<DistrictResponse[]>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData: null, disableSuccessToast: true });
};