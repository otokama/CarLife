import { Component, OnInit } from '@angular/core';
import { Mods} from "../_models/Mods";
import {ModsService} from "../_services/mods.service";
import {VehicleRecord} from "../_models/VehicleRecord";
import {VehicleService} from "../_services/vehicle.service";
import {NotificationService} from "../_services/notification.service";
import {ModificationrecordmakerdialogComponent} from "../modificationrecordmakerdialog/modificationrecordmakerdialog.component";
import {ModrecordeditdialogComponent} from "../modrecordeditdialog/modrecordeditdialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AuthService} from "../_services/auth.service";
import {FormControl} from "@angular/forms";

interface Vehicle {
  value: VehicleRecord;
  viewValue: string;
}

interface VehicleGroup {
  ownerName: string;
  vehicles: Vehicle[];
}

@Component({
  selector: 'app-modifications',
  templateUrl: './modifications.component.html',
  styleUrls: ['./modifications.component.css']
})
export class ModificationsComponent implements OnInit {
  vehicleGroupControl = new FormControl();
  vehicleGroup: VehicleGroup[] = [];

  mods: Mods[] = [];
  currentVehicle: VehicleRecord;
  vehiclesRecords: VehicleRecord[] = [];
  currentModRecord;
  constructor(public dialog: MatDialog, private modService: ModsService, private vehicleService: VehicleService,
              private notif: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.isTuner()) {
      this.vehicleService.getAllVehicles().subscribe(
        allvehicles => {
          this.vehiclesRecords = allvehicles;
          if (this.vehiclesRecords.length > 0) {
            this.currentVehicle = this.vehiclesRecords[0];
            this.loadModRecords();
            this.loadRecordGroups();
          }
        }, error => {console.log('error loading vehicles') ;}
      );
    } else {
      this.vehicleService.getVehiclesRecord().subscribe(
        allvehicles => {
          this.vehiclesRecords = allvehicles;
          if (this.vehiclesRecords.length > 0) {
            this.currentVehicle = this.vehiclesRecords[0];
            this.loadModRecords();
          }
        }, error => {console.log('error loading vehicles') ;}
      );
    }
  }

  isTuner() {
    return this.authService.isTuner();
  }

  loadRecordGroups() {
    let i;
    for (i = 0; i < this.vehiclesRecords.length; ++i) {
      const newRecord: Vehicle = {
        value: this.vehiclesRecords[i],
        viewValue: this.vehiclesRecords[i].nickname
      };
      let j;
      for (j = 0; j < this.vehicleGroup.length; ++j) {
        if (this.vehicleGroup[j].ownerName === this.vehiclesRecords[i].ownerUsername) {
          this.vehicleGroup[j].vehicles.push(newRecord);
          break;
        }
      }
      if (j === this.vehicleGroup.length) {
        const newGroup: VehicleGroup = {
          ownerName: this.vehiclesRecords[i].ownerUsername,
          vehicles: [newRecord]
        };
        this.vehicleGroup.push(newGroup);
      }
    }
  }


  loadModRecords() {
    this.modService.getRecords(this.currentVehicle.addDate).subscribe(
      records => {
        this.mods = records;
      }, error => {console.log('error loading mods.'); }
    );
  }

  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {nickname: this.currentVehicle.nickname, currentMileage: this.currentVehicle.mileage};
    const dialogRef = this.dialog.open(ModificationrecordmakerdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newMod: Mods = {
          type: result.type,
          cost: result.cost,
          make: result.make,
          partname: result.partname,
          mileage: result.mileage,
          date: result.date,
          addDate: new Date((new Date().getTime())),
          vehicleAddDate: this.currentVehicle.addDate
        };

        this.modService.create(newMod).subscribe(
          resp => {
            this.loadModRecords();
          }, error => {console.log('error adding mods.'); }
        );
      }
    }, error => {console.log(error)} );
  }

  openEditDialog(modRecord: Mods) {
    console.log('open edit dialog');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      nickname: this.currentVehicle.nickname,
      currentMileage: this.currentVehicle.mileage,
      currentRecord: modRecord
    };


    const dialogRef = this.dialog.open(ModrecordeditdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newMod: Mods = {
          type: result.type,
          cost: result.cost,
          make: result.make,
          partname: result.partname,
          mileage: result.mileage,
          date: result.date,
          addDate: result.addDate,
          vehicleAddDate: this.currentVehicle.addDate
        };
        this.modService.edit(newMod).subscribe(
          resp => {
            this.loadModRecords();
          }, error => {console.log('error editing mods.'); }
        );
      }
    }, error => {console.log(error)} );

  }

  delete(modRecord: Mods) {
    this.modService.delete(modRecord).subscribe(
      resp => {
        this.loadModRecords();
        this.notif.showNotif('Mod deleted!', 'Dismiss');
      }, error => {console.log('error deleting mod.'); }
    );
  }

}
