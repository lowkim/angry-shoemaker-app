<template>
  <div class="home">
    <div class="container-fluid" style="max-width:1750px">
      <Images></Images>
    </div>

    <div class="container">
      <div class="ourStory">
        <h3>Our Story</h3>
        <p style="font-family: 'Simonetta', cursive;">THE started with the story of giving mothers bouquet. Florist Elf decided to finally buy a bouquet to pamper the mother and aunties and sisters (who were mothers) despite them always nagging at how expensive it was, or what a waste of money.
          <br>But ever since that 1st time, she knows exactly how happy everyone was receiving the bouquet. and so, she decided to pursue floral art, and setting up this biz, hoping that more mothers and givers can receive the same joy she experienced back then.
        </p>
        <p
          id="tagline"
        >“Never wait till it is too late to give, that you regret even gifting one~....”</p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="(iImages, index) in instaImages" :key="index">
          <div class="card mb-4 shadow-sm">
            <img class="img-fluid" :src="iImages" :key="index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import promotionImage from "@/components/PromotionImage";
import Api from "@/config/Api";
export default {
  name: "home",
  data() {
    return {
      instaImages: []
    };
  },
  components: {
    Images: promotionImage
  },
  created() {
    Api()
      .get("/insta")
      .then(response => {
        this.instaImages = response.data;
      });
  }
};
</script>

<style>
.ourStory {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

#tagline {
  color: green;
  font-style: italic;
}

.home p {
  font-family: "Gabriola";
}

.home h3 {
  font-family: "October Twilight";
}

/* Small devices (landscape phones, 544px and up) */
@media (min-width: 544px) {
  .home p {
    font-size: 15px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .home p {
    font-size: 20px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .home p {
    font-size: 27px;
  }
}
</style>
