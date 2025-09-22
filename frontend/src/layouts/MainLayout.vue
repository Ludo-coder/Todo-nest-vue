<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <header class="bg-blue-600 text-white p-4">
            <h1 class="text-xl font-bold">TODO App</h1>
        </header>

        <!-- Content -->
        <main class="flex-1 p-4 bg-gray-100">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-200 text-center p-4">
            &copy; 2025 TODO App
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainLayout',
});
</script>