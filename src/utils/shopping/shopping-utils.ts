export const addItemToCart = (cartItems: any[], cartItemToAdd: any) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem }
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems: any[], cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem._id !== cartItemToRemove._id);
  }

  return cartItems.map(cartItem =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const deleteItemFromCart = (cartItems: any[], cartItemIdToRemove) => {
  return cartItems.filter(cartItem => cartItem._id !== cartItemIdToRemove);
}