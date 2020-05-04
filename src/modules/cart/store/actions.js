// Mutation Types
import { SET_CART } from "./mutations.types";
import * as api from "../services/cart.service";
import * as storage from "./../../../common/services/storage.service";

const actions = {
  async updateCart(context, payload) {
    try {
      const { cart, purpose } = payload;
      const response = await api.updateCartDetails(
        context.state.cart.cartList,
        cart,
        purpose
      );
      context.commit(SET_CART, undefined);
      storage.setLocalStorageItem("cart", response);
      context.commit(SET_CART, response);
    } catch (error) {
      context.commit(SET_CART, {
        cartList: [],
        totalPrice: 0
      });
    }
  },
  verifyCartStorage(context) {
    const cart = storage.getLocalStorageItem("cart");
    if (cart) {
      context.commit(SET_CART, cart);
    }
  },
  clearCart(context) {
    context.commit(SET_CART, {
      cartList: [],
      totalPrice: 0
    });
  }
};

export default actions;
