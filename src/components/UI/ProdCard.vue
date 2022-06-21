<template>
  <div class="card">
    <img :src="require(`../../${image}`)" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">{{ name }}</h3>
      </div>
      <!-- /.card-heading -->
      <div class="card-info">
        <div class="ingredients">
          {{ description }}
        </div>
      </div>
      <!-- /.card-info -->
      <div class="card-buttons">
        <button
          class="button button-primary button-add-cart"
          @click="addItemToCart"
          :disabled="!isAuth"
        >
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">{{ price }} ₽</strong>
      </div>
    </div>
    <!-- /.card-text -->
  </div>
  <!-- /.card -->
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProdCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["isAuth"]),
  },
  methods: {
    addItemToCart() {
      const item = {
        id: this.id,
        name: this.name,
        price: this.price,
        quantity: 1,
      };
      this.$store.dispatch("addItemToCart", item);
      this.$swal("товар добавлен в корзину");
    },
  },
};
</script>

<style></style>
