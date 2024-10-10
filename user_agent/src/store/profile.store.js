import { defineStore } from 'pinia';
import axios from "axios"

const baseUrl = "http://localhost:5000"

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        
    }),
    actions: {

    },
    getters: {
        getRedirectUrl: (state) => state.redirectUrl
    }
});
