import { defineStore } from 'pinia';
import { fetchWrapper, router } from '@/helper';

const baseUrl = "http://localhost:5000"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        auth: null
    }),
    actions: {
        async login() {
            const response = await fetchWrapper.get(`${baseUrl}/login`);
            const redirectUrl = response.data;
            window.location.href = redirectUrl;
        },
        async connect(code) {
            const response = await fetchWrapper.post(`${baseUrl}/connect`, { code: code })
            const { access_token, refresh_token, _ } = response.data
            this.auth = {
                accessToken: access_token,
                refreshToken: refresh_token
            }
            router.push("profile")
        }
    },
});
