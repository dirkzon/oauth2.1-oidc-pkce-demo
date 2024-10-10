import { defineStore } from 'pinia';
import axios from "axios"
import { fetchWrapper, router } from '@/helper';

const baseUrl = "http://localhost:5000"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: null,
        refreshToken: null,
        user: null
    }),
    actions: {
        async connect(code) {
            await axios.post(`${baseUrl}/connect`, {
                code: code
            }).then((response) => {
                const { access_token, refresh_token, _ } = response.data
                this.accessToken = access_token
                this.refreshToken = refresh_token
                this.user = {"bla":"bla"}
                router.push("profile")
            }).catch(() => {
                console.log(error)
            })
        },
        async login() {
            const response = await fetchWrapper.get(`${baseUrl}/login`)
            window.location.href = response.data
        }
    },
});
