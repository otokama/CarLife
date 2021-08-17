import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../_services/vehicle.service";
import {VehicleRecord} from "../_models/VehicleRecord";
import {MaintenanceService} from "../_services/maintenance.service";
import {MaintenanceRecord} from "../_models/MaintenanceRecord";
import {UpdatemileagedialogComponent} from "../updatemileagedialog/updatemileagedialog.component";
import {MaintenancemakerComponent} from "../maintenancemaker/maintenancemaker.component";
import {MainrecordeditdialogComponent} from "../mainrecordeditdialog/mainrecordeditdialog.component";
import {CommentdialogComponent} from "../commentdialog/commentdialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AuthService} from "../_services/auth.service";
import {NotificationService} from "../_services/notification.service";
import {FormControl} from "@angular/forms";
import {Comments} from "../_models/Comments";
import {Role} from "../_models/role";
import {CommentService} from "../_services/comment.service";
import {UserService} from "../_services/user.service";

interface Vehicle {
  value: Date;
  viewValue: string;
}

interface VehicleGroup {
  ownerName: string;
  vehicles: Vehicle[];
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  vehicleGroupControl = new FormControl();
  vehicleGroup: VehicleGroup[] = [];

  vehicles: VehicleRecord[] = [];
  nickname: string;
  currentVehicle: Date;
  currentRecords: MaintenanceRecord[] = [];
  currentMileage: number;
  constructor(public dialog: MatDialog, private authService: AuthService,
              private mainService: MaintenanceService, private vehicleService: VehicleService,
              private notif: NotificationService, private commentService: CommentService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.isTuner()) {
      this.vehicleService.getAllVehicles().subscribe(
        vehicles => {
          this.vehicles = vehicles;
          if (this.vehicles) {
            this.currentVehicle = this.vehicles[0].addDate;
            this.loadRecords();
            this.loadRecordGroups();
          }
        }, error => {console.log('error loading vehicles.'); }
      );
    } else { // TODO: non-tuner accounts only load user's vehicles.
      this.vehicleService.getVehiclesRecord().subscribe(
        vehicles => {
          this.vehicles = vehicles;
          if (this.vehicles) {
            this.currentVehicle = this.vehicles[0].addDate;
            this.loadRecords();
          }
        }, error => {console.log('error loading vehicles.'); }
      );

    }
  }


  loadRecordGroups() {
    let i;
    for (i = 0; i < this.vehicles.length; ++i) {
      const newRecord: Vehicle = {
        value: this.vehicles[i].addDate,
        viewValue: this.vehicles[i].nickname
      };
      let j;
      for (j = 0; j < this.vehicleGroup.length; ++j) {
        if (this.vehicleGroup[j].ownerName === this.vehicles[i].ownerUsername) {
          this.vehicleGroup[j].vehicles.push(newRecord);
          break;
        }
      }
      if (j === this.vehicleGroup.length) {
        const newGroup: VehicleGroup = {
          ownerName: this.vehicles[i].ownerUsername,
          vehicles: [newRecord]
        };
        this.vehicleGroup.push(newGroup);
      }
    }
  }

  loadRecords() {
    this.vehicleService.getVehicleRecordByDate(this.currentVehicle).subscribe(
      vehicle => {
        const currentVehicle = vehicle;
        this.currentMileage = currentVehicle.mileage;
        this.nickname = currentVehicle.nickname;
        this.mainService.getMaintenanceRecord(this.currentVehicle).subscribe(
          record => {
            this.currentRecords = record;
          }, error => {console.log('get maintenance records failed.'); }
        );
      }, error => {console.log('error loading vehicle.'); }
    );
  }

  isTuner() {
    return this.authService.isTuner();
  }

  getMilesLeft(milesleft: number) {
    if (milesleft < 0) {
      return 0;
    }
    return milesleft;
  }

  getProgressValue(milesleft, milesinterval) {
    return 100 - Math.ceil(((milesinterval - milesleft) / milesinterval) * 100);
  }

  create(newRecord: MaintenanceRecord) {
    this.mainService.create(newRecord).subscribe(
      resp => {
        this.loadRecords();
      }, error => { console.log('create fail.'); }
    );
  }

  openEditDialog(mainRecord: MaintenanceRecord) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {nickname: this.nickname,
      currentMileage: this.currentMileage,
      currentRecord: mainRecord
    };
    const dialogRef = this.dialog.open(MainrecordeditdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editMainRecord: MaintenanceRecord = {
          vehicleAddDate: this.currentVehicle,
          maintenanceName: result.maintenanceName,
          intervalMile: result.intervalMile,
          date: result.date,
          mileage: result.mileage,
          cost: result.cost,
          addDate: result.addDate
        };
        this.mainService.edit(editMainRecord).subscribe(
          resp => {
            this.loadRecords();
          }
        );
      }
    }, error => {console.log(error)});




  }

  delete(mainRecord: MaintenanceRecord) {
    this.mainService.delete(mainRecord).subscribe(
      resp => {
        this.loadRecords();
        this.notif.showNotif('Deleted 1 maintenance record for ' + this.nickname + '!', 'Dismiss');

      }
    );
  }

  openCommentDialog(mainRecord: MaintenanceRecord) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    this.vehicleService.getVehicleRecordByDate(mainRecord.vehicleAddDate).subscribe(
      vehicle => {
        let vehicleOwner = '';
        if (vehicle) {
          vehicleOwner = vehicle.ownerUsername;
        } else {
          vehicleOwner = null;
          this.notif.showNotif('Can\'t add comment.', 'Dismiss');
        }
        if (!this.isTuner()) {
          this.userService.getAllTuners().subscribe(
            tuners => {
              dialogConfig.data = {tunerList: tuners};
              const dialogRef = this.dialog.open(CommentdialogComponent, dialogConfig);
              dialogRef.afterClosed().subscribe(result => {
                if (result) {
                  const userRole: Role = this.isTuner() ? Role.tuner : Role.user;
                  const newComment: Comments = {
                    vehicle: this.nickname,
                    maintenance: mainRecord.maintenanceName,
                    comments: result.comment,
                    role: userRole,
                    postedTo: result.tuner,
                    authorUsername: this.authService.currentUserValue.username,
                    avatarColor: this.authService.currentUserValue.avatarColor,
                    initials: this.authService.currentUserValue.firstName[0].toUpperCase() + this.authService.currentUserValue.lastName[0].toUpperCase(),
                    addDate: new Date((new Date().getTime()))
                  };
                  this.commentService.create(newComment).subscribe(
                    resp => {
                      //this.notif.showNotif('Posted new comment for ' + vehicleOwner + '!', 'Dismiss');
                    }
                  );
                }
              });
            }
          );
        } else {
          const dialogRef = this.dialog.open(CommentdialogComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const userRole: Role = this.isTuner() ? Role.tuner : Role.user;
              const newComment: Comments = {
                vehicle: this.nickname,
                maintenance: mainRecord.maintenanceName,
                comments: result.comment,
                role: userRole,
                postedTo: vehicleOwner,
                authorUsername: this.authService.currentUserValue.username,
                avatarColor: this.authService.currentUserValue.avatarColor,
                initials: this.authService.currentUserValue.firstName[0].toUpperCase() + this.authService.currentUserValue.lastName[0].toUpperCase(),
                addDate: new Date((new Date().getTime()))
              };
              this.commentService.create(newComment).subscribe(
                resp => {
                  //this.notif.showNotif('Posted new comment for ' + vehicleOwner + '!', 'Dismiss');
                }
              );
            }
          });
        }


      }, error => {console.log('error loading vehicle.'); }
    );
  }

  openDialogUpdateMileage(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '205px';
    dialogConfig.data = {currentMiles: this.currentMileage};
    const dialogRef = this.dialog.open(UpdatemileagedialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehicleService.updateMileage(this.currentVehicle, result.miles).subscribe(
          resp => {
            this.loadRecords();
          }, error => {console.log('error updating mileage.'); }
        );
      }
    }, error => {console.log(error)});
  }

  openDialogAddMaintenance() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {nickname: this.nickname, currentMileage: this.currentMileage};
    console.log(this.nickname);
    const newRecord: MaintenanceRecord = {
      vehicleAddDate: new Date(),
      maintenanceName: '',
      intervalMile: 0,
      date: new Date(),
      mileage: 0,
      cost: 0,
      addDate: new Date()
    };
    const dialogRef = this.dialog.open(MaintenancemakerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        newRecord.vehicleAddDate = this.currentVehicle;
        newRecord.maintenanceName = result.maintenanceName;
        newRecord.intervalMile = result.intervalMile;
        newRecord.date = result.date;
        newRecord.addDate = new Date((new Date().getTime()));
        newRecord.mileage = result.mileage;
        newRecord.cost = result.cost;
        this.create(newRecord);
      }
    }, error => {console.log(error)});
  }


}
