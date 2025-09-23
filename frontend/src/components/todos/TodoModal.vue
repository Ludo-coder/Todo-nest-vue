<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h3 class="text-xl font-semibold mb-4">
        {{ editingTodo ? "Modifier" : "Ajouter" }} un TODO
      </h3>

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
      <p v-if="errors.content" class="text-red-600 text-sm mb-2">
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
          @click="$emit('close')"
          class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Annuler
        </button>
        <button
          @click="save"
          class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          {{ editingTodo ? "Modifier" : "Ajouter" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import {
  CategoryName,
  ITodo,
  TodoPriority,
} from "../../composables/todos/types";

export default defineComponent({
  name: "TodoModal",
  props: { editingTodo: { type: Object as () => ITodo | null, default: null } },
  emits: ["save", "close"],
  setup(props, { emit }) {
    const title = ref("");
    const content = ref("");
    const priority = ref(TodoPriority.LOW);
    const category = ref(CategoryName.WORK);
    const errors = ref<{ title?: string; content?: string }>({});

    watch(
      () => props.editingTodo,
      (todo) => {
        if (todo) {
          title.value = todo.title;
          content.value = todo.content;
          priority.value = todo.priority;
          category.value = todo.category;
        } else {
          title.value = "";
          content.value = "";
          priority.value = TodoPriority.LOW;
          category.value = CategoryName.WORK;
        }
      },
      { immediate: true }
    );

    const priorityColor = (priority: TodoPriority) => {
      switch (priority) {
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

    const save = () => {
      errors.value = {};
      if (!title.value.trim()) errors.value.title = "Le titre est requis";
      if (!content.value.trim())
        errors.value.content = "La description est requise";
      if (Object.keys(errors.value).length) return;

      emit("save", {
        title: title.value,
        content: content.value,
        priority: priority.value,
        category: category.value,
      });
    };

    return {
      title,
      content,
      priority,
      category,
      errors,
      priorityColor,
      save,
      CategoryName,
      TodoPriority,
    };
  },
});
</script>
