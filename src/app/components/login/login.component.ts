import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.authService.token.value){
      this.router.navigate(['/'])
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  
  login() {
    if(!this.loginForm.invalid){
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((logged:boolean) => {
        if(logged){
          this.router.navigate(['/'])
        }
      })
    }
  }

}
