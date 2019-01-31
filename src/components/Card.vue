<template>
  <div class="card" style="width:18rem">
      <router-link tag="a" :to="{name: 'product', params: {id: product._id}}">
        <img class="card-img-top" :src="product.image.secure_url" :alt="product.title">
      </router-link>
    <div class="card-body">
      <h5 class="card-title text-info">{{ product.title }}</h5>
      <p class="card-text" v-html="product.description.substring(0, 50)"></p>
      <p class="card-text text-danger">${{ product.price }}</p>
      <router-link
        tag="a"
        class="btn btn-outline-primary mr-2"
        :to="{ name: 'product', params: { id: product._id }}"
      >Description</router-link>
      <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  props: ["product"],
  mixins:[mixins]
};
</script>

<style>
.card-img-top{
  width:100%;
  height: 15vw;
  object-fit: cover;
}
</style>
