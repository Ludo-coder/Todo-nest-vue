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
        :class="[
          'p-2 rounded-sm shadow flex-column justify-between items-center',
          todo.executionDate ? 'bg-green-50' : 'bg-white',
        ]"
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
            <span
              class="px-2 py-1 rounded bg-gray-600 text-xs font-semibold text-white"
            >
              {{ todo.category }}
            </span>
          </div>
          <div class="flex gap-1">
            <span
              v-if="todo.executionDate"
              class="px-2 rounded bg-green-100 text-xs font-semibold flex justify-center items-center"
            >
              Terminé le
              {{
                String(todo.executionDate.toLocaleString("fr-FR")).split("T")[0]
              }}
            </span>
            <button
              v-if="!todo.executionDate"
              @click="handleFinishTodo(todo.id)"
              class="text-green-600 rounded-md py-1 px-2 hover:bg-green-100"
            >
              Terminer
            </button>
            <button
              v-if="!todo.executionDate"
              @click="handleUpdateTodo(todo)"
              class="text-blue-600 rounded-md py-1 px-2 hover:bg-blue-100"
            >
              Modifier
            </button>
            <button
              @click="handleDeleteTodo(todo.id)"
              class="text-red-600 rounded-md py-1 px-2 hover:bg-red-100"
            >
              Supprimer
            </button>
          </div>
        </div>
      </li>
    </ul>

    <div class="flex justify-between items-center mt-4">
      <button
        :disabled="todos.page <= 1"
        @click="goToPage(todos.page - 1)"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Précédent
      </button>

      <span
        >Page {{ todos.page }} /
        {{ Math.ceil(todos.total / todos.limit) }}</span
      >

      <button
        :disabled="todos.page >= Math.ceil(todos.total / todos.limit)"
        @click="goToPage(todos.page + 1)"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>

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
            @click="handleSaveTodo"
            class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            {{ editingTodo ? "Modifier" : "Ajouter" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useTodos } from "../composables/todos/useTodos";
import { useRoute, useRouter } from "vue-router";
import { CategoryName, ITodo, TodoPriority } from "../composables/todos/types";

export default defineComponent({
  name: "HomePage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { todos, listTodos, deleteTodo, createTodo, updateTodo } = useTodos();

    const title = ref("");
    const content = ref("");
    const priority = ref(TodoPriority.LOW);
    const category = ref(CategoryName.WORK);
    const executionDate = ref<Date | null>(null);
    const errors = ref<{
      title?: string;
      content?: string;
    }>({});
    const editingTodo = ref<ITodo | null>(null);

    const showModal = ref(false);

    onMounted(() => {
      const page = Number(route.query.page ?? 1);
      const limit = Number(route.query.limit ?? 10);
      listTodos({ page, limit });
    });

    const handleSaveTodo = async () => {
      errors.value = {};
      if (!title.value.trim()) errors.value.title = "Le titre est requis";
      if (!content.value.trim())
        errors.value.content = "La description est requise";

      if (Object.keys(errors.value).length > 0) return;

      if (editingTodo.value) {
        await updateTodo(editingTodo.value.id, {
          title: title.value,
          content: content.value,
          priority: priority.value,
          category: category.value,
          executionDate: executionDate.value,
        });
      } else {
        await createTodo({
          title: title.value,
          content: content.value,
          priority: priority.value,
          category: category.value,
        });
      }

      title.value = "";
      content.value = "";
      priority.value = TodoPriority.LOW;
      category.value = CategoryName.WORK;
      executionDate.value = null;
      editingTodo.value = null;
      showModal.value = false;
    };

    const handleUpdateTodo = (todo: ITodo) => {
      title.value = todo.title;
      content.value = todo.content;
      priority.value = todo.priority;
      category.value = todo.category;
      executionDate.value = todo.executionDate;

      editingTodo.value = todo;

      showModal.value = true;
    };

    const handleDeleteTodo = (id: number) => {
      deleteTodo(id);
    };

    const handleFinishTodo = (id: number) => {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      const localDate = new Date(now.getTime() - tzOffset);
      updateTodo(id, {
        executionDate: localDate,
      });
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

    const goToPage = (page: number) => {
      const query = { ...route.query, page: String(page) };
      router.push({ query });
      listTodos({ page, limit: todos.limit });
    };

    return {
      todos,
      handleSaveTodo,
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
      editingTodo,
      handleFinishTodo,
      goToPage,
    };
  },
});
</script>
