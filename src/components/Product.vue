<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <ProductZoomer
          style="width:500px"
          v-if="is_data_fetched"
          :base-images="images"
          :base-zoomer-options="zoomerOptions"
        />
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
      quantity: 1,
      basketAddSuccess: false,
      is_data_fetched: false,
      images: {
        normal_size: []
      },
      product: {},
      //before rendering the image, set a default placeholder
      product: {
        image: {
          secure_url: ""
        }
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    addToBasket() {
      this.basketAddSuccess = true;
      let self = this;
      setTimeout(function() {
        self.basketAddSuccess = false;
      }, 1000);
    },

    getData() {
      Api()
        .get(`/product/${this.id}`)
        .then(response => {
          response.data.image.forEach(x => {
            this.images["normal_size"].push({
              url: x["secure_url"],
              id: x["public_id"]
            });
          });

          this.product = response.data;
          this.selected = response.data;
          this.is_data_fetched = true;
        });
    }
  }
};
</script>

<style>
.prodCheckout {
  display: flex;
  flex-direction: column;
}

.prodCheckout > button {
  margin-top: 20px;
}

.prodDetails > p {
  font-size: 1.5rem;
}

#app
  > div.content
  > div
  > div
  > div.col-md-8
  > div
  > div.control-box
  > div.thumb-list {
  width: 100px;
}

#app
  > div.content
  > div
  > div
  > div.col-md-8
  > div
  > div.control-box
  > div.control {
  visibility: hidden;
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width: 415px) {
  /* Styles */
  #app > div.content > div > div > div.col-md-8 {
    display: flex;
    justify-content: center;
  }

  #app > div.content > div > div > div.col-md-8 > div > div.preview-box {
    width: 360px;
  }
}
</style>