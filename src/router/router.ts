import {createRouter, createWebHistory} from "vue-router";
import Dictionary from "../pages/DictionaryPage.vue";

const routes = [
    {path: "/", name: "main", component: Dictionary},
    {path: "/dictionary", name: "dictionary", component: () => import('../pages/DictionaryPage.vue')},
    {path: "/practice", name: "practiceList", component: () => import('../pages/PracticeListPage.vue')},
    {path: "/practice/:id", name: "practice", component: () => import('../pages/PracticePage.vue'), props: true},
    {path: "/categories", name: "categories", component: () => import('../pages/CategoriesPage.vue')},
    {path: "/category/:id", name: "category", component: () => import('../pages/CategoryPage.vue'), props: true},
    {
        path: "/resource-management",
        name: "resource-management",
        component: () => import('../pages/ResourceManagementPage.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;