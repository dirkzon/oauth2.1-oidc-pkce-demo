<script setup>
import { useAuthStore, useProfileStore, useTravelStore } from '@/store';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const profileStore = useProfileStore();
const travelStore = useTravelStore();

onMounted(async () => {
  await travelStore.getUserTravel()
})
</script>

<template>
  <div class="content">
    <div class="profile-info">
      <h1 class="section-title">Profile Info Extracted from JWT</h1>
      <div class="info">
        <p class="info-item">Username: <span>{{ profileStore.name }}</span></p>
        <p class="info-item">Email: <span>{{ profileStore.email }}</span></p>
        <p class="info-item">Email Verified: <span>{{ profileStore.email_verified }}</span></p>
        <p class="info-item">ID: <span>{{ profileStore.id }}</span></p>
      </div>
    </div>

    <div class="travel-info">
      <h1 class="section-title">Travel Info from Resource Server</h1>
      <table class="travel-table">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(destination, index) in travelStore.destinations" :key="index">
            <td>{{ destination.city }}</td>
            <td>{{ destination.lat }}</td>
            <td>{{ destination.long }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="total-distance">
      <h1 class="section-title">Total Distance Calculated from Client</h1>
      <p>{{ travelStore.totalDistance.toFixed(2) }}</p>
    </div>

    <div class="button-group">
      <button class="btn" @click="authStore.logout()">Log Out</button>
    </div>
  </div>
</template>
