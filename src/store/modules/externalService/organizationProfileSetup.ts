import { Dispatch } from "redux";

import { AppThunk } from "../..";
import { apiList } from "../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

type ProfileSetupResponse = number

const initialProfileSetupState = initialState;
const apiDetails = Object.freeze(apiList.external.profileSetup);

export default function organizationProfileSetupReducer(state = initialProfileSetupState, action: DefaultAction): DefaultState<ProfileSetupResponse> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const organizationProfileSetupAction = (requestData: any): AppThunk<APIResponseDetail<any>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData });
};