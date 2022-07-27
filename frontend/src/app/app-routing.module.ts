import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderComponent,canActivate:[AuthGuard]},
  {path:'home',component:ScheduleMeetingComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorComponent,canActivate:[AuthGuard]}
  // {path:'available-meet',component:AvailableMeetComponent}
  // {path:"error",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
