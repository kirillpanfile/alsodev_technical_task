<template>
  <div class="container">
    <header class="header">
      <router-link to="/" class="logo">
        <img src="../img/icon/logo.svg" alt="Logo" />
      </router-link>
      <label class="address">
        <input
          type="text"
          class="input input-address"
          placeholder="Адрес доставки"
        />
      </label>
      <div class="buttons">
        <span class="user-name" ref="name" v-if="isAuth">{{ user.login }}</span>
        <button
          class="button button-primary button-auth"
          v-if="!isAuth"
          @click="$emit('login')"
        >
          <span class="button-auth-svg"></span>
          <span class="button-text">Войти</span>
        </button>
        <button
          class="button button-cart"
          id="cart-button"
          v-if="isAuth"
          @click="$emit('openCart')"
        >
          <span class="button-cart-svg"
            ><img src="../img/icon/shopping-cart.svg" alt=""
          /></span>
          <span class="button-text">Корзина</span>
        </button>
        <button
          class="button button-primary button-out"
          v-if="isAuth"
          @click="logOut"
        >
          <span class="button-text">Выйти</span>
          <span class="button-out-svg"></span>
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapState(["isAuth"]),
    ...mapState(["user"]),
    showNav() {
      if (this.isAuth) {
        this.$refs.name.style.display = "block";
      }
    },
  },
  methods: {
    logOut() {
      this.$store.commit("setIsAuth", false);
      this.$store.commit("setUser", {});
    },
  },
};
</script>

<style></style>
