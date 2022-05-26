<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const name = ref(route.params.name);
const backNumber = ref(route.params.backNumber);
const birthday = ref(route.params.birthday);
const age = ref(route.params.age);

const player = computed(() =>
  JSON.stringify({
    id: Number(route.params.playerId),
  })
);

const update = async () => {
  await fetch("http://localhost:8080/delete", {
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
  {{ name }}
  <p>背番号：</p>
  {{ backNumber }}
  <p>生年月日：</p>
  {{ birthday }}
  <p>年齢：</p>
  {{ age }}

  <router-link to="/" @click="update()">削除</router-link>
  <router-link to="/">戻る</router-link>
</template>
