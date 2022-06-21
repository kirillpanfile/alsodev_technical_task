<template>
  <div class="modal-auth" ref="auth">
    <div class="modal-dialog modal-dialog-auth">
      <button class="close-auth" @click="close">&times;</button>
      <form id="logInForm" @submit.prevent="signIn">
        <fieldset class="modal-body">
          <legend class="modal-title">Авторизация</legend>
          <label class="label-auth">
            <span>Логин</span>
            <input id="login" v-model="login" type="text" />
          </label>
          <label class="label-auth">
            <span>Пароль</span>
            <input id="password" v-model="password" type="password" />
          </label>
        </fieldset>
        <!-- /.modal-body -->
        <div class="modal-footer">
          <div class="footer-buttons">
            <button class="button button-primary button-login" type="submit">
              Войти
            </button>
          </div>
        </div>
      </form>
      <!-- /.modal-footer -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
export default {
  name: "AuthModal",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    open() {
      this.$refs.auth.style.display = "block";
    },
    close() {
      this.$refs.auth.style.display = "none";
    },
    signIn() {
      let user = {
        login: this.login,
        password: this.password,
      };
      this.$store.dispatch("getUsers");
      if (this.$store.state.users.length > 0) {
        this.$store.state.users.forEach((element) => {
          if (
            element.login === user.login &&
            element.password === user.password
          ) {
            this.$store.commit("setIsAuth", true);
            this.$store.commit("setUser", element);
            this.close();
          } else {
            alert("Неверный логин или пароль");
          }
        });
      }
    },
  },
};
</script>

<style></style>
