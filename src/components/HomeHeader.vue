<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const clickMove = () => {
  router.push("/save");
};
</script>

<template>
  <div
    class="bg-black flex bg-gradient-to-r from-yellow-500 border-b-2 border-gray-600"
  >
    <img alt="Vue logo" src="../assets/hanshin_logo.png" class="m-2 ml-8" />
    <h1
      class="flex-auto font-mono text-5xl text-white font-black italic leading-none ml-6"
    >
      阪神タイガース現役選手名簿
    </h1>
    <button
      @click="clickMove()"
      class="flex-auto text-gray-100 inline-block align-text-bottom text-xl hover:opacity-50 hover:underline text-yellow-600"
    >
      選手追加
    </button>
  </div>
</template>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
h1 {
  line-height: 108px;
  font-style: italic;
  font-family: Times New Roman, "ＭＳ Ｐゴシック";
}
</style>
