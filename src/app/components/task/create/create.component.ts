import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/services/task.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public createTaskForm: FormGroup
  public priorities = [
    {value: '0', viewValue: 'Low'},
    {value: '1', viewValue: 'Medium'},
    {value: '2', viewValue: 'Hight'}
  ]
  
  constructor(
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      taskname: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required],
    })
  }
  
  createTask() {
    if(!this.createTaskForm.invalid){
      this.taskService.createTask(this.createTaskForm.controls).subscribe((created:boolean) => {
        if(created){
          this.router.navigate([ '/'])
        }
      })
    }
  }
}
