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
    const todo = await this.todosService.find(req.user.userId, id);
    if (!todo) throw new Error('Todo not found');
    return todo;
  }

  //   @Post()
  //   async create(
  //     @Body() createTodoDto: CreateTodoDto,
  //   ): Promise<CreateTodoResponse> {
  // const user = await this.authService.authenticateUser(loginDto);
  // if (!user) throw new UnauthorizedException('Invalid credentials');
  // return this.authService.login(user);
  //   }

  //   @Patch(':id')
  //   async update(
  //     @Body() updateTodoDto: UpdateTodoDto,
  //   ): Promise<UpdateTodoResponse> {

  //   }

  //   @Delete(':id')
  //   async delete()
}
