import { CategoryName, TodoPriority } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  content: string;

  @IsOptional()
  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @IsOptional()
  @IsEnum(CategoryName)
  category: CategoryName;

  @IsOptional()
  @IsDateString()
  executionDate: string;
}
