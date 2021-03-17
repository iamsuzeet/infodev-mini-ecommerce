import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../actionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type ImporterDetailsResponse = {
  "orgBasicDetail": {
    "email": string;
    "aliascode": string;
    "companyRegNo": string;
    "panno": string;
    "registrationDate": string;
    "registrationDateNp": string;
    "vatno": string;
    "localBodyId": number;
    "organizationName": string;
    "district": string;
    "localbody": string;
    "id": number;
  },
  "documentList": [
    {
      "filename": string;
      "originalname": string;
      "docTypeName": string;
      "docTypeNameNp": string;
      "fileid": number;
      "size": number;
    }
  ],
  "orgContactPersonDetail": {
    "position": string;
    "panno": string;
    "mobileno": null,
    "phoneno": null,
    "name": string;
    "id": number;
  }
}

const initialImporterDetailsState = initialState;
const apiDetails = Object.freeze(apiList.external.importerDetails);

export default function importerDetailsExternalReducer(state = initialImporterDetailsState, action: DefaultAction): DefaultState<ImporterDetailsResponse> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getImporterDetailsExternal = (): AppThunk<APIResponseDetail<ImporterDetailsResponse>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch);
};