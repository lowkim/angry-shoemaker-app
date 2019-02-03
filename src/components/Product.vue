<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <img :src="product.image.secure_url" :alt="product.title" class="img-fluid">
      </div>
      <div class="col-md-4">
        <h5>{{ product.title }}</h5>
        <p v-html=" product.description "></p>
        {{product}}
        <div class="checkoutDetails">
          <p class="text-danger font-weight-bold">${{productSizes.price}}</p>
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
        <select @change="alterItems()" v-model="productSizes" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
          <option v-bind:value="{price:product.price, title:product.title, id:product['_id']}" selected>{{product.title}}</option>
          <option v-for="size in product.sizes" v-bind:value="{price:size.price, title:size.title, id:size['_id']}">{{size.title}}</option>
        </select>

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
      productSizes:"",
      itemQty: 1,
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
    },
    alterItems(){
      this.$set(this.product, "productPrice",this.productSizes.price);
      this.$set(this.product, "productTitle", this.productSizes.title)
      this.$set(this.product, "productId", this.productSizes.id)
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