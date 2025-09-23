export interface ITodo {
  id: number;
  title: string;
  content: string;
  priority: TodoPriority;
  executionDate: Date | null;
  category: CategoryName;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum TodoPriority {
  HIGH = "HAUT",
  MEDIUM = "MOYEN",
  LOW = "BAS",
}

export enum CategoryName {
  WORK = "TRAVAIL",
  PERSONAL = "PERSONNEL",
  SHOPPING = "SHOPPING",
  OTHER = "AUTRE",
}

export interface ICreateTodo {
  title: string;
  content: string;
  priority: TodoPriority;
  category: CategoryName;
}

export interface IUpdateTodo {
  title?: string;
  content?: string;
  priority?: TodoPriority;
  category?: CategoryName;
  executionDate: Date | null;
}
