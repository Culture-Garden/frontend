import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import MoviePage from "@/components/movie/MoviePage.vue";
import SignUpPage from "@/components/auth/SignUpPage.vue";
import CreateBoard from "@/components/movie/CreateMovieBoard.vue";
import MovieDetailPage from "@/components/movie/MovieDetailPage.vue";
import LoginPage from "@/components/auth/LoginPage.vue";
import LogoutPage from "@/components/auth/LogoutPage.vue";
import MyProfile from "@/components/MyProfile/MyProfile.vue";
import MyProfileDetail from "@/components/MyProfile/MyProfileDetail.vue";
import EditMovieBoard from "@/components/movie/EditMovieBoard.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
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
    path: "/myProfile",
    component: MyProfile,
  },
  {
    path: "/myProfile/detail",
    component: MyProfileDetail,
  },
  {
    path: "/movie",
    component: MoviePage,
  },
  {
    path: "/movie/:id",
    component: MovieDetailPage,
  },
  {
    path: "/movie/create",
    component: CreateBoard,
  },
  {
    path: "/movie/edit/:id",
    component: EditMovieBoard,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
