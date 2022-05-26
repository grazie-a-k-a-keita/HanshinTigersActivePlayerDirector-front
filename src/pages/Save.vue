<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const name = ref();
const backNumber = ref("");
const birthday = ref("");
const age = ref();

const player = computed(() =>
  JSON.stringify({
    name: name.value,
    backNumber: backNumber.value,
    birthday: birthday.value,
    age: Number(age.value),
  })
);

const update = async () => {
  await fetch("http://localhost:8080/save", {
    method: "POST",
    body: player.value,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
</script>

<template>
  <!-- {{ route.path }} -->

  {{ player }}
  <p>選手名：</p>
  <input v-model="name" type="text" />
  <p>背番号：</p>
  <input v-model="backNumber" type="text" />
  <p>生年月日：</p>
  <input v-model="birthday" type="text" />
  <p>年齢：</p>
  <input v-model="age" type="number" />

  <router-link to="/" @click="update()">更新</router-link>
  <router-link to="/">戻る</router-link>
</template>
