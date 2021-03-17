import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";


export type ApprovalPendingListResponse = {
    "district": string;
    "aliascode": string;
    "organizatonName": string;
    "companyRegNo": string;
    "registrationDate": string;
    "registrationDateNp": string;
    "panno": string;
    "vatno": string;
    "email": string;
    "documentPojoList": null,
    "localbody": string;
    "localBodyId": number;
    "id": number;
}

const initialApprovalPendingListState = initialState;
const apiDetails = Object.freeze(apiList.internal.approvalPendingList);

export default function approvalPendingListReducer(state = initialApprovalPendingListState, action: DefaultAction): DefaultState<ApprovalPendingListResponse[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getApprovalPendingList = (): AppThunk<APIResponseDetail<ApprovalPendingListResponse[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true });
};