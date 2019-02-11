<template>
  <div class="supriseme">
    <div class="container">
      <h3>Select an item to add to cart</h3>
      <div class="items" v-for="(prod) in suprisemeProd" :key="prod['_id']">
        <img :src="prod.image.secure_url" alt>
        <div class="desc">
          <h3>{{prod.title}}</h3>
          <p v-html="prod.description"></p>

          <select @change="alterItem" >
            <option value="nothing">Yes! This is the one</option>
            <option v-bind:value="JSON.stringify(prod)">{{prod.title}}</option>
            <option
              :key="size['_id']"
              :value="JSON.stringify(size)"
              v-for="size in prod.size"
            >{{size.title}}</option>
          </select>
        </div>
      </div>

      <div class="checkoutDetails">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Item Summary</h5>
            <p>- {{selectedOption.title}} ${{selectedOption.price}}</p>
            <p>Type your quantity</p>
            <small>The limit is 10</small>
            <input :value="quantity" @input="quantity = $event.target.value" type="number">
            <button
              :disabled="selectedOption == '' || quantity > 10"
              class="btn btn-outline-primary mb-5 mt-2"
              v-if="!basketAddSuccess"
              @click="addToCart(selectedOption,quantity,selectedOption.image['secure_url']), clearItems()"
            >Add to Cart</button>
            <button class="btn btn-success mb-5 mt-2" v-else>Added</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/config/Api";
import mixins from "@/mixins/mixins";
export default {
  name: "supriseMe",
  mixins: [mixins],
  data() {
    return {
      selectedOption: "",
      quantity: 1,
      suprisemeProd: [],
      basketAddSuccess:false,
      selected: {}
    };
  },
  created() {
    
    Api()
      .get("/supriseme")
      .then(response => {
        Object.keys(response.data).forEach(x => {
          this.suprisemeProd.push(response.data[x]);
        });
      })
      .catch(err => console.log(err));
  },
  methods: {
    alterItem(e) {
      if (e.target.value == "nothing") {
        this.selectedOption = "";
      } else {
        this.selectedOption = JSON.parse(e.target.value);
      }
    },
    clearItems() {
      this.quantity = 1;
      this.selectedOption.title = "";
      this.selectedOption.price = "";
      this.selectedOption = ""
      this.basketAddSuccess = true;
      let self = this;
      setTimeout(function() {
        self.basketAddSuccess = false;
      }, 1000);
    }
  },
  
};
</script>

<style>
.items {
  display: flex;
}

.desc {
  margin-left: 10px;
  flex-wrap: wrap;
}

.items > img {
  margin-top: 10px;
  width: 100%;
  height: auto;
  max-width: 300px;
  max-height: 300px;
  object-fit: scale-down;
}

.checkoutDetails {
  display: flex;
  flex-direction: row-reverse;
}

.checkoutDetails > .card-body{
  font-size: 10px;
}
.items option,
select {
  font-family: "Gabriola";
  font-size: 20px;
}

.items select {
  height: 30px;
}
</style>
