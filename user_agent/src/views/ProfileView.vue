<script setup>
import { onMounted } from 'vue'
import { useProfileStore } from '@/store/profile.store';
import { useAuthStore } from '@/store';

const profileStore = useProfileStore()
const authStore = useAuthStore()

onMounted(async () => {
  await profileStore.fetchProfile()
});
</script>

<template>
  <h1> Profile info </h1>
  <h3> {{ profileStore.profile }} </h3>
  <button @click="authStore.logout()"> log out </button>
</template>
