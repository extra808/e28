<template>
  <div id="products">
    <h2>Products</h2>
    <show-product v-for="product in products" :key="product.id" :product="product"></show-product>
  </div>
</template>

<script>
import ShowProduct from "./../ShowProduct.vue";
import { products } from "./../../products.js";

export default {
  name: "ProductsPage",
  data: function() {
    return {
      products: products
    };
  },
  components: {
    ShowProduct
  }
};
</script>
