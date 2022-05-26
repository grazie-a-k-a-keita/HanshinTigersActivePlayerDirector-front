<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const name = ref(route.params.name);
const backNumber = ref(route.params.backNumber);
const birthday = ref(route.params.birthday);
const age = ref(route.params.age);

const player = computed(() =>
  JSON.stringify({
    id: Number(route.params.playerId),
    name: name.value,
    backNumber: backNumber.value,
    birthday: birthday.value,
    age: Number(age.value),
  })
);

const update = async () => {
  await fetch("http://localhost:8080/update", {
    method: "POST",
    body: player.value,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const errorMesage = ref();

const clickUpdate = async () => {
  try {
    await update();
    await router.push("/");
  } catch (error) {
    errorMesage.value = error.toString();
  }
};
</script>

<template>
  <!-- {{ route.path }} -->

  <div class="text-red-500" v-if="errorMesage">{{ errorMesage }}</div>

  {{ player }}
  <p>選手名：</p>
  <input v-model="name" type="text" />
  <p>背番号：</p>
  <input v-model="backNumber" type="text" />
  <p>生年月日：</p>
  <input v-model="birthday" type="text" />
  <p>年齢：</p>
  <input v-model="age" type="number" />

  <div @click="clickUpdate()">更新</div>
  <router-link to="/">戻る</router-link>
</template>
