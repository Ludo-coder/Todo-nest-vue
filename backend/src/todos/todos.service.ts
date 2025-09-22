import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async list(
    userId: number,
    options: { skip: number; take: number },
  ): Promise<[Todo[], number]> {
    try {
      const data = await this.prisma.todo.findMany({
        where: { userId },
        skip: options.skip,
        take: options.take,
      });
      const total = await this.prisma.todo.count({ where: { userId } });
      return [data, total];
    } catch (e) {
      console.error(
        `An error occured during an listing todos (userId: ${userId})`,
      );
      throw e;
    }
  }

  async find(userId: number, todoId: number): Promise<Todo> {
    try {
      const todo = await this.prisma.todo.findFirstOrThrow({
        where: { id: todoId, userId: userId },
      });
      return todo;
    } catch (e) {
      console.error(
        `An error occured during an finding todo (todoId: ${todoId})`,
      );
      throw e;
    }
  }

  async create(userId: number, todo: CreateTodoDto): Promise<Todo> {
    try {
      const newTodo = await this.prisma.todo.create({
        data: {
          ...todo,
          userId,
        },
      });
      return newTodo;
    } catch (e) {
      console.error(`An error occured during a creation of todo`);
      throw e;
    }
  }

  async delete(userId: number, todoId: number): Promise<void> {
    try {
      await this.prisma.todo.delete({
        where: { id: todoId, userId: userId },
      });
    } catch (e) {
      console.error(
        `An error occured during a deletion of todo (todoId: ${todoId})`,
      );
      throw e;
    }
  }
}
