<!-- <div class="container">
    <div class="columns">
      <div class="column is-4">
        <div class="field">
          <label>Name</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="First and Last" v-model="name">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label>Email</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Email address" v-model="email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>

        <hr id="left-line">

        <div class="field">
          <label for="card_number">Card Number</label>
          <input
            id="card_number"
            v-model="card.number"
            type="text"
            :class="['is-danger' ? cardNumberError : '', 'input']"
            placeholder="4242424242424242"
          >
          <span class="help is-danger" v-show="cardNumberError">{{ cardNumberError }}</span>
        </div>

        <div class="field">
          <label for="cvc">CVC</label>
          <input id="cvc" v-model="card.cvc" type="text" class="input" placeholder="123">
          <span class="help is-danger" v-show="cardCvcError">{{ cardCvcError }}</span>
        </div>

        <div class="field">
          <label for="exp_month">Expiry Month</label>
          
          <input
            id="exp_month"
            v-model="card.exp_month"
            type="text"
            :class="['is-danger' ? cardMonthError : '', 'input']"
            placeholder="MM"
          >
          <span class="help is-danger" v-show="cardMonthError">{{ cardMonthError }}</span>
        </div>

        <div class="field">
          <label for="exp_month">Expiry Year</label>
          <input
            id="exp_year"
            v-model="card.exp_year"
            type="text"
            :class="['is-danger' ? cardYearError : '', 'input']"
            placeholder="YY"
          >
          <span class="help is-danger" v-show="cardYearError">{{ cardYearError }}</span>
        </div>

        <div class="help is-danger" v-if="cardCheckError">
          <span>{{ cardCheckErrorMessage }}</span>
        </div>
      </div>
      <div class="column is-4">
        <hr>

        <div class="field">
          <label>Address</label>
          <input type="text" class="input" v-model="address.street" placeholder="123 Fake St #303">
        </div>
        <div class="field">
          <label>City</label>
          <input type="text" class="input" v-model="address.city" placeholder="San Francisco">
        </div>
        <div class="field">
          <label>State</label>
          <input type="text" class="input" v-model="address.state" placeholder="CA">
        </div>
        <div class="field">
          <label>Zip</label>
          <input type="text" class="input" v-model="address.zip" placeholder="94607">
        </div>
      </div>
    </div>
    <div class="columns">
      {{totalAmt}}
      <h1>Product Summary</h1>
      <div v-for="cart in cartInfo" :key="cart._id">
        <li>{{cart.title}}|{{cart.qty}}|{{cart.subtotal}}</li>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <button
          type="submit"
          class="button is-primary is-large is-pulled-right"
          @click.prevent="validate"
          :disabled="cardCheckSending"
        >
        Find a way to prevent double order
          <span v-if="cardCheckSending">
            <i class="fa fa-btn fa-spinner fa-spin"></i>
            Ordering...
          </span>
          <span v-else>Place Order</span>
        </button>
      </div>
    </div>
  </div> -->