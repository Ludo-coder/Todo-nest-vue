<template>
  <li :class="[baseClasses, todo.executionDate ? 'bg-green-50' : 'bg-white']">
    <div class="mb-3">
      <div class="flex justify-between">
        <span class="font-bold">{{ todo.title }}</span>
        <span :class="priorityColor(todo.priority)">
          {{ todo.priority }}
        </span>
      </div>
      <p>{{ todo.content }}</p>
    </div>
    <div class="flex justify-between items-center">
      <span
        class="px-2 py-1 rounded bg-gray-600 text-xs font-semibold text-white"
      >
        {{ todo.category }}
      </span>
      <div class="flex gap-1">
        <span
          v-if="todo.executionDate"
          class="px-2 rounded bg-green-100 text-xs font-semibold flex justify-center items-center"
        >
          Terminé le {{ formattedDate(todo.executionDate) }}
        </span>
        <button
          v-if="!todo.executionDate"
          @click="$emit('finish', todo.id)"
          class="text-green-600 rounded-md py-1 px-2 hover:bg-green-100"
        >
          Terminer
        </button>
        <button
          v-if="!todo.executionDate"
          @click="$emit('edit', todo)"
          class="text-blue-600 rounded-md py-1 px-2 hover:bg-blue-100"
        >
          Modifier
        </button>
        <button
          @click="$emit('delete', todo.id)"
          class="text-red-600 rounded-md py-1 px-2 hover:bg-red-100"
        >
          Supprimer
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { ITodo, TodoPriority } from "../../composables/todos/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    todo: { type: Object as () => ITodo, required: true },
  },
  emits: ["finish", "edit", "delete"],
  setup() {
    const baseClasses =
      "p-2 rounded-sm shadow flex-column justify-between items-center";
    const priorityColor = (priority: TodoPriority) => {
      switch (priority) {
        case TodoPriority.HIGH:
          return "text-red-600 font-bold bg-red-200 rounded-sm p-1";
        case TodoPriority.MEDIUM:
          return "text-orange-600 font-bold bg-orange-200 rounded-sm p-1";
        case TodoPriority.LOW:
          return "text-yellow-600 font-bold bg-yellow-200 rounded-sm p-1";
        default:
          return "bg-gray-200 text-gray-800 border-gray-200";
      }
    };
    const formattedDate = (date: Date) =>
      new Date(date).toLocaleDateString("fr-FR");
    return { baseClasses, priorityColor, formattedDate };
  },
});
</script>
