import store from "./index";
import { PRODUCT_LIST_RESULT } from "./mutations.types";
import { MOCK_PRODUCT_RESULT_LIST } from "../../../common/mocks/object-models";

const { mutations, state } = store;

describe("shopping mutations", () => {
  it("SET PRODUCT_LIST_RESULT", () => {
    expect(state.productListResult).toEqual([]);
    mutations[PRODUCT_LIST_RESULT](state, MOCK_PRODUCT_RESULT_LIST);
    expect(state.productListResult).toEqual(MOCK_PRODUCT_RESULT_LIST);
  });

  it("SET Product Selected", () => {
    expect(state.productSelected).toEqual({});
    mutations.setProductSelected(state, MOCK_PRODUCT_RESULT_LIST[0]);
    expect(state.productSelected).toEqual(MOCK_PRODUCT_RESULT_LIST[0]);
    expect(typeof state.productSelected).toEqual("object");
  });

  it("SET Search Value", () => {
    expect(state.searchValue).toEqual(null);
    mutations.setSearchValue(state, "TEST");
    expect(state.searchValue).toEqual("TEST");
    expect(typeof state.searchValue).toEqual("string");
  });
});
