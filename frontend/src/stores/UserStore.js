import {defineStore} from "pinia";
import {onMounted, ref} from "vue";
import AuthService from "../services/AuthService.js";
import axios from "axios";
import {API_URL} from "../services/api.js";

export const useUserStore = defineStore('userStore', () => {
    const isAuth = ref(false);
    const currentUser = ref({});
    const currentUserBoards = ref([]);
    const message = ref('')
    const loading = ref(false)

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            isAuth.value = true
            currentUser.value = response.data.user
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const registration = async (email, password, username) => {
        try {
            const response = await AuthService.registration(email, password, username);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const logout = async () => {
        try {
            const response = await AuthService.logout();
            console.log(response)
            localStorage.removeItem('token');
            isAuth.value = false
            currentUser.value = {}
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const checkAuth = async () => {
        loading.value = true
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            isAuth.value = true
            currentUser.value = response.data.user
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        checkAuth()
    })

    return {
        isAuth,
        currentUser,
        message,
        loading,
        login,
        registration,
        logout,
        checkAuth,
        currentUserBoards,
    }
})

