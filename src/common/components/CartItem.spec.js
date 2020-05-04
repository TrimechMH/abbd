import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CartItem from "./CartItem";
import VueRouter from "vue-router";

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartItem", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      updateCart: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        cartStore: {
          namespaced: true,
          actions,
          state: {
            cart: {
              cartList: [
                {
                  id: 5,
                  title: "Henri Potier à l'école des sorciers",
                  price: 35,
                  cover: "http://henri-potier.xebia.fr/hp0.jpg",
                  synopsis: ["test"]
                }
              ],
              totalPrice: 0
            }
          }
        }
      }
    });
  });

  // Inspect the raw component options
  it("Should be created", () => {
    expect(CartItem).toBeDefined();
  });

  it('Should dispatches "updateCart" when clicking on remove Cart', () => {
    const wrapper = shallowMount(CartItem, { router, store, localVue });
    const button = wrapper.find("div.cursor.cart-product-remove");
    button.trigger("click");
    expect(actions.updateCart).toHaveBeenCalled();
  });
});
