<template>
  <div class="col-md-4">
    <div class="single-banner">
      <div class="product-wrapper">
        <a
          @click="redirectToDetailsPage()"
          class="cursor single-banner-image-wrapper"
        >
          <img :alt="product.title" :src="product.cover" />
          <div class="price"><span>€</span>{{ product.price }}</div>
        </a>
        <div class="product-description">
          <div class="functional-buttons">
            <a
              id="addToCart"
              @click="addToCart()"
              class="cursor"
              title="Add to Cart"
            >
              <i class="fa fa-shopping-cart"></i>
            </a>
            <a
              id="productModalLink"
              class="cursor"
              @click="setSelectedProduct()"
              title="Quick view"
              data-toggle="modal"
              data-target="#productModal"
            >
              <i class="fa fa-compress"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="banner-bottom text-center">
        <div class="banner-bottom-title">
          <a class="cursor" @click="redirectToDetailsPage()">{{
            product.title
          }}</a>
        </div>
        <div class="rating-icon">
          <i class="fa fa-star icolor"></i>
          <i class="fa fa-star icolor"></i>
          <i class="fa fa-star icolor"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "grid-item",
  props: ["product"],
  methods: {
    ...mapMutations("shoppingStore", ["setProductSelected"]),
    ...mapActions("cartStore", ["updateCart"]),

    /**
     * set selected product to be showed in product modal
     */
    setSelectedProduct() {
      this.setProductSelected(this.product);
    },

    /**
     * redirect to details page
     */
    redirectToDetailsPage() {
      const { id } = this.product;
      this.$router.push({
        name: "details",
        query: {
          id
        }
      });
    },
    addToCart() {
      const cart = this._.merge({ quantity: 1 }, this.product);
      this.updateCart({ cart, purpose: "add" });
    }
  }
};
</script>

<style scoped>
.single-banner {
  max-width: 345px;
}
.single-banner-image-wrapper::before {
  left: 0;
  top: 0;
}
</style>
