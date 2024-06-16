<script setup lang="ts">
import { ref, onMounted } from "vue";
import HomeHeader from "../components/HomeHeader.vue";
import Edit from "../components/Edit.vue";
import Delete from "../components/Delete.vue";

interface Player {
  id: number;
  name: string;
  backNumber: string;
  birthday: string;
  age: number;
}

const players = ref<Player[]>([]);

onMounted(async () => {
  players.value = await (
    await fetch("http://localhost:8080/all-player")
  ).json();
});
</script>

<template>
  <div class="body z-10">
    <div class="transparent">
      <HomeHeader class="sticky top-0 z-50" />
      <div class="shadow-xl m-16 rounded-lg z-40 overflow-y-scroll">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-500 bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4 sticky top-0 bg-gray-100">
                選手名
              </th>
              <th scope="col" class="px-6 py-4 sticky top-0 bg-gray-100">
                背番号
              </th>
              <th scope="col" class="px-6 py-4 sticky top-0 bg-gray-100">
                生年月日
              </th>
              <th scope="col" class="px-6 py-4 sticky top-0 bg-gray-100">
                年齢
              </th>
              <th scope="col" class="px-6 py-4 sticky top-0 bg-gray-100">
                編集
              </th>
              <th scope="col" class="px-6 py-4 sticky top-0 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody class="text-xs text-gray-700">
            <tr v-for="player in players" :key="player.id">
              <td class="tdName border px-6 py-4">{{ player.name }}</td>
              <td class="tdBackNumber border px-6 py-4">
                {{ player.backNumber }}
              </td>
              <td class="tdBirthday border px-6 py-4">
                {{ player.birthday }}
              </td>
              <td class="tdAge border px-6 py-4">{{ player.age }}</td>
              <Edit
                :playerId="player.id"
                :name="player.name"
                :backNumber="player.backNumber"
                :birthday="player.birthday"
                :age="player.age"
                class="px-6 py-4 tdUpdate"
              />
              <Delete
                :playerId="player.id"
                :name="player.name"
                :backNumber="player.backNumber"
                :birthday="player.birthday"
                :age="player.age"
                class="px-6 py-4 tdDelete"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background-image: url("../assets/koushienn.jpeg");
  background-size: cover;
}
.transparent {
  background-color: rgba(255, 255, 255, 0.8);
  padding-bottom: 12vh;
}
.overflow-y-scroll {
  height: 36.5rem;
}
</style>
