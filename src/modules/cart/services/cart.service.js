import * as _ from "lodash";

const updateCartDetails = async (cartList, cartToBeAdded, purpose) => {
  cartList = _UpdateCartListAndQuantity(cartList, cartToBeAdded, purpose);
  if (cartList.length > 0) {
    const totalPrice = _.sum(
      _.map(cartList, cart => {
        return cart.price * cart.quantity;
      })
    );
    return Promise.resolve({ cartList, totalPrice });
  } else {
    return Promise.reject(new Error("Nothing to be removed | added !"));
  }
};

const _UpdateCartListAndQuantity = (cartList, cartToBeAdded, purpose) => {
  const fetchPredicate = { id: cartToBeAdded.id };
  if (purpose === "remove") {
    _.remove(cartList, fetchPredicate);
  } else if (purpose === "add") {
    const cart = _.find(cartList, fetchPredicate);
    if (cart) {
      cart.quantity = Number(cart.quantity) + Number(cartToBeAdded.quantity);
    } else {
      cartList.push(cartToBeAdded);
    }
  }

  return cartList;
};

export { updateCartDetails };
