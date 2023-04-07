import {createRouter, createWebHistory} from "vue-router";
import BoardsPage from '../pages/BoardsPage.vue'
import MainPage from '../pages/MainPage.vue'
import ProfilePage from "../pages/ProfilePage.vue";
import BoardPage from '../pages/BoardPage.vue'
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import {useUserStore} from "../stores/UserStore.js";

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
        component: ProfilePage,
    },
    {
        path: `/boards/:id`,
        component: BoardPage,
        beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (!userStore.isAuth) {
                next('/login');
            } else {
                next();
            }
        }
    },
    {
        path: `/login`,
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (userStore.isAuth) {
                next('/profile');
            } else {
                next();
            }
        }
    },
    {
        path: `/register`,
        component: RegisterPage,
        beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (userStore.isAuth) {
                next('/profile');
            } else {
                next();
            }
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/'
    },
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;
