import { reactive } from "vue";
import { request } from "../request";
import { ICreateTodo, ITodo, IUpdateTodo } from "./types";
import { useRoute } from "vue-router";

export function useTodos() {
  const route = useRoute();
  const todos = reactive<{
    data: ITodo[];
    total: number;
    page: number;
    limit: number;
  }>({ data: [], total: 0, page: 1, limit: 10 });
  const loading = reactive({
    list: false,
    create: false,
    update: false,
    delete: false,
  });

  const listTodos = async ({
    page = 1,
    limit = 10,
  }: { page?: number; limit?: number } = {}) => {
    loading.list = true;
    try {
      const result = await request<{
        data: ITodo[];
        total: number;
        page: number;
        limit: number;
      }>(`/todos?page=${page}&limit=${limit}`, "GET");
      todos.data = result.data;
      todos.total = result.total;
      todos.page = result.page;
      todos.limit = result.limit;
    } finally {
      loading.list = false;
    }
  };

  const createTodo = async (todo: ICreateTodo) => {
    loading.create = true;

    try {
      await request<{ message: string; data: ITodo }>("/todos", "POST", todo);
      const page = Number(route.query.page ?? 1);
      const limit = Number(route.query.limit ?? 10);
      await listTodos({ page, limit });
    } finally {
      loading.create = false;
    }
  };

  const updateTodo = async (id: number, todo: IUpdateTodo) => {
    loading.update = true;

    try {
      await request<{ message: string; data: ITodo }>(
        `/todos/${id}`,
        "PUT",
        todo
      );
      const page = Number(route.query.page ?? 1);
      const limit = Number(route.query.limit ?? 10);
      await listTodos({ page, limit });
    } finally {
      loading.update = false;
    }
  };

  const deleteTodo = async (id: number) => {
    loading.delete = true;

    try {
      await request<{ message: string }>(`/todos/${id}`, "DELETE");
      const page = Number(route.query.page ?? 1);
      const limit = Number(route.query.limit ?? 10);
      await listTodos({ page, limit });
    } finally {
      loading.delete = false;
    }
  };

  return {
    todos,
    loading,
    listTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
