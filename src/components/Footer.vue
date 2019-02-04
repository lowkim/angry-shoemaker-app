<template>
  <div class="foot">
    <div class="contactUs">
      <p style="font-weight:bold; font-size:20px; color:white">Contact Me</p>
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
    <div class="findUs">
      <p style="font-weight:bold; font-size:20px;color:white">Find Me</p>
      <img class="icons" src="../../public/img/icons/distance.svg" alt="email">
      <p style="color:white">
        31 Sin Ming Drive, #01-299
        Singapore 575705<br>
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
  flex-direction: row;
  padding: 0 70px;
  justify-content: space-around;
  align-items: center;
  height:200px;
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
  color:whitesmoke
}

p {
  font-size: 15px;
}
</style>
