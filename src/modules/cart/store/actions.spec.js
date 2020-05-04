jest.mock("../services/cart.service");
jest.mock("./../../../common/services/storage.service");
import { SET_CART } from "./mutations.types";
import { CART } from "../../../common/mocks/object-models";
import { updateCartDetails } from "../services/cart.service";
import { getLocalStorageItem, setLocalStorageItem } from "./../../../common/services/storage.service";
import store from "./index";

const { state, actions } = store;

describe("cart actions", () => {
  it('Should dispatch "getProductsAction" action and commit PRODUCT_LIST_RESULT mutation', async () => {
    updateCartDetails.mockResolvedValue(CART);
      // setLocalStorageItem.mockReturnValue(true);
    const commit = jest.fn();
    const payload = {
      cart: CART.cartList[0],
      purpose: "add"
    };
    await actions.updateCart({ commit, state }, payload);

    expect(updateCartDetails).toHaveBeenCalledWith(
      state.cart.cartList,
      payload.cart,
      "add"
    );
    expect(commit).toHaveBeenCalledWith(SET_CART, CART);
  });

  it('Should dispatch "getProductsAction" action and initialize SET_CART', () => {
    updateCartDetails.mockRejectedValueOnce("ERROR");
      const commit = jest.fn();
    const payload = {
      cart: CART.cartList[0],
      purpose: "add"
    };
    actions.updateCart({ commit, state }, payload).catch(error => {
      expect(error).toEqual("ERROR");
      expect(updateCartDetails).toHaveBeenCalledWith(
        state.cart.cartList,
        payload.cart,
        "add"
      );
      expect(commit).toHaveBeenCalledWith(SET_CART, state.cart);
    });
  });

  it('Should dispatch "clearCart" action and initialize SET_CART', () => {
    const commit = jest.fn();
    actions.clearCart({ commit });
  });

  it('Should dispatch "verifyCartStorage" action and initialize SET_CART from local storage', () => {
      getLocalStorageItem.mockReturnValue(true);
      const commit = jest.fn();
      actions.verifyCartStorage({ commit });
      expect(commit).toHaveBeenCalled();
  });
});
