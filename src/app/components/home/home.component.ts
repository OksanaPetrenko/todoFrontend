import { Component, OnInit, Inject } from '@angular/core'
import { TaskService } from 'src/app/services/task.service'
import { ActivatedRoute } from '@angular/router'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public tasks : any[] = [['today', []], ['week', []], ['month', []], ['long-term', []], ['expired', []]]
  public taskDelete : any
  public indexArrTasks : number
  public activeTab : number
  public deleteStatus : boolean = false
  
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }



  ngOnInit() {
    this.taskService.getTasksUser().subscribe((tasksUser:any) => {
      tasksUser.forEach(task => {
        let nowDate = new Date()
        let weekDateTimestamp = new Date().setDate(nowDate.getDate() + 7) 
        let monthDateTimestamp = new Date().setDate(nowDate.getDate() + 31)
        let taskDate = new Date(task.date)
        if((nowDate.getDate() == taskDate.getDate()) && (nowDate.getMonth() == taskDate.getMonth()) && (nowDate.getFullYear() == taskDate.getFullYear())){
          this.tasks[0][1].push(task)
        } else if((taskDate.getTime() > nowDate.getTime()) && (taskDate.getTime() <= weekDateTimestamp)) {
          this.tasks[1][1].push(task)
        } else if((taskDate.getTime() > weekDateTimestamp) && (taskDate.getTime() <= monthDateTimestamp)) {
          this.tasks[2][1].push(task)
        } else if(taskDate.getTime() > monthDateTimestamp) {
          this.tasks[3][1].push(task)
        } else{
          this.tasks[4][1].push(task)
        }
      })
    })
    this.route.params.subscribe(params => {
      this.tasks.forEach((taskArr, index)  => {
        let param = params['tab']
        if(taskArr[0] == param){
          this.activeTab = index
        }
      })
      window.history.pushState("new_url", "title", "/")
    })
  } 

  openDialog(task:any, index:number) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.taskService.deleteTask(task).subscribe((deleted:boolean) => {
          if(deleted){
            this.tasks[index][1] = this.tasks[index][1].filter(item => item.id !== task.id)
          }
        })
      }
    })
  }
  
  updateStatus(status : boolean, taskId : number){
    this.taskService.updateTask(taskId, {status: status}).subscribe((edited) => {})
  }

  locateTab(event:any){
    window.history.pushState("new_url", "title", "/"+ event.tab.textLabel)
  }
  
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.dialog.html',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {}
}