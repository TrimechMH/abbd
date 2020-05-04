import { PRODUCT_LIST_RESULT } from "./mutations.types";
import * as api from "../services/product.service";

const actions = {
  async getProductsAction(context) {
    try {
      const response = await api.getProductsService();
      context.commit(PRODUCT_LIST_RESULT, response.body);
      return Promise.resolve(response.body);
    } catch (error) {
      context.commit(PRODUCT_LIST_RESULT, []);
      return Promise.reject(error);
    }
  }
};

export default actions;
