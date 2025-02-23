import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todo: Repository<Todo>) {}
  async create(createTodoDto: CreateTodoDto) {
    const newTodo = await this.todo.create(createTodoDto);
    return this.todo.save(newTodo);
  }

  async findAll() {
    const todos = await this.todo.find();
    return {
      count: todos.length,
      data: todos,
    };
  }
  async findOne(id) {
    const todo = await this.todo.findOne({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async update(id, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todo.findOne({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todo.save({...todo , ...updateTodoDto});
  }

async  remove(id) {
    const todo = await this.todo.findOne({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException();
    }
    await this.todo.delete(id);
    return {message : 'Todo deleted successfully' }
  }
}
