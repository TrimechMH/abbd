<template>
  <div class="single-shop-product">
    <div class="col-xs-12 col-sm-5 col-md-4">
      <div class="left-item">
        <router-link
          class="cursor"
          :title="product.title"
          :to="{ name: 'details', query: { id: product.id } }"
        >
          <img :alt="product.title" :src="product.cover" />
        </router-link>
      </div>
    </div>
    <div class="col-xs-12 col-sm-7 col-md-8">
      <div class="deal-product-content">
        <h4>
          <router-link
            class="cursor"
            :title="product.title"
            :to="{ name: 'details', query: { id: product.id } }"
          >
            {{ product.title }}
          </router-link>
        </h4>
        <div class="product-price">
          <span class="new-price"><span>€</span>{{ product.price }}</span>
        </div>
        <div class="list-rating-icon">
          <i class="fa fa-star icolor"></i>
          <i class="fa fa-star icolor"></i>
          <i class="fa fa-star icolor"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
        <div class="availability">
          <span>In stock</span>
          <span><a @click="addToCart()" class="cursor">Add to cart</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "list-item",
  props: ["product"],
  methods: {
    ...mapActions("cartStore", ["updateCart"]),
    addToCart() {
      const cart = this._.merge({ quantity: 1 }, this.product);
      this.updateCart({ cart, purpose: "add" });
    }
  }
};
</script>

<style scoped></style>
