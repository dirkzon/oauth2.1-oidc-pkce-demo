<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { useAuthStore } from "@/store"

const { session_state, iss, code } = useRoute().query
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.connect(code)
})

</script>

<template>
  <div class="callback">
    <h1>This is an callback page</h1>
  </div>
</template>
