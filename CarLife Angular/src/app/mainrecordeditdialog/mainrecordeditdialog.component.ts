import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-mainrecordeditdialog',
  templateUrl: './mainrecordeditdialog.component.html',
  styleUrls: ['./mainrecordeditdialog.component.css']
})
export class MainrecordeditdialogComponent {
  fieldControl = new FormControl('', [Validators.required]);
  maintenanceName: string;
  intervalMile: number;
  date: Date;
  maxDate = new Date((new Date().getTime()));
  mileage: number;
  cost: number;
  addDate: Date;
  nickname: string;
  currentMile: number;
  constructor( public dialogRef: MatDialogRef<MainrecordeditdialogComponent>,
               @Inject(MAT_DIALOG_DATA) data, private notif: NotificationService) {
    this.nickname = data.nickname;
    this.currentMile = data.currentMileage;
    this.maintenanceName = data.currentRecord.maintenanceName;
    this.intervalMile = data.currentRecord.intervalMile;
    this.date = data.currentRecord.date;
    this.mileage = data.currentRecord.mileage;
    this.cost = data.currentRecord.cost;
    this.addDate = data.currentRecord.addDate;
  }

  getError() {
    if (this.fieldControl.hasError('required')) {
      return 'You must fill in this field.';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.maintenanceName && this.intervalMile && this.date && this.mileage && this.cost) {
      if (Number(this.mileage) <= Number(this.currentMile)) {
        this.dialogRef.close({
          maintenanceName: this.maintenanceName,
          intervalMile: this.intervalMile,
          date: this.date,
          mileage: this.mileage,
          cost: this.cost,
          addDate: this.addDate
        });
        this.notif.showNotif('Maintenance record for ' + this.nickname + ' updated!', 'Dismiss');
      } else {
        this.notif.showNotif('Last Maintenance Mileage should be smaller than current mileage: ' + this.currentMile, 'Dismiss');
      }

    } else {
      this.notif.showNotif('Please fill in all fields.', 'Dismiss');
    }
  }

}
