import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store';
import { HomeView, CallbackView, ProfileView } from '@/views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/callback',
          name: 'callback',
          component: CallbackView
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView
        }
      ]
});

router.beforeEach(async (to) => {
    const publicPages = ['/', '/callback'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.auth) {
        authStore.login()
    }
});