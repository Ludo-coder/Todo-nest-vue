<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-green-400 text-white p-4 rounded-br-2xl rounded-bl-2xl">
      <h1 class="text-xl font-bold">TODO APP</h1>
    </header>

    <!-- Content -->
    <main class="flex-1 p-4 bg-gray-100">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 text-center p-4 rounded-tr-2xl rounded-tl-2xl">
      &copy; 2025 TODO App
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
