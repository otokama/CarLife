import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VehiclesComponent} from './vehicles/vehicles.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {TunercommentComponent} from './tunercomment/tunercomment.component';
import {ModificationsComponent} from './modifications/modifications.component';
import {UserprofileComponent} from './userprofile/userprofile.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.user]}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard]},
  {path: 'maintenance', component: MaintenanceComponent, canActivate: [AuthGuard]},
  {path: 'mods', component: ModificationsComponent, canActivate: [AuthGuard]},
  {path: 'comments', component: TunercommentComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserprofileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
