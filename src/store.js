import { Store } from "vuex";

// vuex store modules
import globalStore from "./common/store";

import { shoppingStore, cartStore } from "./modules/stores";

const plugins = [];

const createStore = () => {
  return new Store({
    plugins,
    modules: {
      globalStore,
      shoppingStore,
      cartStore
    }
  });
};

export { createStore };
