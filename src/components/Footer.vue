<template>
  <div class="foot">
    <div class="contactUs">
      <p style="font-weight:bold; font-size:25px; color:#DDDBF1">Contact Me</p>
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
      <p style="font-weight:bold; font-size:25px;color:#DDDBF1">Find Me</p>
      <p>
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
  background-color: #383f51;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-around
}

.icons {
  width: 30px;
  height: 30px;
}

.phoneNumber,
.email {
  display: inline-flex;
  padding: 2px;
}

p {
  font-size: 20px;
}
</style>
