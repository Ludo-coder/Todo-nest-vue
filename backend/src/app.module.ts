import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import config from 'src/common/configs/config';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
