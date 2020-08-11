import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  
  register() {
    if(this.registerForm.invalid){
      let formReg = this.registerForm.controls
      this.authService.createUser(formReg).subscribe((registerSuccess : boolean) => {
        if(registerSuccess){
          this.authService.login(formReg.email.value, formReg.password.value).subscribe((logged:boolean) => {
            if(logged){
              this.router.navigate(['/'])
            }
          })
        }
      })
    }
  }

}
