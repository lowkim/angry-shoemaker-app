<template>
  <div>
    <Slider animation="fade" :duration="5000" :speed="1000" style="min-height:300px" :height="'800px'">
        <SliderItem v-for="image in Images" :key="image['_id']">
            <img class="img-fluid" :src="image.image.secure_url">
            <!-- <img style="max-width:100%; height:auto;" :src="image.image.secure_url"> -->
        </SliderItem>
    </Slider>
  </div>
</template>

<script>
import Api from "@/config/Api";
import { Slider, SliderItem } from "vue-easy-slider";
export default {
  name: "promotionImage",
  data() {
    return {
      Images: {},
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
  },
  
};
</script>

<style>
.promotionImage {
  text-align: center;
}


</style>
