<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="bg-green-400 text-white p-4 rounded-br-2xl rounded-bl-2xl flex justify-between"
    >
      <h1 class="text-xl font-bold">TODO APP</h1>
      <div class="flex items-center">
        <div v-if="user" class="text-sm flex items-center gap-3">
          <div class="flex gap-1">
            <span class="font-semibold">{{ user.firstName }}</span>
            <span class="font-semibold">{{ user.lastName }}</span>
          </div>
          <img
            :src="user.profileUrl"
            alt="Avatar"
            class="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <button
          v-if="user"
          @click="logout"
          class="ml-4 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>
    </header>

    <main class="flex-1 p-4 bg-gray-100">
      <router-view />
    </main>

    <footer class="bg-gray-200 text-center p-4 rounded-tr-2xl rounded-tl-2xl">
      &copy; 2025 TODO App
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useAuth } from "../composables/auth/useAuth";
import { ILoginResponse } from "../composables/auth/types";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const user = ref<ILoginResponse["user"] | null>(null);
    const { logout } = useAuth();

    onMounted(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      }
    });

    return { user, logout };
  },
});
</script>
