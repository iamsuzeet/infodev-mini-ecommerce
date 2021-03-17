import { Dispatch } from "redux";

import { AppThunk } from "../../..";
import { apiList } from "../../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

type DocTypeResponse = {
  /**document type response */
  docTypeName: string, docTypeNameNp: string, id: number, size: number
}

const initialDocTypeState = initialState;
const apiDetails = Object.freeze(apiList.external.masterdata.docTypeListForImporterRegistration);

export default function docTypeForImporterRegReducer(state = initialDocTypeState, action: DefaultAction): DefaultState<DocTypeResponse[]> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getDocTypeForImporterReg = (): AppThunk<APIResponseDetail<DocTypeResponse[]>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData: null, disableSuccessToast: true });
};