<template>
  <div class="header-right">
    <ul>
      <li class="shoping-cart">
        <router-link class="cursor" :to="{ name: 'cart' }">
          <i class="flaticon-shop"></i>
          <span>{{ _.sumBy(_.cloneDeep(cart.cartList), "quantity") }}</span>
        </router-link>
        <div class="add-to-cart-product">
          <cart-item />
          <div class="total-cart-price">
            <div v-if="cart.cartList.length > 0" class="cart-product-line">
              <span>Total</span>
              <span class="total">
                € {{ cart.totalPrice || 0 | numeral("0,0.00") }}
              </span>
            </div>
            <div v-else="" class="cart-product-line">
              <span>Your cart is empty</span>
            </div>
          </div>
          <div class="cart-checkout">
            <router-link class="cursor" :to="{ name: 'cart' }">
              Check out
              <i class="fa fa-chevron-right"></i>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CartItem from "./CartItem";

export default {
  components: { CartItem },
  name: "shopping-cart-header",
  computed: {
    ...mapState("cartStore", ["cart"])
  },
  created() {
    this.verifyCartStorage();
  },
  methods: {
    ...mapActions("cartStore", ["verifyCartStorage"])
  }
};
</script>

<style scoped></style>
