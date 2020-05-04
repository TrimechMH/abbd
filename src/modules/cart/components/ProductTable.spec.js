import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ProductTable from "./ProductTable";
import VueRouter from "vue-router";
import lodash from "lodash";
import VueLodash from "vue-lodash";
import numeral from "numeral";
import { CART } from "../../../common/mocks/object-models";

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueLodash, { name: "custom", lodash: lodash });
localVue.filter("numeral", (value, format) => {
  return numeral(value).format(format);
});

describe("ProductTable", () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      updateCart: jest.fn(),
      clearCart: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        cartStore: {
          namespaced: true,
          actions,
          state: {
            cart: CART
          }
        }
      }
    });
  });

  // Inspect the raw component options
  it("Should be created", () => {
    expect(ProductTable).toBeDefined();
  });

  it("Should render cart data", () => {
    const wrapper = shallowMount(ProductTable, { router, store, localVue });
    expect(wrapper.find(".t-product-name .cursor").text()).toEqual(
      'PC Portable Gaming MSI GF65 Thin 9SD-224FR 15.6" Intel Core i5 16 Go RAM 512 Go SSD Noir'
    );
  });

  it('Should dispatches "updateCart" when clicking on remove Cart', () => {
    const wrapper = shallowMount(ProductTable, { router, store, localVue });
    const button = wrapper.find(".product-remove .cursor");
    button.trigger("click");
    expect(actions.updateCart).toHaveBeenCalled();
  });

  it('Should dispatches "clearCart" when clicking on clear Cart', () => {
    const wrapper = shallowMount(ProductTable, { router, store, localVue });
    const button = wrapper.find(
      ".shopingcart-bottom-area.pull-right .right-shoping-cart.cursor"
    );
    button.trigger("click");
    expect(actions.clearCart).toHaveBeenCalled();
  });
});
