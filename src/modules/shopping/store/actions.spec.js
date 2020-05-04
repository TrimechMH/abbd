jest.mock("../services/product.service");
import { PRODUCT_LIST_RESULT } from "./mutations.types";
import { MOCK_PRODUCT_RESULT_LIST } from "../../../common/mocks/object-models";
import { getProductsService } from "../services/product.service";
import store from "./index";

const { actions } = store;

describe("shopping actions", () => {
  it('Should dispatch "getProductsAction" action and commit PRODUCT_LIST_RESULT mutation', async () => {
    getProductsService.mockResolvedValueOnce({
      body: MOCK_PRODUCT_RESULT_LIST
    });
    const commit = jest.fn();

    const response = await actions.getProductsAction({ commit });

    expect(response).toEqual(MOCK_PRODUCT_RESULT_LIST);
    expect(getProductsService).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith(
      PRODUCT_LIST_RESULT,
      MOCK_PRODUCT_RESULT_LIST
    );
  });

  it('Should dispatch "getProductsService" action and initialize PRODUCT_LIST_RESULT', () => {
    getProductsService.mockRejectedValueOnce("ERROR");
    const commit = jest.fn();

    actions.getProductsAction({ commit }).catch(error => {
      expect(error).toEqual("ERROR");
      expect(getProductsService).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith(PRODUCT_LIST_RESULT, []);
    });
  });
});
