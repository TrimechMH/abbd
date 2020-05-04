import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import GridItem from "./GridItem";
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
      name: "details"
    }
  ]
});
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueLodash, { name: "custom", lodash: lodash });
localVue.filter("numeral", (value, format) => {
  return numeral(value).format(format);
});

let getStore = (actions, mutations) => {
  return new Vuex.Store({
    modules: {
      shoppingStore: {
        namespaced: true,
        mutations
      },
      cartStore: {
        namespaced: true,
        actions: actions
      }
    }
  });
};

describe("GridItem", () => {
  let store;
  let actions;
  let mutations;
  let wrapper;

  beforeEach(() => {
    actions = {
      updateCart: jest.fn()
    };
    mutations = {
      setProductSelected: jest.fn()
    };

    store = getStore(actions, mutations);

    wrapper = shallowMount(GridItem, {
      router,
      store,
      localVue,
      propsData: {
        product: MOCK_PRODUCT_RESULT_LIST[1]
      }
    });
    wrapper.vm.$route.query.id = 2;
  });

  // Inspect the raw component options
  it("Should be created", () => {
    expect(GridItem).toBeDefined();
    expect(wrapper.find(".banner-bottom-title .cursor").text()).toEqual(
      MOCK_PRODUCT_RESULT_LIST[1].title
    );
  });

  it('Should commit "setSelectedProduct" on open modal click', () => {
    const openModalBtn = wrapper.find(".functional-buttons #productModalLink");
    openModalBtn.trigger("click");
    expect(mutations.setProductSelected).toHaveBeenCalledWith(
      {},
      MOCK_PRODUCT_RESULT_LIST[1]
    );
  });

  it('Should redirect to details page "setSelectedProduct" on open modal click', () => {
    const redirectBtn = wrapper.find(
      ".product-wrapper .single-banner-image-wrapper"
    );
    router.push = jest.fn();
    redirectBtn.trigger("click");
    expect(router.push).toHaveBeenCalledWith({
      name: "details",
      query: {
        id: wrapper.vm.$props.product.id
      }
    });
  });

  it('Should dispatches "updateCart" when clicking on remove Cart', () => {
    const button = wrapper.find(".functional-buttons #addToCart");
    button.trigger("click");
    expect(actions.updateCart).toHaveBeenCalled();
  });
});
