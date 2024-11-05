import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import MoviePage from "@/components/MoviePage.vue";
import SignUpPage from "@/components/SignUpPage.vue";
import CreateBoard from "@/components/CreateMovieBoard.vue";
import MovieDetailPage from "@/components/MovieDetailPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import LogoutPage from "@/components/LogoutPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/movie",
    component: MoviePage,
  },
  {
    path: "/signUp",
    component: SignUpPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/logout",
    component: LogoutPage,
  },
  {
    path: "/movie/create",
    component: CreateBoard,
  },
  {
    path: "/movie/:id",
    component: MovieDetailPage,
    props: true, // props를 true로 설정하여 경로 매개변수를 props로 전달
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
