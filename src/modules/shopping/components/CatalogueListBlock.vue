<template>
  <div class="row">
    <list-item
      v-for="(product, index) in productList"
      :product="product"
      :key="index"
    />
  </div>
</template>

<script>
import ListItem from "./ListItem";

export default {
  components: { ListItem },
  name: "catalogue-list-block",
  props: ["productList"]
};
</script>

<style scoped></style>
