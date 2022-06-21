<template>
  <div class="modal modal-cart" ref="modal">
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">Корзина</h3>
        <button class="close" @click="close">&times;</button>
      </div>
      <!-- /.modal-header -->
      <div class="modal-body" v-if="cart.length >= 1">
        <div v-for="(item, index) in cart" :key="item.id" class="food-row">
          <span class="food-name">{{ item.name }}</span>
          <strong class="food-price">{{ item.price * item.quantity }} ₽</strong>
          <button class="food-delete" @click="deleteCurrentItem(index)">
            Удалить
          </button>
          <div class="food-counter">
            <button class="counter-button" @click="decreaseCartCount(index)">
              -
            </button>
            <span class="counter">{{ item.quantity }}</span>
            <button class="counter-button" @click="increaseCartCount(index)">
              +
            </button>
          </div>
        </div>
        <!-- /.foods-row -->
      </div>
      <div v-else class="cart-empty">Корзина пуста</div>
      <!-- /.modal-body -->
      <div class="modal-footer">
        <span class="modal-pricetag">{{ totalCartPrice }} ₽</span>
        <div class="footer-buttons">
          <button
            @click="submitOrder"
            :disabled="totalCartPrice < 1"
            class="button button-primary"
          >
            Оформить заказ
          </button>
          <button class="button clear-cart" @click="cancelOrder">Отмена</button>
        </div>
      </div>
      <!-- /.modal-footer -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CartModal",
  computed: {
    ...mapState({
      cart: (state) => state.cart,
    }),
    ...mapState({
      cart1: (state) => state.user.cart,
    }),
    totalCartPrice() {
      return this.cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    open() {
      this.$refs.modal.style.display = "block";
    },
    close() {
      this.$refs.modal.style.display = "none";
    },
    increaseCartCount(index) {
      this.$store.commit("increaseCartCount", index);
    },
    decreaseCartCount(index) {
      this.$store.commit("decreaseCartCount", index);
    },
    deleteCurrentItem(index) {
      this.$store.commit("deleteCurrentItem", index);
    },
    cancelOrder() {
      this.$store.commit("clearCart");
      //   this.closeModal();
    },
    submitOrder() {
      this.$store.dispatch("submitOrder", {
        user: this.$store.state.user,
        cart: this.$store.state.cart,
      });
      this.$store.commit("clearCart");
      this.close();
      this.$router.push("/");
    },
  },
};
</script>

<style>
.food-delete {
  background: transparent;
  color: black;
  border: 1px solid red;
  margin-right: 20px;
}

.modal {
  overflow-y: scroll;
}

.cart-empty {
  text-align: center;
  font-size: 20px;
  color: #666;
  padding: 20px;
}
</style>
