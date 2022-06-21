<template>
  <router-link
    :to="{
      path: '/restaurant/' + formUrl,
    }"
    class="card card-restaurant"
  >
    <img :src="require(`../../${image}`)" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">{{ name }}</h3>
        <span class="card-tag tag">{{ time_of_delivery }} мин</span>
      </div>
      <!-- /.card-heading -->
      <div class="card-info">
        <div class="rating">{{ stars }}</div>
        <div class="price">От {{ price }} ₽</div>
        <div class="category">{{ kitchen }}</div>
      </div>
      <!-- /.card-info -->
    </div>
    <!-- /.card-text -->
  </router-link>
</template>

<script>
export default {
  name: "CompCard",
  props: {
    image: {
      type: String,
      required: true,
    },
    kitchen: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    time_of_delivery: {
      type: Number,
      required: true,
    },
    products: {
      type: String,
      required: true,
    },
  },
  computed: {
    formUrl() {
      return this.products.replace(".json", "");
    },
  },
};
</script>

<style></style>
