<template>
  <app-header @login="login" @openCart="openCart"></app-header>
  <router-view></router-view>
  <app-footer></app-footer>
  <auth-modal ref="auth"></auth-modal>
  <cart-modal ref="cart"></cart-modal>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import AuthModal from "./components/UI/AuthModal";
import CartModal from "./components/UI/CartModal";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AuthModal,
    CartModal,
  },
  data() {
    return {};
  },
  beforeMount() {
    this.$store.dispatch("fetchParteners");
  },
  mounted() {
    this.setUser();
    window.addEventListener("onbeforeunload", () => {});
  },
  methods: {
    login() {
      this.$refs.auth.open();
    },
    openCart() {
      this.$refs.cart.open();
    },
    async setUser() {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: "admin",
          password: "admin",
        }),
      });
    },
  },
};
</script>
<style></style>
