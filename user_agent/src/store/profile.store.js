import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helper';

const baseUrl = "http://localhost:5000"

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        profile: null
    }),
    actions: {
        async fetchProfile() {
            await fetchWrapper.get(`${baseUrl}/profile`).then((response) => this.profile = response).catch((error) => console.log(error))
        }
    },
});
