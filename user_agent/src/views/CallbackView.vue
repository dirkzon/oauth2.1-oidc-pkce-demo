<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from "axios"

const { session_state, iss, code } = useRoute().query

const initialize = async () => {
  const router = useRouter();
  axios.post('http://localhost:5000/connect', {
      code: code
  }).then(() => {
    router.push('profile')
  }).catch(() => {
    router.back()
  })
}

initialize()
</script>

<template>
  <div class="callback">
    <h1>This is an callback page</h1>
  </div>
</template>
