<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// 選手情報の変数定義
const name = ref(route.params.name);
const backNumber = ref(route.params.backNumber);
const birthday = ref(route.params.birthday);
const age = ref(route.params.age);
const player = computed(() =>
  JSON.stringify({
    id: Number(route.params.playerId),
  })
);

// 送信関数
const deletion = async () => {
  await fetch(
    "//cdkst-servi-jmvvy8m30vww-525412200.ap-northeast-1.elb.amazonaws.com/delete",
    {
      method: "POST",
      body: player.value,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// 送信実行 + 確認アラート
async function confirmFunction() {
  var message = "この選手を削除してもいいですか？";
  if (confirm(message)) {
    await deletion();
    await router.push("/");
  } else {
  }
}
</script>

<template>
  <div class="pb-52 bg-gradient-to-r from-red-500">
    <header
      class="bg-black bg-gradient-to-r from-red-500 border-b-2 border-gray-600 h-24 mb-16"
    >
      <h1
        class="flex-auto font-mono text-3xl text-white font-black italic leading-none ml-6 text-center"
      >
        選手削除フォーム
      </h1>
    </header>

    <form class="w-full text-center">
      <div class="mb-6 mx-auto mx-80">
        <label
          class="block text-gray-500 font-bold text-left ml-4 mb-4"
          for="player-name"
          >選手名：</label
        >
        <div class="">
          <input
            v-model="name"
            type="text"
            id="player-name"
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="mb-6 mx-auto mx-80">
        <label
          class="block text-gray-500 font-bold text-left ml-4 mb-4"
          for="back-number"
          >背番号（半角数字）：</label
        >
        <div class="">
          <input
            v-model="backNumber"
            type="text"
            id="back-number"
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="mb-6 mx-auto mx-80">
        <label
          class="block text-gray-500 font-bold text-left ml-4 mb-4"
          for="birthday"
          >生年月日：</label
        >
        <div class="">
          <input
            v-model="birthday"
            type="text"
            id="birthday"
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="mb-6 mx-auto mx-80">
        <label
          class="block text-gray-500 font-bold text-left ml-4 mb-4"
          for="age"
          >年齢：</label
        >
        <div class="">
          <input
            v-model="age"
            type="number"
            id="age"
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>
      <div class="mt-16">
        <router-link
          to="/"
          class="mr-32 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"
          ></span>
          <span class="relative">戻る</span>
        </router-link>
        <button
          @click="confirmFunction()"
          class="mr-8 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"
          ></span>
          <span class="relative">削除</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  line-height: 96px;
}
input#player-name {
  pointer-events: none;
}
input#back-number {
  pointer-events: none;
}
input#birthday {
  pointer-events: none;
}
input#age {
  pointer-events: none;
}
</style>
