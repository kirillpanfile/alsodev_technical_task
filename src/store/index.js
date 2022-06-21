import { createStore } from "vuex";

export default createStore({
  state: {
    parteners: [],
    url: "",
    products: [],
    cart: [],
    tmp: [],
    user: {},
    users: [],
    isAuth: false,
  },
  getters: {},
  mutations: {
    setParteners(state, parteners) {
      state.parteners = parteners;
    },
    setUrl(state, url) {
      state.url = url;
    },
    setProducts(state, products) {
      state.products = products;
    },
    updateTMP(state, tmp) {
      state.tmp.push(tmp);
    },
    addItemToCart(state, item) {
      state.cart.push(item);
    },
    increaseCartCount(state, index) {
      state.cart[index].quantity++;
    },
    decreaseCartCount(state, index) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      }
    },
    deleteCurrentItem(state, index) {
      state.cart.splice(index, 1);
    },
    clearCart(state) {
      state.cart = [];
    },
    getUsers(state, users) {
      state.users = users;
    },
    setIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchParteners({ commit }) {
      const response = await fetch("/api/parteners");
      const parteners = await response.json();
      commit("setParteners", parteners);
    },
    async fetchUrl({ commit }) {
      let prod = this.state.url.replace("-", "");

      if (!this.state.tmp.includes(prod)) {
        commit("updateTMP", prod);
        const response = await fetch(`/api/${this.state.url}`);
        const data = await response.json();
        localStorage.setItem(prod, JSON.stringify(data));
        commit("setProducts", data);
      } else {
        commit("setProducts", JSON.parse(localStorage.getItem(prod)));
      }
    },
    addItemToCart({ commit }, item) {
      commit("addItemToCart", item);
    },
    async getUsers({ commit }) {
      const users = await fetch("/api/users");
      const usersData = await users.json();
      commit("getUsers", usersData);
    },
    async submitOrder({ commit }, order) {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
    },
  },
  modules: {},
});
