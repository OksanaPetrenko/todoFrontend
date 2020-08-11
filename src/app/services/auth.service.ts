import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: BehaviorSubject<string>
  public headers : HttpHeaders

  constructor(
    private http : HttpClient,
  ) {
    this.token = new BehaviorSubject(localStorage.getItem('token'))
    if(this.token){
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token.value
      })
    }
  }
  login(email:string, password:string): Observable<boolean>{
    let url = `${environment.baseApiUrl}/auth/login`
    return this.http.post<any>(url, { email : email, password : password }).pipe(map((response : any) => {
      if (response.status_code == 200){
        localStorage.setItem('token', response.token)
        this.token.next(response.token)
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token.value
        })
        return true
      }
    }))
  }

  logout() {
    localStorage.removeItem('token')
    this.token.next(null)
    return true
  }

  createUser(user:any) : Observable<boolean> {
    let url = `${environment.baseApiUrl}/auth/signup`
    let json = {email:user.email.value, password:user.password.value, name:user.username.value}
    return this.http.post<any>(url, json).pipe(map((response : any) => {
      return response.status_code == 200
    }))
  }
}
