<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <img :src="product.image.secure_url" :alt="product.title" class="img-fluid">
      </div>
      <div class="col-md-4">
        <h5>{{ product.title }}</h5>
        <p v-html=" product.description "></p>
        <div class="checkoutDetails">
          <p class="text-danger font-weight-bold">${{selected.price}}</p>
          <button
            class="btn btn-outline-primary mb-5"
            @click="addToCart(selected) , addToBasket()"
          >Add to Cart</button>
          <div
            class="alert alert-success"
            v-if="basketAddSuccess"
            transition="expand"
          >Added to the basket</div>
        </div>

        <select @change="alterItems()" v-model="selected"  class="custom-select mr-sm-2" id="inlineFormCustomSelect">
          <option :selected="true" >Choose Province</option>
          <option :value="product"  >{{product.title}}</option>
          <option :key="size['_id'] " v-for="size in product.sizes" :value="size">{{size.title}}</option>
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
      selected:{},
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
    },
    alterItems(){
      this.$set(this.product, "productPrice",this.selected.price);
      this.$set(this.product, "productTitle", this.selected.title)
      this.$set(this.product, "productId", this.selected.id)
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