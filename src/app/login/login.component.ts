import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}
  email: string = "";//test@examle.com
  password: string = "";//password

  login() {
    // フォームから入力された値を取得し、AuthServiceのloginメソッドを呼び出す
    const token = this.authService.getToken();
    this.authService.login(this.email, this.password);
    console.log(token);
  }
  logout() {
    const token = this.authService.getToken();
    this.authService.logout();
    console.log(token);
  }
  createAccountPageTo(){
    this.router.navigate(['/createAccount']);
  }
}
