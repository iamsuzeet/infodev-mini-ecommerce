import { Dispatch } from "redux";

import { AppThunk } from "../..";
import { apiList } from "../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";
import { RegisterCredentials } from "../../../core/Public/Register/Register";

type RegisterResponse = {
  /**register response */
  status: number
}

const initialRegisterState = initialState;
const apiDetails = Object.freeze(apiList.public.register);

export default function registerReducer(state = initialRegisterState, action: DefaultAction): DefaultState<RegisterResponse> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const registerUser = (requestData: RegisterCredentials): AppThunk<APIResponseDetail<RegisterResponse>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData });
};