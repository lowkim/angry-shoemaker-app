<template>
  <div class="home">
    <div class="container">
      <Images></Images>
      <div class="ourStory">
        <h3>Our Story</h3>
        <p>THE started with the story of giving mothers bouquet. Florist Elf decided to finally buy a bouquet to pamper the mother and aunties and sisters (who were mothers) despite them always nagging at how expensive it was, or what a waste of money.
          <br>But ever since that 1st time, she knows exactly how happy everyone was receiving the bouquet. and so, she decided to pursue floral art, and setting up this biz, hoping that more mothers and givers can receive the same joy she experienced back then.
        </p>
        <p
          id="tagline"
        >“Never wait till it is too late to give, that you regret even gifting one~....”</p>
      </div>
    </div>
  </div>
</template>

<script>
import promotionImage from "@/components/PromotionImage";
export default {
  name: "home",
  components: {
    Images: promotionImage
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
  font-size: 27px;
}

.home h3{
  font-family: 'October Twilight';
}
</style>
