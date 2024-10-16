<script setup>
import { useAuthStore, useProfileStore, useTravelStore } from '@/store';

const authStore = useAuthStore();
const profileStore = useProfileStore();
const travelStore = useTravelStore();
</script>

<template>
    <div class="content">
      <h1 class="text"> Profile info</h1>
      <div style="text-align: start;">
        <p class="text"> Username: {{ profileStore.name }}</p>
        <p class="text"> email: {{ profileStore.email }} </p>
        <p class="text"> email verified: {{ profileStore.email_verified }}</p>
        <p class="text"> id: {{ profileStore.id }}</p>
      </div>
      <button  class="btn" @click="authStore.logout()"> log out </button>
      <button  class="btn" @click="travelStore.getUserTravel()"> test </button>
    </div>
</template>
