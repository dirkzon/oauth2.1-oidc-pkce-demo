<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue';
import { useAuthStore } from "@/store"

const { _, __, code } = useRoute().query
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.connect(code)
})
</script>

<template>
</template>
