import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo-app',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
