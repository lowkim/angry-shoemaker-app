<template>
  <div class="supriseme">
    <div class="container">
        <h3>Select an item to add to cart and only one item will be added</h3>
      <div v-for="(prod) in suprisemeProd" :key="prod['_id']">
        <img :src="prod.image.secure_url" alt>
        <h3>{{prod.title}}</h3>
        <p v-html="prod.description"></p>

        <select @click="alterItem">
          <option value="nothing">---Please Select a Item---</option>
          <option v-bind:value="JSON.stringify(prod)">{{prod.title}}</option>
          <option
            :key="size['_id']"
            :value="JSON.stringify(size)"
            v-for="size in prod.size"
          >{{size.title}}</option>
        </select>
      </div>
      <button :disabled="selectedOption == '' " class="btn btn-outline-primary mb-5" @click="addToCart(selectedOption)">Add to Cart</button>
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
      selectedOption: '',
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
        console.log(e.target.value)
        if(e.target.value == 'nothing'){
            this.selectedOption = '';
        }else{
            this.selectedOption = JSON.parse(e.target.value);
        }
    }
  }
};
</script>

<style>
</style>
