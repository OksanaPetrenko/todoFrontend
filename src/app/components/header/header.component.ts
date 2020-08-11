import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public token : boolean = false
  
  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    if(this.authService.token.value){
      this.token = true
    }
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
