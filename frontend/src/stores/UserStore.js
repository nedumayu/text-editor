import {defineStore} from "pinia";
import {onMounted, ref} from "vue";
import AuthService from "../services/AuthService.js";
import axios from "axios";
import {API_URL} from "../services/api.js";
import UserService from "../services/UserService.js";

export const useUserStore = defineStore('userStore', () => {
    const isAuth = ref(false);
    const currentUser = ref({});
    const users = ref([]);
    const message = ref('')
    const loading = ref(false)

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            isAuth.value = true
            currentUser.value = response.data.user
            return response
        } catch (e) {
            return e.response?.data
        }
    }

    const registration = async (email, password, username) => {
        try {
            const response = await AuthService.registration(email, password, username);
            localStorage.setItem('token', response.data.accessToken);
            return response
        } catch (e) {
            return e.response?.data
        }
    }

    const logout = async () => {
        try {
            const response = await AuthService.logout();
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
            localStorage.setItem('token', response.data.accessToken);
            isAuth.value = true
            currentUser.value = response.data.user
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            loading.value = false
        }
    }

    const updateUser = async (userData) => {
        try {
            const response = await UserService.updateUser(userData)
            currentUser.value = response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await UserService.deleteUser(id)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const getUsers = async () => {
        try {
            const response = await UserService.getUsers()
            users.value = response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    onMounted(() => {
        checkAuth()
    })

    return {
        isAuth,
        currentUser,
        users,
        message,
        loading,
        login,
        registration,
        logout,
        checkAuth,
        getUsers,
        updateUser,
        deleteUser
    }
})

