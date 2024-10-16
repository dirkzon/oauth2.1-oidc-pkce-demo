import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helper';
import { useLocalStorage } from "@vueuse/core"

export const useTravelStore = defineStore({
    id: 'travel',
    state: () => ({
        destinations: useLocalStorage("destinations", []),
        totalDistance: useLocalStorage("totalDistance", 0)
    }),
    actions: {
            getUserTravel() {
                fetchWrapper.get(`${import.meta.env.VITE_CLIENT_BASE_URL}/travel`).then((response) => {
                    const { destinations,  distance } = response.data;
                    this.destinations = destinations;
                    this.totalDistance = distance;
                }).catch((error) => console.log(error));
            },
        }
    },
);
