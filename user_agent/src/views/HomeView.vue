<script setup>
import { useAuthStore } from "@/store"
import { useProfileStore } from "@/store"
import { router } from '@/helper';


const authStore = useAuthStore();
const profileStore = useProfileStore();

async function login() {
  await authStore.login()
}
</script>

<template>
  <main>
    <div class="content">
      <div>
        <h1 v-if="!authStore.accessToken" class="text">Welcome</h1>
        <h1 v-else class="text">Welcome {{ profileStore.name }}!</h1>
      </div>
      <div>
        <button v-if="!authStore.accessToken" class="btn" @click="login">Connect with keycloak</button>
        <button v-else class="btn" @click="router.push('profile')">View account</button>
      </div>
    </div>
  </main>
</template>