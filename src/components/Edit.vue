<script setup lang="ts">
defineProps({
  playerId: Number,
  name: String,
  backNumber: String,
  birthday: String,
  age: Number,
});
</script>

<template>
  <td>
    <router-link
      :to="`/players/${playerId}/${name}/${backNumber}/${birthday}/${age}/edit`"
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >編集</router-link
    >
  </td>
</template>

<style scoped></style>
