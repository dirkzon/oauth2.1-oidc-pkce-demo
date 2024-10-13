import { defineStore } from 'pinia';
import {jwtDecode}  from 'jwt-decode';
import { useLocalStorage } from "@vueuse/core"

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        name: useLocalStorage('name', ""),
        email: useLocalStorage('email', ""),
        email_verified: useLocalStorage('emailverified', false),
        id: useLocalStorage('id', ""), 
    }),
    actions: {
        getUserFromJWT(jwt) {
            const decodedToken = jwtDecode(jwt)
            this.name = decodedToken.name;
            this.email = decodedToken.email;
            this.email_verified = decodedToken.email_verified;
            this.id = decodedToken.sub;
        },
    },
});
