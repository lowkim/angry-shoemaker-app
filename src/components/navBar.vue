<template>
  <div class="navBar">
    <div class="container mb-0">
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
          <img src="../../public/img/icons/iconfinder_menu-alt_134216.svg" alt>
        </button>

        <div class="collapse navbar-collapse navigationContent" id="navbarSupportedContent">
          <!-- <router-link @click.native="closeMenu()" tag="a" :to="{name:'home'}" class="navbar-brand">
            <img src="../../public/img/icons/FinalLogo.png" class="icon" alt="HappyElves">
          </router-link> -->
          <a @click.native="closeMenu()" href="/" class="navbar-brand">
            <img src="../../public/img/icons/FinalLogo.png" class="icon" alt="HappyElves">
          </a>
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
              <li
                class="dropdown-submenu"
                :key="category['_id']"
                v-for="category in Object.keys(categories)"
              >
                <a class="dropdown-item" href="#">{{category}}</a>
                <ul class="dropdown-menu">
                  <li class="dropdown-submenu">
                    <template v-for="cat in categories">
                      <template v-for="subCategory in cat">
                        <template v-if="subCategory.category == category">
                          <li class="dropdown-item" :key="subCategory['_id']">
                            <router-link
                              tag="a"
                              @click.native="closeMenu()"
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
            @click.native="closeMenu()"
            :to="`${routes.page}`"
          >{{routes.text}}</router-link>
          <router-link
            @click.native="closeMenu()"
            class="cart nav-link"
            tag="a"
            :to="{name: 'checkout'}"
          >
            Cart(
            <span class="badge badge-light">{{ cart.length }}</span>)
          </router-link>
        </div>
      </nav>
    </div>
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
        // { id: 3, text: "Our Story", page: "/ourstory" },
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
  },
  methods: {
    closeMenu() {
      $("#navbarSupportedContent").collapse("hide");
    }
  }
};
</script>

<style>
.icon {
  width: 80px;
  height: 64px;
}
</style>
