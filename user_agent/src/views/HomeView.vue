<script setup>
import { useAuthStore } from "@/store"

const authStore = useAuthStore();

async function test() {
  await authStore.login()
}
</script>

<template>
  <main>
    <h1>hi</h1>
    <button @click="test">click me</button>
  </main>
</template>
