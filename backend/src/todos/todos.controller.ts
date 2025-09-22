import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Todo } from '@prisma/client';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async list(
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Todo[]; total: number; page: number; limit: number }> {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.todosService.list(req.user.userId, {
      skip,
      take,
    });

    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  @Get(':id')
  async find(@Request() req, @Param('id') id: string): Promise<Todo> {
    const todo = await this.todosService.find(req.user.userId, Number(id));
    if (!todo) throw new Error('Todo not found');
    return todo;
  }

  @Post()
  async create(
    @Request() req,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<{ message: string; data: Todo }> {
    const todo = await this.todosService.create(req.user.userId, createTodoDto);
    return { message: 'Todo created', data: todo };
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<{ message: string; data: Todo }> {
    const updatedTodo = await this.todosService.update(
      req.user.userId,
      updateTodoDto,
      Number(id),
    );
    return { message: 'Todo updated', data: updatedTodo };
  }

  @Delete(':id')
  async delete(
    @Request() req,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    await this.todosService.delete(req.user.userId, Number(id));
    return { message: 'Todo deleted' };
  }
}
