export default {
  methods: {
    addToCart(product, itemQty) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        let item = {
          id: product["_id"],
          title: product.title,
          price: product.price,
          subtotal: product.price * itemQty,
          qty: itemQty,
          image:product.image["secure_url"],
        };
        cart.push(item);
        this.$store.commit("setCart", item);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        let item = cart.find(item => {
          return item.id === product["_id"];
        });
        if (item) {
          // check if is not new item
          item.qty = +item.qty + +itemQty
          item.subtotal = item.price * item.qty;
          this.$store.commit("setQuantity", item);
          this.$store.commit("setPrice", item);
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let item = {
            id: product["_id"],
            title: product.title,
            price: product.price,
            subtotal: product.price * itemQty,
            qty: itemQty,
            image:product.image["secure_url"],
          };
          cart.push(item);
          this.$store.commit("setCart", item);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
  }
};
