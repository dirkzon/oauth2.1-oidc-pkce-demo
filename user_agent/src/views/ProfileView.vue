<script setup>
import { onMounted } from 'vue'
import { useProfileStore } from '@/store/profile.store';

const profileStore = useProfileStore()

onMounted(async () => {
  await profileStore.fetchProfile()
});
</script>

<template>
  <h1> Profile info </h1>
  <h3> {{ profileStore.profile }} </h3>
</template>
