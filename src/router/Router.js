import {createRouter, createWebHistory} from "vue-router";
import BoardsPage from '../pages/BoardsPage.vue'
import MainPage from '../pages/MainPage.vue'
import ProfilePage from "../pages/ProfilePage.vue";
import BoardPage from '../pages/BoardPage.vue'

const routes = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/boards',
        component: BoardsPage,
    },
    {
        path: '/profile',
        component: ProfilePage
    },
    {
        path: `/board/:id`,
        component: BoardPage
    }
]

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router;
