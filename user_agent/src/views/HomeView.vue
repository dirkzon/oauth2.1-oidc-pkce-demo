<script setup>
import axios from "axios"

async function test() {
  var response = await axios.get('http://localhost:5000/login')
  alert(response.data)
  window.location.href = response.data
}
</script>

<template>
  <main>
    <h1>hi</h1>
    <button @click="test">click me</button>
  </main>
</template>
