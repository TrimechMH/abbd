<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    v-if="productSelected"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            @click="clearSelectedProduct()"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-product">
            <div class="product-images">
              <div class="main-image images">
                <img
                  :alt="productSelected.title"
                  :src="productSelected.cover"
                />
              </div>
            </div>
            <div class="product-info">
              <h1>{{ productSelected.title }}</h1>
              <div class="price-box">
                <p class="s-price">
                  <span class="special-price">
                    <span class="amount">{{ productSelected.price }} €</span>
                  </span>
                </p>
              </div>
              <div class="quick-add-to-cart">
                <form method="post" class="cart">
                  <div class="numbers-row">
                    <input type="number" id="french-hens" v-model="quantity" />
                  </div>
                  <a
                    @click="addToCart()"
                    class="cursor single_add_to_cart_button"
                    >Add to cart</a
                  >
                </form>
              </div>
              <div class="quick-desc">
                <p
                  v-for="(description, index) in productSelected.synopsis"
                  :key="index"
                >
                  {{ description }}
                </p>
              </div>
              <div class="social-sharing">
                <div class="widget widget_socialsharing_widget">
                  <h3 class="widget-title-modal">Share this product</h3>
                  <ul class="social-icons">
                    <li>
                      <a
                        target="_blank"
                        title="Facebook"
                        href="#"
                        class="facebook social-icon"
                        ><i class="fa fa-facebook"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        title="Twitter"
                        href="#"
                        class="twitter social-icon"
                        ><i class="fa fa-twitter"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        title="Pinterest"
                        href="#"
                        class="pinterest social-icon"
                        ><i class="fa fa-pinterest"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        title="Google +"
                        href="#"
                        class="gplus social-icon"
                        ><i class="fa fa-google-plus"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        title="LinkedIn"
                        href="#"
                        class="linkedin social-icon"
                        ><i class="fa fa-linkedin"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- .product-info -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "product-modal",
  data() {
    return {
      quantity: 1
    };
  },
  computed: {
    ...mapState("shoppingStore", ["productSelected"])
  },
  methods: {
    ...mapMutations("shoppingStore", ["setProductSelected"]),
    ...mapActions("cartStore", ["updateCart"]),
    clearSelectedProduct() {
      this.setProductSelected(undefined);
    },
    addToCart() {
      const cart = this._.merge(this.productSelected, {
        quantity: this.quantity
      });
      this.updateCart({ cart, purpose: "add" });
    }
  },
  destroyed() {
    this.setProductSelected(undefined);
  }
};
</script>

<style scoped>
a.single_add_to_cart_button {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  -webkit-appearance: button;
  cursor: pointer;
  overflow: visible;
  color: inherit;
  margin: 0;
}
</style>
