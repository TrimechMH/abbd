<template>
  <section>
    <div class="home shopping-area section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-3 col-xs-12">
            <catalogue-filters />
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12">
            <div class="shop-tab-area">
              <catalogue-pagination :productList="productList" />
              <div class="tab-content">
                <div class="row tab-pane fade in active" id="home">
                  <catalogue-grid-block :productList="productList" />
                </div>
                <div id="menu1" class="tab-pane fade">
                  <catalogue-list-block :productList="productList" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Quickview Product Start -->
    <div id="quickview-wrapper">
      <!-- Modal -->
      <product-modal />
    </div>
    <!--End of Quickview Product-->
  </section>
</template>

<script>
import CatalogueFilters from "../components/CatalogueFilters";
import CataloguePagination from "../components/CataloguePagination";

import { mapActions, mapState } from "vuex";
import CatalogueGridBlock from "../components/CatalogueGridBlock";
import CatalogueListBlock from "../components/CatalogueListBlock";
import ProductModal from "../components/ProductModal";

export default {
  components: {
    ProductModal,
    CatalogueListBlock,
    CatalogueGridBlock,
    CataloguePagination,
    CatalogueFilters
  },
  name: "catalogue",
  data() {
    return {
      productList: []
    };
  },
  computed: {
    ...mapState("shoppingStore", ["searchValue", "productListResult"])
  },
  async created() {
    try {
      this.productList = await this.getProductsAction();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    ...mapActions("shoppingStore", ["getProductsAction"])
  },
  watch: {
    searchValue: {
      handler() {
        this.productList = this.productListResult.filter(product => {
          return product.title
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
      }
    }
  }
};
</script>

<style scoped></style>
