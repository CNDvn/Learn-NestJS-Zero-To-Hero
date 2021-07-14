import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[]{
    const { status, search } = filterDto;

    //define a temporary array to hold the result
    let tasks = this.getAllTasks();

    //do something with status
    if(status){
      tasks = tasks.filter(task => task.status === status)
    }

    //do something with search
    if(search){
      tasks = tasks.filter(task => {
        if(task.title.includes(search) || task.description.includes(search)){
          return true;
        }
        return false;
      });
    }
    //return final result
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto; //restructuring syntax
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): void{
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id:string, status:TaskStatus){
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
