import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Method } from 'axios';
import { Dispatch } from 'redux';

import initDispatchTypes from './default-action-type';
import initApiRequest from '../../services/api-request/api-request';
import { apiDetailType } from '../actionNames';
import { FailToast, SuccessToast } from '../../components/React/ToastNotifier/ToastNotifier';
import { requestTimeoutLanguage, noConnectionLanguage } from '../../i18n/i18n';

/**
 * Request details for XMLHTTP request
 */
interface APIRequestDetail {
    /**Request data for the API */
    requestData?: any;
    /**REST API Method */
    requestMethod?: Method;
    /**Request params */
    params?: { [key: string]: any }
    /**Axios cancel token source */
    cancelSource?: CancelTokenSource;
    /**Disable Success Toast */
    disableSuccessToast?: boolean;
    /**Disable Failure Toast */
    disableFailureToast?: boolean;
}

interface CustomResponse<TData = any> extends AxiosResponse {
    message: string;
    data: TData | null;
    status: number;
    noconnection: boolean;
    config: AxiosRequestConfig;
    isAxiosError: boolean;
}

export type APIResponseDetail<TData = any> = Promise<CustomResponse<TData>>

let timeoutLanguageCount = 0;
let noServerConnectionLanguageCount = 0;
let noConnectionLanguageCount = 0;
const axiosCancelSource = Axios.CancelToken.source();

/**
 * Manages API call and updates reducer with success or failure
 * @param apiDetails redux action and api config
 * @param dispatch redux dispatch function
 * @param apiRequestDetails request details for XMLHTTP request
 */
export default async function initDefaultAction(apiDetails: apiDetailType, dispatch: Dispatch, apiRequestDetails: APIRequestDetail = {}) {
    const { requestData, requestMethod, params, cancelSource, disableSuccessToast = false, disableFailureToast } = apiRequestDetails;

    // Init Dispatch Types
    const dispatchTypes = initDispatchTypes(apiDetails.actionName);

    // Progress Dispatch
    dispatch({ type: dispatchTypes.progressDispatch, payload: null });

    let responseData;
    try {
        responseData = await initApiRequest(apiDetails, requestData, requestMethod || apiDetails.requestMethod || "GET", params, cancelSource || axiosCancelSource);

        // Success Dispatch
        dispatch({ type: dispatchTypes.successDispatch, payload: responseData.data });
        if (disableSuccessToast) {
            // No work done
        } else {
            if (requestMethod !== "GET") {
                SuccessToast(responseData.data?.message)
            }
        }

    } catch (customThrownError) {
        responseData = customThrownError;

        // Failure Dispatch
        dispatch({ type: dispatchTypes.failureDispatch, payload: responseData.data });
        if (disableFailureToast) {
            // No work done
        } else {
            responseData.data?.message && FailToast(responseData.data.message);
        }

        // Axios Timeout
        if (responseData.config.code === 'ECONNABORTED') {
            if (!timeoutLanguageCount) {
                timeoutLanguageCount++;
                FailToast(requestTimeoutLanguage());
            }
        }

        // No Connection
        if (responseData.noconnection) {
            // No Server Connection
            if (responseData.message === 'Server could not be reached') {
                if (!noServerConnectionLanguageCount) {
                    noServerConnectionLanguageCount++;
                    FailToast(noConnectionLanguage());
                }
            }
            // No Connection
            else if (responseData.config.code !== 'ECONNABORTED') {
                if (!noConnectionLanguageCount) {
                    noConnectionLanguageCount++;
                    FailToast(noConnectionLanguage());
                }
            }
        }
    }

    return responseData.data as APIResponseDetail | Promise<any>;
};
