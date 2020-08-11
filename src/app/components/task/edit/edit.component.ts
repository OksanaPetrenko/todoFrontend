import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { TaskService } from 'src/app/services/task.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editTaskForm: FormGroup
  public taskId : number
  public taskAdited : any
  public priorities = [
    {value: 0, viewValue: 'Low'},
    {value: 1, viewValue: 'Medium'},
    {value: 2, viewValue: 'Hight'}
  ]
  public status = [
    {value: 0, viewValue: 'In progress'},
    {value: 1, viewValue: 'Completed'},
  ]
  
  constructor(
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.editTaskForm = this.formBuilder.group({
      taskname: ['', Validators.required],
      priority: ['', Validators.required],
      date:     ['', Validators.required],
      status:   ['', Validators.required],
    })
    this.route.params.subscribe(params => {
      this.taskId = params['task_id']
      this.taskService.getTask(this.taskId).subscribe((task:any) => {
        this.editTaskForm.patchValue({taskname: task.name, priority: task.priority, date: task.date, status : task.status})
      })
    })
  }
  
  editTask(){
    if(!this.editTaskForm.invalid){
      this.taskService.updateTask(this.taskId, this.editTaskForm.value).subscribe((editedTask:any) => {
        let nowDate = new Date()
          let weekDateTimestamp = new Date().setDate(nowDate.getDate() + 7) 
          let monthDateTimestamp = new Date().setDate(nowDate.getDate() + 31)
          let taskDate = new Date(editedTask.date)
          if((nowDate.getDate() == taskDate.getDate()) && (nowDate.getMonth() == taskDate.getMonth()) && (nowDate.getFullYear() == taskDate.getFullYear())){
            this.router.navigate([ '/today'], { replaceUrl: true })
          } else if((taskDate.getTime() > nowDate.getTime()) && (taskDate.getTime() <= weekDateTimestamp)) {
            this.router.navigate([ '/week'], { replaceUrl: true })
          } else if((taskDate.getTime() > weekDateTimestamp) && (taskDate.getTime() <= monthDateTimestamp)) {
            this.router.navigate([ '/month'], { replaceUrl: true })
          } else if(taskDate.getTime() > monthDateTimestamp) {
            this.router.navigate([ '/long-term'], { replaceUrl: true })
          } else{
            this.router.navigate([ '/expired'], { replaceUrl: true })
          }
      })
    }
  }

}
