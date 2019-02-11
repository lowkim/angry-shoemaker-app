<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <img :src="product.image.secure_url" :alt="product.title" class="img-fluid">
      </div>
      <div class="col-md-4">
        <h1>{{ product.title }}</h1>

        <div class="prodDetails">
          <p>${{selected.price}}</p>
          <p v-html=" product.description "></p>
        </div>

        <div class="prodCheckout">
          <select v-model="selected" class="custom-select mr-sm-2">
            <option :value="product">{{product.title}}</option>
            <option :key="size['_id'] " v-for="size in product.sizes" :value="size">{{size.title}}</option>
          </select>
          <small class="mt-4">The limit is 10</small>
          <input v-model="quantity" type="number">
          <button
            class="btn btn-outline-primary mb-5"
            @click="addToCart(selected, quantity, product.image['secure_url']) , addToBasket()"
            :disabled="quantity > 10"
            v-if="!basketAddSuccess"
          >Add to Cart</button>
          <button class="btn btn-success mb-5" v-else>Added</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/config/Api";
import mixins from "@/mixins/mixins";
export default {
  name: "product",
  props: ["id"],
  mixins: [mixins],
  data() {
    return {
      selected: {},
      quantity:1,
      basketAddSuccess: false,
      product: {},
      //before rendering the image, set a default placeholder
      product: {
        image: {
          secure_url: ""
        }
      }
    };
  },
  mounted() {
    Api()
      .get(`/product/${this.id}`)
      .then(response => {
        this.product = response.data;
        this.selected = response.data;
      });
  },
  methods: {
    addToBasket() {
      this.basketAddSuccess = true;
      let self = this;
      setTimeout(function() {
        self.basketAddSuccess = false;
      }, 1000);
    }
  }
};
</script>

<style>
.prodCheckout {
  display: flex;
  flex-direction: column;
}

.prodCheckout > button{
  margin-top: 20px;
}

.prodDetails > p {
  font-size: 1.5rem;
}
</style>