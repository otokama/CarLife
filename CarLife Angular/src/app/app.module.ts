import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import {IgxAvatarModule} from 'igniteui-angular';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclerecordComponent } from './vehiclerecord/vehiclerecord.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MainrecordComponent } from './mainrecord/mainrecord.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TunercommentComponent } from './tunercomment/tunercomment.component';
import {MatDialogModule} from "@angular/material/dialog";
import { VehiclemakerdialogComponent } from './vehiclemakerdialog/vehiclemakerdialog.component';
import { MaintenancemakerComponent } from './maintenancemaker/maintenancemaker.component';
import { UpdatemileagedialogComponent } from './updatemileagedialog/updatemileagedialog.component';
import { ModificationsComponent } from './modifications/modifications.component';
import { ModificationrecordComponent } from './modificationrecord/modificationrecord.component';
import { ModificationrecordmakerdialogComponent } from './modificationrecordmakerdialog/modificationrecordmakerdialog.component';
import { VehicledashboardComponent } from './vehicledashboard/vehicledashboard.component';
import { DashboardvehiclecardComponent } from './dashboardvehiclecard/dashboardvehiclecard.component';
import { DashboardmaincardComponent } from './dashboardmaincard/dashboardmaincard.component';
import { DashboardcommentcardComponent } from './dashboardcommentcard/dashboardcommentcard.component';
import {ChartsModule} from "ng2-charts";
import { DashboardmodsComponent } from './dashboardmods/dashboardmods.component';
import { DashboardmodcardComponent } from './dashboardmodcard/dashboardmodcard.component';
import { ModrecordeditdialogComponent } from './modrecordeditdialog/modrecordeditdialog.component';
import { MainrecordeditdialogComponent } from './mainrecordeditdialog/mainrecordeditdialog.component';
import { VehiclerecordeditdialogComponent } from './vehiclerecordeditdialog/vehiclerecordeditdialog.component';
import { CommentdialogComponent } from './commentdialog/commentdialog.component';
import { CommentcardComponent } from './commentcard/commentcard.component';
import { CommentsectionComponent } from './commentsection/commentsection.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VehiclesComponent,
    VehiclerecordComponent,
    MaintenanceComponent,
    MainrecordComponent,
    DashboardComponent,
    TunercommentComponent,
    VehiclemakerdialogComponent,
    MaintenancemakerComponent,
    UpdatemileagedialogComponent,
    ModificationsComponent,
    ModificationrecordComponent,
    ModificationrecordmakerdialogComponent,
    VehicledashboardComponent,
    DashboardvehiclecardComponent,
    DashboardmaincardComponent,
    DashboardcommentcardComponent,
    DashboardmodsComponent,
    DashboardmodcardComponent,
    ModrecordeditdialogComponent,
    MainrecordeditdialogComponent,
    VehiclerecordeditdialogComponent,
    CommentdialogComponent,
    CommentcardComponent,
    CommentsectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IgxAvatarModule,
    MatDialogModule,
    ChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]})
export class AppModule {
}
