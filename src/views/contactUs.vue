<template>
  <div class="contactUs">
    <div class="container">
      <form action="https://formspree.io/elves@thehappyelves.com" method="POST">
          <h1>Contact Us</h1>
        <div class="form-row">
          <div class="col-md-4 mb-3">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="Name"
              required
            >
          </div>
          <div class="col-md-4 mb-3">
            <label for="phoneNum">Phone Number</label>
            <input
              type="text"
              maxlength="8"
              class="form-control "
              id="phoneNum"
              name="phoneNum"
              placeholder="+65 XXXX XXXX"
              required
            >
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-6 mb-3">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="email"
              placeholder="Email"
              required
            >
          </div>
        </div>
        <div class="mb-3">
          <label for="msg">Your Message</label>
          <textarea
          rows="10"
          style="height:100%;"
            class="form-control"
            id="msg"
            name="msg"
            placeholder="Type your message here."
            required
          ></textarea>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "contactUs"
};
</script>

<style>
</style>
