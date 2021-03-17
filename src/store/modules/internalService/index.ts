import { combineReducers } from "redux";
import userApprovalReducer from "./user-approval";
import zonalSetupDataReducer from "./zonalSetup";


const internalServiceReducer = combineReducers({
  zonalSetupData: zonalSetupDataReducer,
  userApprovalData: userApprovalReducer
})

export default internalServiceReducer;