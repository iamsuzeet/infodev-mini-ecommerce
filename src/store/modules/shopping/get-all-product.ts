import { Dispatch } from "redux";
import { AppThunk } from "store";
import { apiList } from "store/actionNames";
import initDefaultAction, { APIResponseDetail } from "store/helper/default-action";
import initDefaultReducer from "store/helper/default-reducer";
import initialState from "store/helper/default-state";


type ProductDataResponse = {
  data: {
    /**register response */
    price: number,
    status: boolean,
    category: any,
    images: string[],
    ratingQuantity: number,
    ratingAverage: number,
    _id: string,
    name: string,
    description: string,
    imageCover: string
  }[]

}

const apiDetails = Object.freeze(apiList.shopping.getAllProduct);

export default function getAllProductReducer(state = initialState, action: DefaultAction): DefaultState<ProductDataResponse> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getAllProduct = (): AppThunk<APIResponseDetail<ProductDataResponse>> => async (dispatch: Dispatch) => {

  return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: false });
};