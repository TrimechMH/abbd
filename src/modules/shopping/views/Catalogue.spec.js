import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Catalogue from "./Catalogue";
import VueRouter from "vue-router";
import lodash from "lodash";
import VueLodash from "vue-lodash";
import numeral from "numeral";
import { MOCK_PRODUCT_RESULT_LIST } from "@/common/mocks/object-models";

const localVue = createLocalVue();
const router = new VueRouter({
  history: true
});

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueLodash, { name: "custom", lodash: lodash });
localVue.filter("numeral", (value, format) => {
  return numeral(value).format(format);
});

let getStore = actions => {
  return new Vuex.Store({
    modules: {
      shoppingStore: {
        namespaced: true,
        actions,
        mutations: {
          setSearchValue(state, searchValue) {
            Vue.set(state, "searchValue", searchValue);
          }
        },
        state: {
          searchValue: "",
          productListResult: MOCK_PRODUCT_RESULT_LIST
        }
      }
    }
  });
};

describe("Catalogue", () => {
  let store;
  let actions;
  let state;
  let wrapper;

  beforeEach(() => {
    actions = {
      getProductsAction: jest.fn().mockRejectedValue("ERROR")
    };

    store = getStore(actions);
    wrapper = shallowMount(Catalogue, { router, store, localVue });
  });

  // Inspect the raw component options
  it("Should be created", () => {
    expect(Catalogue).toBeDefined();
    expect(typeof Catalogue.created).toEqual("function");
  });

  it('Should dispatches "getProductsAction" on component created hooks and catch error', () => {
    expect(actions.getProductsAction).toHaveBeenCalled();
    expect(wrapper.vm.$data.productList).toEqual([]);
  });

  it('Should dispatches "getProductsAction" on component created hooks and set productList', async () => {
    actions = {
      getProductsAction: jest.fn().mockResolvedValue(MOCK_PRODUCT_RESULT_LIST)
    };

    store = getStore(actions, state);
    wrapper = await shallowMount(Catalogue, { router, store, localVue });
    await wrapper.vm.$nextTick();
    expect(actions.getProductsAction).toHaveBeenCalled();
    expect(wrapper.vm.$data.productList).toEqual(MOCK_PRODUCT_RESULT_LIST);
  });

  it("Should handle search", async () => {
    actions = {
      getProductsAction: jest.fn().mockResolvedValue(MOCK_PRODUCT_RESULT_LIST)
    };

    store = getStore(actions, state);
    wrapper = await shallowMount(Catalogue, { router, store, localVue });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.productList.length).toEqual(7);

    wrapper.vm.$store.commit("shoppingStore/setSearchValue", "test");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.productList).toEqual([]);

    wrapper.vm.$store.commit("shoppingStore/setSearchValue", "dell");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.productList.length).toEqual(1);
    expect(wrapper.vm.$data.productList[0]).toEqual(
      MOCK_PRODUCT_RESULT_LIST[4]
    );
  });
});
