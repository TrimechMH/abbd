import Vue from "vue";
import VueResource from "vue-resource";

import { getProductsService } from "./product.service";
Vue.use(VueResource);

describe("product service ", () => {
  it("should get product list", async () => {
    Vue.http.get = jest.fn().mockResolvedValueOnce("response");
    const response = await getProductsService();

    expect(Vue.http.get).toBeCalledWith(
      "https://my-json-server.typicode.com/TrimechMH/abbd/products"
    );
    expect(response).toEqual("response");
  });

  it("should reject get product list", () => {
    Vue.http.get = jest.fn().mockRejectedValueOnce("ERROR");
    getProductsService().catch(error => {
      expect(Vue.http.get).toBeCalledWith(
        "https://my-json-server.typicode.com/TrimechMH/abbd/products"
      );
      expect(error).toEqual("ERROR");
    });
  });
});
