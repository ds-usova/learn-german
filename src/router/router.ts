import {createRouter, createWebHistory} from "vue-router";
import Main from "../pages/MainPage.vue";

const routes = [
    { path: "/", name: "main", component: Main },
    { path: "/dictionary", name: "dictionary", component: import('../pages/DictionaryPage.vue') },
    { path: "/grammar", name: "grammar", component: import('../pages/GrammarPage.vue') },
    { path: "/lists", name: "lists", component: import('../pages/WordListsPage.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;