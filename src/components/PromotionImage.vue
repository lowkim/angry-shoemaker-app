<template>
  <div class="container">
    <div
      id="carouselExampleIndicators"
      class="carousel slide span12"
      data-ride="carousel"
      data-interval="2000"
    >

      <ol class="carousel-indicators">
        <li v-for="(image,index) in Images" :key="index" :class="{active:index==0}" data-target="#carouselExampleIndicators" :data-slide-to="index" >
          
        </li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item" :key="index" v-for="(image, index) in Images" :class="{active:index==0}">
          <a :href="'category/' + image.subCategory.category.name + '/' + image.subCategory.name" ><img class="d-block img-fluid" :src="image.image.secure_url"></a>
          <!-- <router-link :to="'category/' + image.subCategory.category.name + '/' + image.subCategory.name" ><img class="d-block img-fluid" :src="image.image.secure_url"></router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/config/Api";
import { Slider, SliderItem } from "vue-easy-slider";
export default {
  name: "promotionImage",
  data() {
    return {
      Images: {}
    };
  },
  created() {
    Api()
      .get("/promotionImage")
      .then(response => {
        this.Images = response.data;
      });
  },
  components: {
    Slider,
    SliderItem
  }
};
</script>

<style>
</style>
