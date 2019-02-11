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
        <ul class="list-group mb-3">
          <h6>Delivery Time</h6>
          <small class="text-muted">Click to select a time</small>
          <template v-if="totalAmt - selected.price < 60 ">
            <template v-for="DT in deliveryTimeNotSix" >
              <input
                type="radio"
                v-model="selected"
                :key="DT.value"
                :value="{price:DT.price, value:DT.value, time:DT.time}"
                required
              >
              {{DT.time}}
            </template>
          </template>

          <template v-else>
            <input
              type="radio"
              v-model="selected"
              :value="{price:0, value:6, time:'You qualify for free delivery!'}"
              :key="selected.value"
            >
            {{selected.time}}
          </template>

          

        </ul>
      </div>

      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation was-validated" novalidate>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="name"
                required
                :class="['is-danger'? emptyError: '', 'input']"
              >
              <div class="invalid-feedback">Valid name is required.</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="phoneNum">Phone Number</label>
              <input
                type="text"
                id="phoneNum"
                class="form-control"
                v-model="phone"
                :class="['is-danger'? emptyError: '', 'input']"
                placeholder
                value
                required
              >
              <div class="invalid-feedback">Valid phone number required</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              :class="['is-danger'? emptyError: '', 'input']"
              v-model="email"
              id="email"
              placeholder="you@example.com"
              required
            >
            <div class="invalid-feedback">Please enter a valid email address</div>
          </div>

          <div class="mb-3">
            <label for="address">Address</label>
            <input
              type="text"
              class="form-control"
              :class="['is-danger'? emptyError: '', 'input']"
              v-model="address.street"
              id="address"
              placeholder=""
              required
            >
            <div class="invalid-feedback">Please enter your address.</div>
          </div>

          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="postalCode">Postal Code</label>
              <input
                maxlength="6"
                type="text"
                class="form-control"
                :class="['is-danger'? emptyError: '', 'input']"
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
                maxlength="7"
                type="text"
                class="form-control"
                :class="['is-danger'? emptyError: '', 'input']"
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
              <label for="cc-number">Credit card number</label>
              <input
                maxlength="16"
                type="text"
                v-model="card.number"
                :class="['is-danger' ? cardNumberError : '', 'input']"
                class="form-control"
                id="card_number"
                placeholder
                required
              >
              <span style="color:red" v-show="cardNumberError">{{ cardNumberError }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="exp_month">Expiry Month</label>
              <input
                maxlength="2"
                id="exp_month"
                v-model="card.exp_month"
                type="text"
                :class="['is-danger' ? cardMonthError : '', 'input']"
                placeholder="MM"
                class="form-control"
                required
              >
              <span style="color:red" v-show="cardMonthError">{{ cardMonthError }}</span>
            </div>
            <div class="col-md-3 mb-3">
              <label for="exp_month">Expiry Year</label>
              <input
                maxlength="4"
                id="exp_year"
                v-model="card.exp_year"
                type="text"
                :class="['is-danger' ? cardYearError : '', 'input']"
                placeholder="YY"
                class="form-control"
                required
              >
              <span style="color:red" v-show="cardYearError">{{ cardYearError }}</span>
            </div>

            <div class="col-md-3 mb-3">
              <label for="cvc">CVC</label>
              <input
                id="cvc"
                maxlength="3"
                v-model="card.cvc"
                type="text"
                class="form-control"
                placeholder="123"
                required
              >
              <span style="color:red" v-show="cardCvcError">{{ cardCvcError }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <h4>Delivery date and time</h4>
              <p>Date:
                <template v-if="date != ''">
                  {{`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`}}
                  <br>
                </template>
              </p>

              <p>Time:
                <template v-for="DT in deliveryTimeNotSix">
                  <template v-if="DT.value == selected.value">{{DT.time}}</template>
                </template>
                <template v-if="selected.value == 5">
                  <p>
                    <br>Self-Collection Address:
                    <br>31 Sin Ming Drive #01-299
                    <br>Singapore 575705
                  </p>
                </template>
                <template v-if="selected.value == 6">
                  {{selected.time}}
                </template>
              </p>
            </div>
          </div>

          <div v-if="cardCheckError">
            <span style="color:red">{{ cardCheckErrorMessage }}</span>
          </div>
          <hr class="mb-4">
          <button
            type="submit"
            class="btn btn-primary btn-lg btn-block"
            @click.prevent="validate"
            :disabled="cardCheckSending || date==''"
          >
            <span v-if="cardCheckSending">
              <i class="fa fa-btn fa-spinner fa-spin"></i>
              Ordering...
            </span>
            <span class="btn btn-primary btn-lg btn-block" v-else>Place Order</span>
          </button>
        </form>
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
      self:this,
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
      deliveryTime: [
        { time: "Office Elf (10am – 6pm) $8", price: 8, value: 1 },
        { time: "Hi-Tea Elf (2pm-7pm) $8", price: 8, value: 2 },
        { time: "Dinner Elf (5pm – 10pm) $8", price: 8, value: 3 },
        { time: "Nocturnal Elf (10pm – 1am) $20", price: 20, value: 4 },
        { time: "Self-pickup", price: 0, value: 5 },
        {time:"You qualify for free delivery!", price:0, value:6}
      ],
      selected: { time: "Office Elf (10am – 6pm) $8", price: 8, value: 1 },
      disabledDates: {
        to: new Date(),
        ranges: [
          {
            from: new Date().setTime(new Date().getTime() - 1 * 8640000),
            to: new Date().setTime(new Date().getTime() + 2 * 86400000)
          }
        ],
        dates: []
      },

      stripeKey: key.PUBLISHABLE_KEY,
      // fields
      name: "meme",
      email: "meme@gmail.com",
      phone: "999999",
      address: {
        street: "Block 123",
        postalCode: "600059",
        unitNum: "#09-222"
      },

      card: {
        number: "4242424242424242",
        cvc: "123",
        exp_month: "11",
        exp_year: "2020"
      },

      // validation
      cardNumberError: null,
      cardCvcError: null,
      cardMonthError: null,
      cardYearError: null,
      cardCheckSending: false,
      cardCheckError: false,
      cardCheckErrorMessage: "",
      emptyError: null
    };
  },

  created() {
    Api()
      .get("/disabledDates")
      .then(response => {
        response.data.forEach(x => {
          this.disabledDates.dates.push(eval(x));
        });
      });

      if(this.totalAmt > 60){
        this.selected = {time:"You qualify for free delivery!", price:0, value:6}
      }
  },
  components: {
    Datepicker
  },
  computed: {
    cartInfo() {
      return this.$store.getters.getCart;
    },
    totalAmt() {
      return this.$store.getters.getCharge + this.selected.price
    },
    deliveryTimeNotSix(){
     return this.deliveryTime.filter(x => {
       return x.value!=6
     }) 
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
      if (!this.name) {
        valid = false;
      }
      if (!this.phone) {
        valid = false;
      }
      if (!this.email) {
        valid = false;
      }
      if (!this.address.street) {
        valid = false;
      }
      if (!this.address.unitNum) {
        valid = false;
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
          orderDate: this.date,
          orderTime:this.selected.time
        };
        console.log(this.deliveryPrice)
        // Send to our server
        Api()
          .post(`/charge`, request)
          .then(res => {
            var errorResponse = res.data.error;
            var charge = res.data.charge;
            if (errorResponse) {
              this.cardCheckError = true;
              this.cardCheckErrorMessage = errorResponse.message;
              this.cardCheckSending = false;
              console.error(errorResponse);
            } else {
              this.self.$router.push({ path: `order-complete/${charge.id}` });
              this.cardCheckSending = false;
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