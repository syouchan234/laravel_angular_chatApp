import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnpracComponent } from './anprac/anprac.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:AnpracComponent},
  {path:'createAccount',component:CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
