<template>
  <div id="app">
    <img id="logo" alt="ZipFoods logo" src="./assets/images/zipfoods-logo.png" />
    <p>ZipFoods is your one-stop-shop for convenient online grocery shopping in the greater Boston area.</p>
    <show-featured :category="'snacks'"></show-featured>
    <show-products></show-products>
  </div>
</template>

<script>
import ShowProducts from "./components/ShowProducts.vue";
import ShowFeatured from "./components/ShowFeatured.vue";

export default {
  name: "app",
  components: { ShowProducts, ShowFeatured }
};
</script>

<style lang='scss'>
@import "./assets/css/zipfoods.scss";
</style>
