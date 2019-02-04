<template>
  <div class="supriseme">
    <div class="container">
      <h3>Select an item to add to cart</h3>
      <div class="items" v-for="(prod) in suprisemeProd" :key="prod['_id']">
        <img :src="prod.image.secure_url" alt>
        <div class="desc">
          <h3>{{prod.title}}</h3>
          <p v-html="prod.description"></p>

          <select @click="alterItem">
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
      <div class="checkout">
        <button
          :disabled="selectedOption == '' "
          class="btn btn-success mb-5"
          @click="addToCart(selectedOption)"
        >Add to Cart</button>
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
      suprisemeProd: [],
      ids: [],
      trial: {},
      selected: {},
      meme: {}
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
    }
  }
};
</script>

<style>
.items {
  display: flex;
}

.desc {
  margin-left: 10px;
}

.items > img {
  margin-top: 10px;
  width: 100%;
  height: auto;
  max-width: 300px;
  max-height: 300px;
  object-fit: scale-down;
}

.checkout {
    display: flex;
    flex-direction: row-reverse;
}
.items option,select{
    font-family: 'Gabriola';
    font-size: 20px;
}

.items select{
    height:30px;
}
</style>
