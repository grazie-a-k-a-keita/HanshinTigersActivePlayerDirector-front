<script setup>
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
      >編集</router-link
    >
  </td>
</template>

<style scoped></style>
