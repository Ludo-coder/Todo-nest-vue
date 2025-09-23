<template>
  <div>
    <div class="flex justify-between items-center mb-4 pb-2 border-b-2">
      <h2 class="text-2xl font-bold">Ma TODO List</h2>
      <button
        @click="openModal()"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Ajouter
      </button>
    </div>

    <ul class="space-y-2">
      <TodoItem
        v-for="todo in todos.data"
        :key="todo.id"
        :todo="todo"
        @finish="handleFinishTodo"
        @edit="openModal"
        @delete="handleDeleteTodo"
      />
    </ul>

    <div class="flex justify-between items-center mt-4">
      <button
        :disabled="todos.page <= 1"
        @click="goToPage(todos.page - 1)"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Précédent
      </button>
      <span>Page {{ todos.page }} / {{ totalPages }}</span>
      <button
        :disabled="todos.page >= totalPages"
        @click="goToPage(todos.page + 1)"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>

    <TodoModal
      v-if="showModal"
      :editingTodo="editingTodo"
      @save="handleSaveTodo"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import TodoItem from "../components/todos/TodoItem.vue";
import TodoModal from "../components/todos/TodoModal.vue";
import { useTodos } from "../composables/todos/useTodos";
import { ITodo } from "../composables/todos/types";

export default defineComponent({
  name: "HomePage",
  components: { TodoItem, TodoModal },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { todos, listTodos, deleteTodo, createTodo, updateTodo } = useTodos();
    const showModal = ref(false);
    const editingTodo = ref<ITodo | null>(null);

    const totalPages = computed(() => Math.ceil(todos.total / todos.limit));

    onMounted(() => {
      const page = Number(route.query.page ?? 1);
      listTodos({ page, limit: todos.limit });
    });

    const openModal = (todo: ITodo | null = null) => {
      editingTodo.value = todo;
      showModal.value = true;
    };

    const handleSaveTodo = async (data: ITodo) => {
      if (editingTodo.value) {
        await updateTodo(editingTodo.value.id, data);
      } else {
        await createTodo(data);
      }
      showModal.value = false;
    };

    const handleDeleteTodo = (id: number) => deleteTodo(id);
    const handleFinishTodo = (id: number) =>
      updateTodo(id, { executionDate: new Date() });

    const goToPage = (page: number) => {
      router.push({ query: { ...route.query, page: String(page) } });
      listTodos({ page, limit: todos.limit });
    };

    return {
      todos,
      showModal,
      editingTodo,
      openModal,
      handleSaveTodo,
      handleDeleteTodo,
      handleFinishTodo,
      goToPage,
      totalPages,
    };
  },
});
</script>
