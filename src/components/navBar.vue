<template>
  <div class="navBar">
    <nav class="navbar-expand-lg">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">meme</span>
      </button>

      <div
        class="collapse navbar-collapse navigationContent"
        id="navbarSupportedContent">
        <router-link tag="a" :to="{name:'home'}" class="navbar-brand">
          <img src="../../public/img/icons/FinalLogo.png" class="icon" alt="HappyElves">
        </router-link>
        <div class="dropdown">
          <a
            class="btn dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Shop</a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li class="dropdown-submenu" v-for="category in Object.keys(categories)">
              <a class="dropdown-item" href="#">{{category}}</a>
              <ul class="dropdown-menu">
                <li class="dropdown-submenu">
                  <template v-for="cat in categories">
                    <template v-for="subCategory in cat">
                      <template v-if="subCategory.category == category">
                        <li class="dropdown-item">
                          <router-link
                            tag="a"
                            :to="{name: 'category', params: {category: category, subcategory:subCategory.name}}"
                            class="nav-link"
                            style="font-size:20px"
                          >{{subCategory.name }}</router-link>
                        </li>
                      </template>
                    </template>
                  </template>
                </li>
              </ul>
            </li>
          </div>
          
        </div>

        <router-link
          class="nav-link"
          tag="a"
          v-for="routes in links"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
        >{{routes.text}}</router-link>
        <router-link class="cart nav-link" tag="a" :to="{name: 'checkout'}" >
          Cart(
          <span class="badge badge-light">{{ cart.length }}</span>)
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import Api from "@/config/Api";
import "../assets/css/navBar.css";
export default {
  name: "navBar",
  data() {
    return {
      categories: [],
      links: [
        { id: 0, text: "Surprise me", page: "/supriseme" },
        { id: 1, text: "Delivery Info", page: "/deliveryinfo" },
        { id: 2, text: "FAQs", page: "/faq" },
        { id: 3, text: "Our Story", page: "/ourstory" },
        { id: 4, text: "Contact Us", page: "/contactus" }
      ]
    };
  },
  created() {
    Api()
      .get("/categories")
      .then(response => (this.categories = response.data))
      .catch(err => console.log(err));
  },

  computed: {
    cart() {
      return this.$store.getters.getCart;
    }
  }
};
</script>

<style>
/* .dropdown-sideMenu {
  transform: translateX(77%) !important;
} */
.icon {
  width: 80px;
  height: 64px;
}
</style>
