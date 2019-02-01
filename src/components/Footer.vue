<template>
  <div class="footer">
    <div class="contactUs">
      <p>Contact Me</p>
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
      <p>
        (By Appointment Only)
        31 Sin Ming Drive, #01-299
        Singapore 575705
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer"
};
</script>

<style>
.footer {
  background-color: #80ab82;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
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
