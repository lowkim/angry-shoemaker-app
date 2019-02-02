<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <img :src="product.image.secure_url" :alt="product.title" class="img-fluid">
      </div>
      <div class="col-md-4">
        <h5>{{ product.title }}</h5>
        <p v-html=" product.description "></p>
        <div class="checkoutDetails">
          <p class="text-danger font-weight-bold">${{product.price}}</p>
          <button
            class="btn btn-outline-primary mb-5"
            @click="addToCart(product) , addToBasket()"
          >Add to Cart</button>
          <div
            class="alert alert-success"
            v-if="basketAddSuccess"
            transition="expand"
          >Added to the basket</div>
        </div>
        {{product}}
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
      itemQty: 1,
      basketAddSuccess:false,
      product: {},
      //before rendering the image, set a default placeholder
      product: {
        image: {
          secure_url: ""
        }
      }
    };
  },
  created() {
    Api()
      .get(`/product/${this.id}`)
      .then(response => {
        this.product = response.data;
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
.checkoutDetails {
  display: flex;
  flex-direction: row;
}
</style>