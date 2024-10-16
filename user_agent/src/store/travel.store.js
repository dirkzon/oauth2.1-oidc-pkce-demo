import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helper';
import { useLocalStorage } from "@vueuse/core"

export const useTravelStore = defineStore({
    id: 'travel',
    state: () => ({
        test: ""
    }),
    actions: {
        getUserTravel() {
            fetchWrapper.get(`${import.meta.env.VITE_CLIENT_BASE_URL}/travel`).then((response) => {
                console.log(response);
            }).catch((error) => console.log(error));
        },
        }
    },
);
