<template>
  <div class="product">
    <div class="product-name">{{ product.name }}</div>
    <img
      class="product-thumb"
      :src="'./../assets/images/products/' + product.id + '.jpg'"
      :alt="product.name"
    />
    <p class="product-description">{{ product.description }}</p>
    <div class="product-price">${{ product.price }}</div>
  </div>
</template>

<script>
export default {
  name: "ShowProduct",
  props: ["product"]
};
</script>
