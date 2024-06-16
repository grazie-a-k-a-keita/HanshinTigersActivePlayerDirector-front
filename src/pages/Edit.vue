<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// 選手情報の変数定義
const name = ref(route.params.name);
const backNumber = ref(route.params.backNumber);
const birthday = ref(route.params.birthday);
const age = computed(() => {
  const date = new Date(String(birthday.value));
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const thisYearsBirthday = new Date(
    today.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return age + (thisYearsBirthday.getTime() > today.getTime() ? -1 : 0);
});
const player = computed(() =>
  JSON.stringify({
    id: Number(route.params.playerId),
    name: name.value,
    backNumber: backNumber.value,
    birthday: birthday.value,
    age: Number(age.value),
  })
);

/**
 * 選手情報を更新する
 */
const update = async () => {
  await fetch("http://localhost:8080/update", {
    method: "POST",
    body: player.value,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const nameNull = ref();
const backNumberNull = ref();
const backNumberNotNumber = ref();
const birthdayNull = ref();

/**
 * 更新ボタンクリック時の処理
 */
const clickUpdate = async () => {
  try {
    // 変数初期化
    nameNull.value = null;
    backNumberNull.value = null;
    backNumberNotNumber.value = null;
    birthdayNull.value = null;
    // チェック
    if (name.value == "") {
      nameNull.value = "e";
      if (backNumber.value == "") {
        backNumberNull.value = "e";
      } else if (isNaN(Number(backNumber.value))) {
        backNumberNotNumber.value = "e";
      }
      if (birthday.value == "") {
        birthdayNull.value = "e";
      }
    } else if (backNumber.value == "") {
      backNumberNull.value = "e";
      if (birthday.value == "") {
        birthdayNull.value = "e";
      }
    } else if (isNaN(Number(backNumber.value))) {
      backNumberNotNumber.value = "e";
      if (birthday.value == "") {
        birthdayNull.value = "e";
      }
    } else if (birthday.value == "") {
      birthdayNull.value = "e";
    } else {
      await update();
      await router.push("/");
    }
  } catch (error) {
    alert("もう一度内容を確認してください。");
  }
};
</script>

<template>
  <div class="pb-52 bg-gradient-to-r from-blue-500">
    <header
      class="bg-black bg-gradient-to-r from-blue-500 border-b-2 border-gray-600 h-24 mb-16"
    >
      <h1
        class="flex-auto font-mono text-3xl text-white font-black italic leading-none ml-6 text-center"
      >
        選手編集フォーム
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
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
          <p v-if="nameNull" class="text-red-500 mt-2 text-left font-medium">
            ※必須項目です。
          </p>
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
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
          <p
            v-if="backNumberNull"
            class="text-red-500 mt-2 text-left font-medium"
          >
            ※必須項目です。
          </p>
          <p
            v-if="backNumberNotNumber"
            class="text-red-500 mt-2 text-left font-medium"
          >
            ※半角数字で入力してください。
          </p>
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
            type="date"
            id="birthday"
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
          <p
            v-if="birthdayNull"
            class="text-red-500 mt-2 text-left font-medium"
          >
            ※必須項目です。
          </p>
        </div>
      </div>
      <div class="mb-6 mx-auto mx-80">
        <label
          class="block text-gray-500 font-bold text-left ml-4 mb-4"
          for="age"
          >年齢（※自動入力）：</label
        >
        <div class="">
          <input
            v-model="age"
            type="number"
            id="age"
            class="w-full p-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
      </div>
      <div class="mt-16">
        <router-link
          to="/"
          class="mr-32 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"
          ></span>
          <span class="relative">戻る</span>
        </router-link>
        <button
          @click="clickUpdate()"
          class="mr-8 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"
          ></span>
          <span class="relative">更新</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  line-height: 96px;
}
input#age {
  pointer-events: none;
}
</style>
