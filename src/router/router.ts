import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/MainPage.vue";
import Dictionary from "../pages/DictionaryPage.vue";

const routes = [
    { path: "/", name: "main", component: Main },
    { path: "/dictionary", name: "dictionary", component: Dictionary },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;