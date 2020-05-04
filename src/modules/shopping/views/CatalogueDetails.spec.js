import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CatalogueDetails from "./CatalogueDetails";
import VueRouter from "vue-router";
import lodash from "lodash";
import VueLodash from "vue-lodash";
import numeral from "numeral";
import { MOCK_PRODUCT_RESULT_LIST } from "../../../common/mocks/object-models";

const localVue = createLocalVue();
const router = new VueRouter({
  history: true,
  routes: [
    {
      path: "/",
      name: "catalogue"
    }
  ]
});

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueLodash, { name: "custom", lodash: lodash });
localVue.filter("numeral", (value, format) => {
  return numeral(value).format(format);
});

let cartStoreActions = {
  updateCart: jest.fn()
};

let getStore = (actions, state) => {
  return new Vuex.Store({
    modules: {
      shoppingStore: {
        namespaced: true,
        actions,
        state
      },
      cartStore: {
        namespaced: true,
        actions: cartStoreActions
      }
    }
  });
};

describe("CatalogueDetails", () => {
  let store;
  let actions;
  let state;
  let wrapper;

  beforeEach(() => {
    actions = {
      getProductsAction: jest.fn().mockResolvedValue(MOCK_PRODUCT_RESULT_LIST)
    };
    state = {
      productListResult: MOCK_PRODUCT_RESULT_LIST
    };
    store = getStore(actions, state);

    wrapper = shallowMount(CatalogueDetails, { router, store, localVue });
    wrapper.vm.$route.query.id = 3;
    expect(actions.getProductsAction).not.toHaveBeenCalled();
  });

  it('Should dispatches "getProductsAction" on component created hooks', () => {
    state = {
      productListResult: []
    };
    store = getStore(actions, state);

    wrapper = shallowMount(CatalogueDetails, { router, store, localVue });
    wrapper.vm.$route.query.id = 6;
    expect(actions.getProductsAction).toHaveBeenCalled();

    expect(wrapper.vm.$data.productDetails).toBeNull();
  });

  it('Should dispatches "getProductsAction" on component created hooks and redirect to catalogue page', () => {
    state = {
      productListResult: []
    };
    actions = {
      getProductsAction: jest.fn().mockRejectedValue("Error")
    };
    store = getStore(actions, state);

    wrapper = shallowMount(CatalogueDetails, { router, store, localVue });
    wrapper.vm.$route.query.id = 1;
    expect(actions.getProductsAction).toHaveBeenCalled();
    expect(wrapper.vm.$route.name).toEqual("catalogue");
  });

  it("Should render cart data", async () => {
    state = {
      productListResult: MOCK_PRODUCT_RESULT_LIST
    };
    store = getStore(actions, state);

    wrapper = shallowMount(CatalogueDetails, { router, store, localVue });
    wrapper.vm.$route.query.id = 4;

    expect(actions.getProductsAction).not.toHaveBeenCalled();
    expect(wrapper.vm.$data.productDetails).toBeDefined();
    expect(wrapper.find("div.single-product-details #title").text()).toEqual(
      MOCK_PRODUCT_RESULT_LIST[2].title
    );
  });

  it("Should handle update quantity", () => {
    const increaseBtn = wrapper.find("#quantity-wanted-p .inc");
    const decreaseBtn = wrapper.find("#quantity-wanted-p .dec");
    expect(wrapper.vm.$data.quantity).toEqual(1);

    // do not decrease <= 1
    decreaseBtn.trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.quantity).toEqual(1);

    increaseBtn.trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.quantity).toEqual(2);

    // > 1 decrease
    decreaseBtn.trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.quantity).toEqual(1);
  });

  it('Should dispatches "updateCart" when clicking on remove Cart', () => {
    const button = wrapper.find(".product-attributes span .cursor");
    button.trigger("click");
    expect(cartStoreActions.updateCart).toHaveBeenCalled();
  });
});
