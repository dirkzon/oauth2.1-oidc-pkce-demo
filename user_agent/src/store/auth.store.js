import { defineStore } from 'pinia';
import { fetchWrapper, router } from '@/helper';
import { useLocalStorage } from "@vueuse/core"
import { useProfileStore } from "@/store"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        accessToken: useLocalStorage('accessToken', ""),
        refreshToken: useLocalStorage('refreshToken', ""),
        codeChallenge: useLocalStorage('codeChallenge', ""),
        codeVerifier: useLocalStorage('codeVerifier', ""),
    }),
    actions: {
        async login() {
            this.codeVerifier = this.generateCodeVerifier()
            this.generateCodeChallenge(this.codeVerifier).then((codeChallenge) => {
                this.codeChallenge = codeChallenge
                fetchWrapper.get(`${import.meta.env.VITE_CLIENT_BASE_URL}/login?code_challenge=${this.codeChallenge}`).then((response) => {
                    const loginUri = response.data;
                    window.location.href = loginUri;
                }).catch((error) => console.log(error));
            })
        },
        async logout() {
            fetchWrapper.post(`${import.meta.env.VITE_CLIENT_BASE_URL}/logout`, {}, {refresh_token: this.refreshToken}).then(() => {
                localStorage.clear()
                router.push("/").then(() => window.location.reload())
            }).catch((error) => console.log(error));
        },
        async connect(code) {       
            fetchWrapper.post(`${import.meta.env.VITE_CLIENT_BASE_URL}/connect`, { 
                code: code,
                code_verifier: this.codeVerifier,
            }).then((response) => {
                const { access_token, refresh_token, _ } = response
                this.accessToken = access_token,
                this.refreshToken = refresh_token
                const profileStore = useProfileStore();
                profileStore.getUserFromJWT(access_token);
                router.push('/');
            }).catch((error) => {
                console.log(error)
            }) 
        },
        refreshAccessToken() {
            return fetchWrapper.post(`${import.meta.env.VITE_CLIENT_BASE_URL}/refresh`, {
                refresh_token: this.refreshToken
            }).then((response) => {
                this.accessToken = response.access_token;
                this.refreshToken = response.refresh_token;
                return;
            }).catch((error) => {
                console.log(error)
            })
        },
        generateCodeVerifier(length = 40) {
            const array = new Uint32Array(length);
            window.crypto.getRandomValues(array);
            return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
        },
        async generateCodeChallenge(codeVerifier) {
            const encoder = new TextEncoder();
            const data = encoder.encode(codeVerifier);
            const digest = await window.crypto.subtle.digest('SHA-256', data);
            return btoa(String.fromCharCode(...new Uint8Array(digest)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }
    },
});
