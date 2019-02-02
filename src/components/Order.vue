<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill"></span>
        </h4>
        <ul class="list-group mb-3">
          <li
            class="list-group-item d-flex justify-content-between lh-condensed"
            v-for="cart in cartInfo"
            :key="cart[`cart_id`]"
          >
            <div>
              <h6 class="my-0">{{cart.title}}</h6>
              <small class="text-muted">Qty: {{cart.qty}}</small>
            </div>
            <span class="text-muted">${{cart.subtotal}}</span>
          </li>

          <li class="list-group-item d-flex justify-content-between">
            <span>Total (SGD)</span>
            <strong>SGD{{totalAmt}}</strong>
          </li>
        </ul>

        <ul class="list-group mb-3">
          <h6>Delivery Dates</h6>
          <small class="text-muted">Click to select a date</small>
          <datepicker :inline="true" v-model="date" :disabledDates="disabledDates"></datepicker>
        </ul>
      </div>

      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="Name">Name</label>
            <input type="text" class="form-control" v-model="name" placeholder value required>
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="Phone">Phone Number</label>
            <input type="text" class="form-control" v-model="phone" placeholder value required>
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            id="email"
            placeholder="you@example.com"
          >
          <div class="invalid-feedback">Please enter a valid email address for shipping updates.</div>
        </div>

        <div class="mb-3">
          <label for="address">Address</label>
          <input
            type="text"
            class="form-control"
            v-model="address.street"
            id="address"
            placeholder="1234 Main St"
            required
          >
          <div class="invalid-feedback">Please enter your shipping address.</div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="postalCode">Postal Code</label>
            <input
              type="text"
              class="form-control"
              v-model="address.postalCode"
              id="postalCode"
              placeholder
              required
            >
            <div class="invalid-feedback">PostalCode required</div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="unitNum">Unit Number</label>
            <input
              type="text"
              class="form-control"
              v-model="address.unitNum"
              id="unitNum"
              placeholder
              required
            >
            <div class="invalid-feedback">Unit Number required</div>
          </div>
        </div>

        <h4 class="mb-3">Payment</h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cc-name">Name on card</label>
            <input type="text" class="form-control" id="cc-name" placeholder required>
            <small class="text-muted">Full name as displayed on card</small>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-number">Credit card number</label>
            <input
              type="text"
              v-model="card.number"
              :class="['is-danger' ? cardNumberError : '', 'input']"
              class="form-control"
              id="card_number"
              placeholder
              required
            >
            <span class="help is-danger" v-show="cardNumberError">{{ cardNumberError }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="exp_month">Expiry Month</label>
            <input
              id="exp_month"
              v-model="card.exp_month"
              type="text"
              :class="['is-danger' ? cardMonthError : '', 'input']"
              placeholder="MM"
              class="form-control"
            >
            <span class="help is-danger" v-show="cardMonthError">{{ cardMonthError }}</span>
          </div>
          <div class="col-md-3 mb-3">
            <label for="exp_month">Expiry Year</label>
            <input
              id="exp_year"
              v-model="card.exp_year"
              type="text"
              :class="['is-danger' ? cardYearError : '', 'input']"
              placeholder="YY"
              class="form-control"
            >
            <span class="help is-danger" v-show="cardYearError">{{ cardYearError }}</span>
          </div>

          <div class="col-md-3 mb-3">
            <label for="cvc">CVC</label>
            <input id="cvc" v-model="card.cvc" type="text" class="form-control" placeholder="123">
            <span class="help is-danger" v-show="cardCvcError">{{ cardCvcError }}</span>
          </div>

          <div class="help is-danger" v-if="cardCheckError">
            <span>{{ cardCheckErrorMessage }}</span>
          </div>
        </div>
        <hr class="mb-4">
        <button
          type="submit"
          class="btn btn-primary btn-lg btn-block"
          @click.prevent="validate"
          :disabled="cardCheckSending"
        >
          <!-- Find a way to prevent double order -->
          <span v-if="cardCheckSending">
            <i class="fa fa-btn fa-spinner fa-spin"></i>
            Ordering...
          </span>
          <span class="btn btn-primary btn-lg btn-block" v-else>Place Order</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import key from "@/config/stripeKey";
import Api from "@/config/Api";
import Datepicker from "vuejs-datepicker";

export default {
  name: "order",
  data() {
    return {
      //Date
      date: "",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      disabledDates: {
        ranges: [
          {
            from: new Date().setTime(new Date().getTime() - 1 * 8640000),
            to: new Date().setTime(new Date().getTime() + 2 * 86400000)
          }
        ],
        dates:[],
      },

      stripeKey: key.PUBLISHABLE_KEY,
      // fields
      name: "Meme",
      email: "Memelord@gmail.com",
      phone: "9954002",
      address: {
        street: "Block 23 Chua Chu Kang",
        postalCode: "844444",
        unitNum: "#05-333"
      },

      card: {
        number: "4242424242424242",
        cvc: "444",
        exp_month: "8",
        exp_year: "2020"
      },

      // validation
      cardNumberError: null,
      cardCvcError: null,
      cardMonthError: null,
      cardYearError: null,
      cardCheckSending: false,
      cardCheckError: false,
      cardCheckErrorMessage: ""
    };
  },

  created(){
    Api().get("/disabledDates")
    .then(response => {
      response.data.forEach(x => {
        this.disabledDates.dates.push(eval(x))
      })
    })
  },
  components: {
    Datepicker
  },
  computed: {
    cartInfo() {
      return this.$store.getters.getCart;
    },
    totalAmt() {
      return this.$store.getters.getCharge;
    }
  },
  methods: {
    validate() {
      this.clearCardErrors();
      let valid = true;
      if (!this.card.number) {
        valid = false;
        this.cardNumberError = "Card Number is Required";
      }
      if (!this.card.cvc) {
        valid = false;
        this.cardCvcError = "CVC is Required";
      }
      if (!this.card.exp_month) {
        valid = false;
        this.cardMonthError = "Month is Required";
      }
      if (!this.card.exp_year) {
        valid = false;
        this.cardYearError = "Year is Required";
      }
      if (valid) {
        this.createToken();
      }
    },
    clearCardErrors() {
      this.cardNumberError = null;
      this.cardCvcError = null;
      this.cardMonthError = null;
      this.cardYearError = null;
    },
    createToken() {
      this.cardCheckError = false;
      window.Stripe.setPublishableKey(this.stripeKey);
      window.Stripe.createToken(
        this.card,
        $.proxy(this.stripeResponseHandler, this)
      );
      this.cardCheckSending = true;
    },
    stripeResponseHandler(status, response) {
      if (response.error) {
        this.cardCheckError = true;
        this.cardCheckErrorMessage = response.error.message;
        this.cardCheckSending = false;
        console.error(response.error);
      } else {
        // token to create a charge on our server
        var token_from_stripe = response.id;

        var request = {
          name: this.name,
          email: this.email,
          address: this.address,
          card: this.card,
          token_from_stripe: token_from_stripe,
          cartInfo: this.$store.getters.getCart,
          phone: this.phone,
          total: this.totalAmt,
          orderDate: this.date
        };
        // Send to our server
        Api()
          .post(`/charge`, request)
          .then(res => {
            this.cardCheckSending = false;
            var errorResponse = res.data.error;
            var charge = res.data.charge;
            if (errorResponse) {
              this.cardCheckError = true;
              this.cardCheckErrorMessage = errorResponse.message;
              console.error(errorResponse);
            } else {
              this.$router.push({ path: `order-complete/${charge.id}` });
              localStorage.clear();
              this.$store.state.charge = 0;
              this.$store.state.cart = [];
            }
          });
      }
    }
  }
};
</script>
<style>
h2 {
  text-decoration: underline;
}
.textarea:not([rows]) {
  max-height: 110px;
  min-height: 110px;
}
.container {
  margin-bottom: 30px;
}
.column > img {
  margin-top: 60px;
}
.button-field {
  display: flex;
  justify-content: center;
}
#left-line {
  margin-top: 27px;
}
</style>