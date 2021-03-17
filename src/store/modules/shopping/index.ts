import { combineReducers } from 'redux';
import getAllProductReducer from './get-all-product';
import cartReducer from './cart-reducer';

const shoppingReducer = combineReducers({
  getAllProductData: getAllProductReducer,
  cartData: cartReducer
})

export default shoppingReducer;