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
            fetchWrapper.get(`${baseUrl}/login`).then((response) => {
                const loginUri = response.data;
                window.location.href = loginUri;
            }).catch((error) => console.log(error));
        },
        async logout() {
            fetchWrapper.post(`${baseUrl}/logout`, {}, {refresh_token: this.auth.refreshToken}).then(() => {
                router.push('/')
            }).catch((error) => console.log(error));
        },
        async connect(code) {
            fetchWrapper.post(`${baseUrl}/connect`, { code: code }).then((response) => {
                const { access_token, refresh_token, _ } = response
                this.auth = {
                    accessToken: access_token,
                    refreshToken: refresh_token
                }
                router.push("profile")
            }).catch((error) => console.log(error))
        }
    },
});
