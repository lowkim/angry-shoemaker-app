<template>
  <div class="card" style="width:18rem">
      <router-link tag="a" :to="{name: 'product', params: {id: product._id}}">
        <img class="card-img-top" :src="product.image.secure_url" :alt="product.title">
      </router-link>
    <div class="card-body">
      <h3 class="card-title">{{ product.title }}</h3>
      <p class="card-text">${{ product.price }}</p>
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
  height:40vh;
  object-fit: cover;
}

.card-body{
  text-align: center;
}

.card-body p{
  font-size: 1.5rem;
  color: black;
}
</style>
