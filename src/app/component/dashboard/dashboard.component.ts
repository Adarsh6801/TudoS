import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskObj : Task =new Task();
  taskArr : Task[]=[];
  
  addTaskValue: String='';
  editTaskValue:String='';

  constructor(private crudService : CrudService){

  }
  ngOnInit() {
    this.editTaskValue='';
    this.addTaskValue='';
    this.taskObj = new Task();
    this.taskArr=[];
    this.getAllTasks()
  }
  getAllTasks() {
   this.crudService.getAllTasks().subscribe(res=>{
    this.taskArr =res;
   },err=>{
    alert('Unable to get list of tasks');
   })
  }
 addTask(){
  this.taskObj.task_name=this.addTaskValue;
  this.crudService.addTask(this.taskObj).subscribe(res=>{
    this.ngOnInit();
    this.addTaskValue='';
  },err=>{
    alert(err);
  })
}
editTask(){
  this.taskObj.task_name=this.editTaskValue
  this.crudService.editTask(this.taskObj).subscribe(res =>{
    this.ngOnInit();
  }, err=>{
    alert("Failed to update task");
  })
}
deleteTask(etask: Task){
  this.crudService.deleteTask(etask).subscribe(res=>{
    this.ngOnInit();
  },err=>{
    alert("Failed to delete task");
  })
}
call(etask: Task){
  this.taskObj=etask
  this.editTaskValue=etask.task_name;
}
}
