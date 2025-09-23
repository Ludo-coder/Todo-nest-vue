<template>
  <div>
    <div class="flex justify-between items-center mb-4 pb-2 border-b-2">
      <h2 class="text-2xl font-bold">Ma TODO List</h2>
      <button
        @click="showModal = true"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Ajouter
      </button>
    </div>

    <ul class="space-y-2">
      <li
        v-for="todo in todos.data"
        :key="todo.id"
        class="p-2 bg-white rounded-sm shadow flex-column justify-between items-center"
      >
        <div class="mb-3">
          <div class="flex justify-between">
            <span class="font-bold">{{ todo.title }}</span>
            <div
              v-if="todo.priority === TodoPriority.HIGH"
              class="text-red-600 font-bold bg-red-200 rounded-sm p-1"
            >
              {{ todo.priority }}
            </div>
            <div
              v-if="todo.priority === TodoPriority.MEDIUM"
              class="text-orange-600 font-bold bg-orange-200 rounded-sm p-1"
            >
              {{ todo.priority }}
            </div>
            <div
              v-if="todo.priority === TodoPriority.LOW"
              class="text-yellow-600 font-bold bg-yellow-200 rounded-sm p-1"
            >
              {{ todo.priority }}
            </div>
          </div>
          <p>{{ todo.content }}</p>
        </div>
        <div class="flex justify-between">
          <div>
            <span class="px-2 py-1 rounded bg-green-100 text-xs font-semibold">
              {{ todo.category }}
            </span>
          </div>
          <div class="flex gap-4">
            <button
              @click="handleUpdateTodo(todo.id)"
              class="text-blue-600 rounded-md p-1 hover:bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-7-7l7 7m0 0L13 5l7 7z"
                />
              </svg>
            </button>
            <button
              @click="handleDeleteTodo(todo.id)"
              class="text-red-600 rounded-md p-1 hover:bg-red-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          @click="showModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 class="text-xl font-semibold mb-4">Ajouter un TODO</h3>
        <input
          v-model="title"
          placeholder="Nom de la tâche"
          class="border p-2 rounded w-full"
          maxlength="49"
        />
        <p v-if="errors.title" class="text-red-600 text-sm mb-2">
          {{ errors.title }}
        </p>

        <textarea
          v-model="content"
          placeholder="Description"
          class="border p-2 rounded w-full resize-none mt-2"
          maxlength="255"
        />
        <p v-if="errors.title" class="text-red-600 text-sm mb-2">
          {{ errors.content }}
        </p>

        <div class="flex space-x-2 mb-4 mt-4">
          <label
            v-for="p in Object.values(TodoPriority)"
            :key="p"
            class="cursor-pointer px-4 py-2 rounded-full border text-sm font-semibold transition"
            :class="
              priority === p
                ? priorityColor(p)
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            "
          >
            <input type="radio" class="hidden" :value="p" v-model="priority" />
            {{ p }}
          </label>
        </div>
        <select v-model="category" class="border p-2 rounded w-full mb-4">
          <option
            v-for="category in Object.values(CategoryName)"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <div class="flex justify-end space-x-2">
          <button
            @click="showModal = false"
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            @click="handleCreateTodo"
            class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useTodos } from "../composables/todos/useTodos";
import { useRoute } from "vue-router";
import { CategoryName, TodoPriority } from "../composables/todos/types";

export default defineComponent({
  name: "HomePage",
  setup() {
    const route = useRoute();
    // const { loading, , updateTodo } =
    //   useTodos();

    const { todos, listTodos, deleteTodo, createTodo } = useTodos();

    const title = ref("");
    const content = ref("");
    const priority = ref(TodoPriority.LOW);
    const category = ref(CategoryName.WORK);
    const executionDate = ref(null);
    const errors = ref<{
      title?: string;
      content?: string;
    }>({});

    const showModal = ref(false);

    onMounted(() => {
      const page = Number(route.query.page ?? 1);
      const limit = Number(route.query.limit ?? 10);
      listTodos({ page, limit });
    });

    const handleCreateTodo = async () => {
      errors.value = {};
      if (!title.value.trim()) {
        errors.value.title = "Le titre est requis";
      }
      if (!content.value.trim()) {
        errors.value.content = "La description est requise";
      }

      if (Object.keys(errors.value).length > 0) {
        return;
      }

      await createTodo({
        category: category.value,
        content: content.value,
        priority: priority.value,
        title: title.value,
      });
      title.value = "";
      content.value = "";
      priority.value = TodoPriority.LOW;
      category.value = CategoryName.WORK;
      executionDate.value = null;
      showModal.value = false;
    };

    const handleUpdateTodo = async (id: number) => {
      console.log(id);
      //   await updateTodo(id);
      showModal.value = false;
    };

    const handleDeleteTodo = (id: number) => {
      deleteTodo(id);
    };

    const priorityColor = (p: TodoPriority) => {
      switch (p) {
        case TodoPriority.HIGH:
          return "bg-red-200 text-red-600 border-red-200";
        case TodoPriority.MEDIUM:
          return "bg-orange-200 text-orange-600 border-orange-200";
        case TodoPriority.LOW:
          return "bg-yellow-200 text-yellow-600 border-yellow-200";
        default:
          return "bg-gray-200 text-gray-800 border-gray-200";
      }
    };

    return {
      todos,
      handleCreateTodo,
      handleDeleteTodo,
      showModal,
      handleUpdateTodo,
      TodoPriority,
      CategoryName,
      title,
      content,
      priority,
      category,
      executionDate,
      priorityColor,
      errors,
    };
  },
});
</script>
