<script setup>
import axios from "axios"
import { ref, onMounted } from 'vue';

const user = ref(null)

onMounted(async () => {
  axios.get('http://localhost:5000/profile').then((response) => user.value = response.data).catch((error) => console.log(error))
});

</script>

<template>
  <h1> Profile info </h1>
  <h3> Id: {{ user.sub }}</h3>
  <h3> Name: {{ user.name }}</h3>
  <h3> Email: {{ user.email }}</h3>
</template>
