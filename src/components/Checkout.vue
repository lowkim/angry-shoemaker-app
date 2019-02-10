<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="cart.length==0">
          <h3 class="text-center text-danger">Your Cart is Empty !</h3>
        </div>
        <div v-else>
          <div class="container">
            <table id="cart" class="table table-condensed">
              <thead>
                <tr>
                  <th style="width:50%">Product</th>
                  <th style="width:10%">Price</th>
                  <th style="width:8%">Quantity</th>
                  <th style="width:22%" class="text-center">Subtotal</th>
                  <th style="width:10%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart" :key="item.id">
                  <td data-th="Product">
                    <div class="row">
                      <div class="col-sm-2 hidden-xs">
                        <img style="width:80px" :src="item.image" alt="..." class="img-responsive">
                      </div>
                      <div class="col-sm-10">
                        <h4 class="nomargin">{{item.title}}</h4>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">${{item.price}}</td>
                  <td data-th="Quantity">
                    <button
                      class="btn btn-sm btn-light"
                      @click="action('min',item)"
                    >-</button>
                    {{item.qty}}
                    <button class="btn btn-sm btn-light" @click="action('add',item)">+</button>
                  </td>
                  <td data-th="Subtotal" class="text-center">{{item.subtotal}}</td>
                  <td class="actions" data-th>
                    <button  @click="action('clear',item)" class="btn btn-danger btn-sm">
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Total: ${{ total }}</h4>
          <router-link :to="{name:'order'}" tag="button" class="btn btn-outline-primary">Checkout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.table > tbody > tr > td,
.table > tfoot > tr > td {
  vertical-align: middle;
}

.table td, .table th{
  padding:0px;
  padding-top: .75rem;
  padding-bottom: .75rem;
}

@media screen and (max-width: 600px) {
  table#cart tbody td .form-control {
    width: 20%;
    display: inline !important;
  }
  .actions .btn {
    width: 36%;
    margin: 1.5em 0;
  }
  .actions .btn-info {
    float: left;
  }
  .actions .btn-danger {
    float: right;
  }
  table#cart thead {
    display: none;
  }
  table#cart tbody td {
    display: block;
    padding: 0.6rem;
    min-width: 320px;
  }
  table#cart tbody tr td:first-child {
    background: #333;
    color: #fff;
  }
  table#cart tbody td:before {
    content: attr(data-th);
    font-weight: bold;
    display: inline-block;
    width: 8rem;
  }
  table#cart tfoot td {
    display: block;
  }
  table#cart tfoot td .btn {
    display: block;
  }
}
</style>

<script>
import Api from "@/config/Api";
import key from "@/config/stripeKey";
import mixins from "@/mixins/mixins";
export default {
  mixins: [mixins],

  computed: {
    cart() {
      return this.$store.getters.getCart;
    },

    total() {
      let sum = 0;
      this.cart.map(item => {
        sum += item.subtotal;
      });
      this.$store.commit("setCharge", sum);
      localStorage.setItem("charge", JSON.stringify(sum));
      return sum;
    }
  },
  methods: {
    action(event, item) {
      switch (event) {
        case "add":
          item.qty++;
          item.subtotal = item.price * item.qty;
          this.$store.commit("setQuantity", item);
          this.$store.commit("setPrice", item);
          localStorage.setItem("cart", JSON.stringify(this.cart));
          break;
        case "min":
          item.qty--;
          item.subtotal = item.price * item.qty;
          this.$store.commit("setQuantity", item);
          this.$store.commit("setPrice", item);
          localStorage.setItem("cart", JSON.stringify(this.cart));
          if (item.qty === 0) this.clearFromCart(item);
          break;
        case "clear":
          this.clearFromCart(item);
          break;
        default:
          break;
      }
    },
    clearFromCart(product) {
      let item = this.cart.find(item => {
        return item.id === product.productId;
      });
      let index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    }
  }
};
</script>
