import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable} from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http : HttpClient,
    private authService: AuthService,
  ) {}
  
  getTasksUser() : Observable<any>{
    let url = `${environment.baseApiUrl}/task/all`
    return this.http.get<any>(url, {headers: this.authService.headers}).pipe(map((response : any) => {
      if (response.status_code == 200) {
        return response.data
      }
    }))
  }

  getTask(task_id:number) : Observable<any> {
    let url = `${environment.baseApiUrl}/task/` + task_id + `/get`
    return this.http.get<any>(url, {headers: this.authService.headers}).pipe(map((response : any) => {
      if (response.status_code == 200) {
        return response.data
      }
    }))
  }

  createTask(task:any) : Observable<boolean> {
    let url = `${environment.baseApiUrl}/task/create`
    let json = {name:task.taskname.value, priority:task.priority.value, date:task.date.value.toLocaleString()}
    return this.http.post<any>(url, json, {headers: this.authService.headers}).pipe(map((response : any) => {
      return response.status_code == 200
    }))
  }

  updateTask(id:number, taskData:any) : Observable<any> {
    let url = `${environment.baseApiUrl}/task/` + id + `/update`
    if(taskData.date){
      taskData.date = taskData.date.toLocaleString()
    }
    return this.http.post<any>(url, taskData, {headers: this.authService.headers}).pipe(map((response : any) => {
      if(response.status_code == 200){
        return response.data
      }
    }))
  }

  deleteTask(task:any): Observable<boolean>{
    let url = `${environment.baseApiUrl}/task/` + task.id + `/delete`
    return this.http.delete<any>(url, {headers: this.authService.headers}).pipe(map((response : any) => {
      return response.status_code == 200
    }))
  }
}
