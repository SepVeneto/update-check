<script setup lang="ts">
import { check } from '@sepveneto/update-check'

function handleCheck() {
  check()
}
</script>

<template>
  <button @click="handleCheck">click me</button>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">about</RouterLink>
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
