<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div id="app">
      <RouterView />
    </div>
</template>

<style>
.content {
  max-width: fit-content;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #FF6500;
  padding-bottom: 5px;
}

.info {
  margin-bottom: 20px;
}

.info-item {
  font-size: 18px;
  color: #555;
}

.info-item span {
  font-weight: bold;
  color: #333;
}

.travel-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.travel-table th, .travel-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.travel-table th {
  background-color: #f9f9f9;
  font-weight: bold;
}

.total-distance {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
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

table, th, td {
  border:1px solid black;
  width: 100%;
}
</style>
