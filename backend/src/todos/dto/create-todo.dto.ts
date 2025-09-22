import { CategoryName, TodoPriority } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  content: string;

  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @IsEnum(CategoryName)
  category: CategoryName;

  @IsOptional()
  @IsDateString()
  executionDate: string;
}
