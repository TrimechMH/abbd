import Vue from "vue";
// Mutation Types
import { PRODUCT_LIST_RESULT } from "./mutations.types";

const mutations = {
  [PRODUCT_LIST_RESULT](state, productListResult) {
    Vue.set(state, "productListResult", productListResult);
  },
  setProductSelected(state, productSelected) {
    Vue.set(state, "productSelected", productSelected);
  },
  setSearchValue(state, searchValue) {
    Vue.set(state, "searchValue", searchValue);
  }
};

export default mutations;
