import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/home",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  if (to.name !== "LoginPage" && !isAuthenticated) next({ name: "LoginPage" });
  else next();
});

export default router;
