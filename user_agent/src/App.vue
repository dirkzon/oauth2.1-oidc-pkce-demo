<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div id="app">
      <RouterView />
    </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  min-height: 100vh;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.text {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FF6500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #E85C0D;
}
</style>
