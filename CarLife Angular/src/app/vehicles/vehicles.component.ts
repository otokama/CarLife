import { Component, OnInit, Inject } from '@angular/core';
import {VehicleRecord} from "../_models/VehicleRecord";
import {VehicleService} from "../_services/vehicle.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {VehicleType} from "../_models/VehicleType";
import {AuthService} from "../_services/auth.service";
import {VehiclemakerdialogComponent} from "../vehiclemakerdialog/vehiclemakerdialog.component";
import {VehiclerecordeditdialogComponent} from "../vehiclerecordeditdialog/vehiclerecordeditdialog.component";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehiclesrecords: VehicleRecord[] = [];

  constructor(private vehicleservice: VehicleService, public dialog: MatDialog,
              private notif: NotificationService, private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAllRecords();
  }

  private loadAllRecords() {
    this.vehicleservice.getVehiclesRecord().subscribe(
      vehicles => {
        this.vehiclesrecords = vehicles;
      }, error => {console.log('error loading vehicles'); }
    );
  }

  create(record: VehicleRecord) {
    this.vehicleservice.createNewVehicleRecord(record).subscribe(
      resp => {
        this.loadAllRecords();
      }, error => {console.log('error loading vehicles.'); }
    );
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(VehiclemakerdialogComponent, dialogConfig);
    const newRecord: VehicleRecord = {
      nickname: '',
      ownerUsername: this.authService.currentUserValue.username,
      make: '',
      year: 0,
      model: '',
      mileage: 0,
      ownedSince: new Date(),
      bodyType: 0,
      addDate: new Date()

    };
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        newRecord.ownerUsername = this.authService.currentUserValue.username;
        newRecord.make = result.make;
        newRecord.year = result.year;
        newRecord.model = result.model;
        newRecord.mileage = result.mileage;
        newRecord.ownedSince = result.ownedSince;
        newRecord.bodyType = result.bodyType;
        newRecord.addDate = new Date((new Date().getTime()));
        newRecord.nickname = result.nickname;
        this.create(newRecord);
        this.loadAllRecords();
      }
    }, error => {console.log(error)});

  }

  delete(record: VehicleRecord) {
    this.vehicleservice.deleteVehicleRecord(record.addDate).subscribe(
      resp => {
        this.loadAllRecords();
        this.notif.showNotif('Vehicle ' + record.nickname + ' deleted!', 'Dismiss');
      }, error => {console.log('error deleting vehicle'); }
    );

  }

  openEditDialog(record: VehicleRecord): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      nickname: record.nickname,
      make: record.make,
      year: record.year,
      model: record.model,
      mileage: record.mileage,
      ownedSince: record.ownedSince,
      bodyType: record.bodyType,
      addDate: record.addDate
    };
    const dialogRef = this.dialog.open(VehiclerecordeditdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newRecord: VehicleRecord = {
          ownerUsername : this.authService.currentUserValue.username,
          make : result.make,
          year : result.year,
          model : result.model,
          mileage : result.mileage,
          ownedSince : result.ownedSince,
          bodyType : result.bodyType,
          addDate : result.addDate,
          nickname : result.nickname
        };
        this.vehicleservice.editVehicleRecord(newRecord).subscribe(
          resp => {
            this.loadAllRecords();
          }, error => {console.log('updated vehicle record.'); }
        );
      }
    }, error => {console.log(error)});
  }

}



