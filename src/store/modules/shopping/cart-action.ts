import * as actionTypes from "./actionType";


export const addItem = (item: any) => ({
  type: actionTypes.ADD_ITEMS,
  payload: item
});

export const removeItem = (item: any) => ({
  type: actionTypes.REMOVE_ITEM,
  payload: item
});

export const deleteItem = (id: any) => ({
  type: actionTypes.DELETE_ITEM,
  payload: id
})
