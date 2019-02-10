<template>
  <div class="foot">
    <div class="contactUs">
      <h4 style="color:white">Contact Me</h4>
      <div class="phoneNumber">
        <img class="icons" src="../../public/img/icons/whatsapp.svg" alt="whatsapp">
        <p>+65 8768 8832</p>
      </div>
      <br>
      <div class="email">
        <img class="icons" src="../../public/img/icons/message.svg" alt="email">
        <p>sayhello@thehappyelves.com</p>
      </div>
    </div>
    <div class="findus">
      <h4 style="color:white">Find Me</h4>
      <img class="icons" src="../../public/img/icons/distance.svg" alt="email">
      <p style="color:white">
        31 Sin Ming Drive, #01-299
        Singapore 575705
        <br>
        <span>(By Appointment Only)</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot"
};
</script>

<style>
.foot {
  background-color: #293132;
  display: flex;
  justify-content: space-around;
  padding-top:10px;
}

.foot h4{
  font-family: "Krub", sans-serif;
}

.icons {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.phoneNumber,
.email {
  display: inline-flex;
  padding: 2px;
  color: whitesmoke;
}




@media (max-width: 544px) {
  .foot{
    flex-wrap: wrap;
  }
  .contactUs, .findus{
    width: 100%;
    text-align: center;
  }

  .findus{
    margin-top:10px;
  }

  .foot p{
    font-size: smaller
  }
}
</style>
