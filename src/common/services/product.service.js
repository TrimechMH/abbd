const getProductsService = async () => {
  try {
    const response = await Vue.http.get(
      `https://my-json-server.typicode.com/TrimechMH/abbd/products`
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getProductsService };
