import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';

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
}
