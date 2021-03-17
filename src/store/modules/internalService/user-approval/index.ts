import {combineReducers} from 'redux';
import approvalPendingListReducer from './approval-pending-list';
import importerDetailsReducer from './fetch-importer-details';

const userApprovalReducer = combineReducers({
    approvalPendingListData: approvalPendingListReducer,
    importerDetailsData: importerDetailsReducer
});

export default userApprovalReducer;
