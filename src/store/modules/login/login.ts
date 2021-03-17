import { Dispatch } from "redux";

import { AppThunk } from "../..";
import { apiList } from "../../actionNames";
import { UserCredentials } from "../../../core/Public/Login/Login";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDispatchTypes from "../../helper/default-action-type";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";
import TokenService from "../../../services/jwt-token/jwt-token";

type LoginResponse = {
    /**jwt access token */
    "access_token": string,
    "token_type": "bearer",
    "refresh_token": string,
    "expires_in": number,
    "scope": "read write"
}

const initialLoginState = initialState;
const apiDetails = Object.freeze(apiList.oauth.login);

export default function loginReducer(state = initialLoginState, action: DefaultAction): DefaultState<LoginResponse> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const loginUser = (requestData: UserCredentials): AppThunk<Promise<LoginResponse>> => async (dispatch: Dispatch) => {
    const loginData = await initDefaultAction(apiDetails, dispatch, { requestData, disableSuccessToast: true });

    if (loginData && loginData?.access_token && typeof loginData?.access_token === "string") {
        const dispatchTypes = initDispatchTypes(apiDetails.actionName);
        // Override login dispatch to remove data except access_token
        dispatch({ type: dispatchTypes.successDispatch, payload: { status: 1, data: loginData.access_token } });

        TokenService.setToken(loginData.access_token);
    }

    return loginData;
};