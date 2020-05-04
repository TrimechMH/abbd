<template>
  <div>
    <div
      class="row shop-single-product-area"
      v-for="(spitedProduct, spitedIndex) in _.chunk(this.productList, 3)"
      :key="spitedIndex"
    >
      <grid-item
        v-for="(product, index) in spitedProduct"
        :product="product"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import GridItem from "./GridItem";

export default {
  components: { GridItem },
  name: "catalogue-grid-block",
  props: ["productList"]
};
</script>

<style scoped></style>
