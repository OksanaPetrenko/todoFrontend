import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SignupComponent } from './components/signup/signup.component'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './guards/auth.guard'
import { LoginComponent } from './components/login/login.component'
import { CreateComponent } from './components/task/create/create.component'
import { EditComponent } from './components/task/edit/edit.component'


const routes: Routes = [
  { path : '',    component : HomeComponent, canActivate : [AuthGuard]},
  { path : 'login', component: LoginComponent }, 
  { path : 'register', component: SignupComponent}, 
  { path : 'task/create', component: CreateComponent, canActivate : [AuthGuard]}, 
  { path : 'task/edit/:task_id', component: EditComponent, canActivate : [AuthGuard]},
  { path : ':tab',    component : HomeComponent, canActivate : [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
