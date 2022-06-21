<template>
  <body>
    <!-- /.container  -->

    <main class="main">
      <div class="container">
        <section class="menu" v-if="!loading">
          <div class="section-heading">
            <h2 class="section-title restaurant-title">
              {{ curretnPartener.name }}
            </h2>
            <div class="card-info">
              <div class="rating">{{ curretnPartener.stars }}</div>
              <div class="price">От {{ curretnPartener.price }} ₽</div>
              <div class="category">{{ curretnPartener.kitchen }}</div>
            </div>
            <!-- /.card-info -->
          </div>
          <div class="cards cards-menu" v-if="!loading">
            <prod-card
              v-for="product in products"
              :key="product.id"
              :description="product.description"
              :image="product.image"
              :name="product.name"
              :price="product.price"
              :id="product.id"
            ></prod-card>
          </div>
          <!-- /.cards -->
        </section>
        <div class="loading" v-else><div class="lds-dual-ring"></div></div>
      </div>
      <!-- /.container -->
    </main>
    <cart-modal ref="cartModal"></cart-modal>
  </body>
</template>

<script>
import { mapState } from "vuex";
import ProdCard from "@/components/UI/ProdCard.vue";
import CartModal from "@/components/UI/CartModal.vue";
export default {
  components: {
    ProdCard,
    CartModal,
  },
  data() {
    return {
      loading: true,
    };
  },
  beforeMount() {
    this.$store.commit("setProducts", []);
    this.$store.commit("setUrl", this.$route.params.id);
    this.$store.dispatch("fetchUrl").then(() => {
      this.loading = false;
    });
  },
  computed: {
    ...mapState(["products"]),
    ...mapState(["parteners"]),
    curretnPartener() {
      return this.parteners.find((partener) =>
        partener.products.includes(this.$route.params.id)
      );
    },
  },
};
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 120px 0px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: rgb(78, 78, 78) transparent rgb(78, 78, 78) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
  margin: 0 auto;
}
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
