<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Ma TODO List</h2>

        <div class="mb-4">
            <input v-model="newTodo" placeholder="Ajouter un TODO" class="border p-2 rounded w-full" />
            <button @click="addTodo" class="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Ajouter
            </button>
        </div>

        <ul class="space-y-2">
            <li v-for="todo in todos" :key="todo.id"
                class="p-2 bg-white rounded shadow flex justify-between items-center">
                <span>{{ todo.title }}</span>
                <button @click="deleteTodo(todo.id)" class="text-red-600 hover:underline">
                    Supprimer
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Todo {
    id: number;
    title: string;
}

export default defineComponent({
    name: 'HomePage',
    setup() {
        const todos = ref<Todo[]>([]);
        const newTodo = ref('');

        const addTodo = () => {
            if (!newTodo.value) return;
            todos.value.push({ id: Date.now(), title: newTodo.value });
            newTodo.value = '';
        };

        const deleteTodo = (id: number) => {
            todos.value = todos.value.filter((t) => t.id !== id);
        };

        return { todos, newTodo, addTodo, deleteTodo };
    },
});
</script>