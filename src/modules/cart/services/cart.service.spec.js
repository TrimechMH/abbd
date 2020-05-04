import Vue from "vue";
import VueResource from "vue-resource";

import { updateCartDetails } from "./cart.service";
import {
  MOCK_PRODUCT_RESULT_LIST,
  CART
} from "../../../common/mocks/object-models";
Vue.use(VueResource);

describe("products service ", () => {
  it("should update cart details & calculate total price after adding new cart", async () => {
    const response = await updateCartDetails(
      CART.cartList,
      { ...MOCK_PRODUCT_RESULT_LIST[2], quantity: 12 },
      "add"
    );

    expect(response.cartList.length).toEqual(2);
    expect(response.cartList[0].quantity).toEqual(1);
    expect(response.cartList[1].quantity).toEqual(12);
    expect(response.totalPrice).toEqual(19050);
  });

  it("should update cart details & calculate total price after adding new cart without duplication", async () => {
    const response = await updateCartDetails(
      CART.cartList,
      { ...MOCK_PRODUCT_RESULT_LIST[0], quantity: 1 },
      "add"
    );

    expect(response.cartList.length).toEqual(2);
    expect(response.cartList[0].quantity).toEqual(2);
    expect(response.cartList[1].quantity).toEqual(12);
    expect(response.totalPrice).toEqual(20100);
  });

  it("should update cart details & total price after removing a cart", async () => {
    const response = await updateCartDetails(
      CART.cartList,
      CART.cartList[0],
      "remove"
    );
    expect(response.cartList.length).toEqual(1);
    expect(response.cartList[0].quantity).toEqual(12);
    expect(response.totalPrice).toEqual(18000);
  });

  it("should not update cart details after adding new cart and show error message", async () => {
    await updateCartDetails([], {}, "other").catch(error => {
      expect(error.toString()).toEqual(
        "Error: Nothing to be removed | added !"
      );
    });
  });
});
