import { defineStore } from 'pinia';
import { fetchWrapper, router } from '@/helper';

const baseUrl = "http://localhost:5000"

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        profile: null
    }),
    actions: {
        async fetchProfile() {
            this.profile = await fetchWrapper.get(`${baseUrl}/profile`)
        }
    },
});
