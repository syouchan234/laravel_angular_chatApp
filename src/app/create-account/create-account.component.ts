import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}
    name: string = "";
    account_name: string = "";
    email: string = "";//test@examle.com
    password: string = "";//password

    autoRouter(route: string){
      this.router.navigate([route]);
    }
}
