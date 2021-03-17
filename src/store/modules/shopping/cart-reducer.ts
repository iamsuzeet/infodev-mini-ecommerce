import { addItemToCart, deleteItemFromCart, removeItemFromCart } from "utils/shopping/shopping-utils";
import * as actionTypes from "./actionType";

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        cartItems: deleteItemFromCart(state.cartItems, action.payload)
      }
    default:
      return state;
  }
};

export default cartReducer;