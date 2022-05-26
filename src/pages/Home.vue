<script setup>
import { onMounted, ref, computed } from "vue";
import Sandbox from "../components/Sandbox.vue";
import HomeHeader from "../components/HomeHeader.vue";
import Edit from "../components/Edit.vue";
import Delete from "../components/Delete.vue";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// (function () {
//   location.reload();
//   return;
// })();

const players = ref([]);
onMounted(async () => {
  players.value = await (await fetch("http://localhost:8080/allPlayer")).json();
});

// GET POST PUT DELETE
// http://localhost:8080/allPlayer - GET
// http://localhost:8080/save - POST
// http://localhost:8080/update - POST
// http://localhost:8080/delete - POST

// http://localhost:8080/players - GET -> List<Player>
// http://localhost:8080/players - POST -> void or Player
// http://localhost:8080/players/{id} - PUT -> void or Player
// http://localhost:8080/players/{id} - DELETE -> void
const name = ref("");
const bacuNumber = ref("0");
const birthday = ref("1999-10-28");
const age = computed(() => {
  const date = new Date(birthday.value);
  const today = new Date();
  return today.getYear() - date.getYear();
});

const player = computed(() =>
  JSON.stringify({
    name: name.value,
    bacuNumber: bacuNumber.value,
    birthday: birthday.value,
    age: age.value,
  })
);

const post = async () => {
  await fetch("http://localhost:8080/save", {
    method: "POST",
    body: player.value, // 送信する文字列
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const log = (message) => console.log(message);
</script>

<template>
  <div>Name: <input v-model="name" class="border border-green-300" /></div>
  <div>
    BacuNumber: <input v-model="bacuNumber" class="border border-green-300" />
  </div>
  age: {{ age }}
  <div class="text-sky-400">player: {{ player }}</div>
  <HomeHeader />
  <div class="bg-zinc-200 border-double border-4 border-gray-600 m-8">
    <table>
      <thead>
        <tr>
          <th class="border border-slate-300">選手名</th>
          <th class="border border-slate-300">背番号</th>
          <th class="border border-slate-300">生年月日</th>
          <th class="border border-slate-300">年齢</th>
          <th class="border border-slate-300" colspan="2">編集</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" class="border border-slate-300">
          <td>{{ player.name }}</td>
          <td>{{ player.backNumber }}</td>
          <td>{{ player.birthday }}</td>
          <td>{{ player.age }}</td>
          <Edit
            :playerId="player.id"
            :name="player.name"
            :backNumber="player.backNumber"
            :birthday="player.birthday"
            :age="player.age"
          />
          <Delete
            :playerId="player.id"
            :name="player.name"
            :backNumber="player.backNumber"
            :birthday="player.birthday"
            :age="player.age"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>
