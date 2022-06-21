import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/restaurant/:id",
    name: "restaurant",
    component: () => import("../views/Restaurant"),
  },
  // if 404
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
