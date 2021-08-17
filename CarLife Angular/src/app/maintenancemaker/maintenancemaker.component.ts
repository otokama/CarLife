import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-maintenancemaker',
  templateUrl: './maintenancemaker.component.html',
  styleUrls: ['./maintenancemaker.component.css']
})
export class MaintenancemakerComponent {
  fieldControl = new FormControl('', [Validators.required]);
  name: string;
  intervalMile: number;
  date: Date;
  maxDate = new Date((new Date().getTime()));
  mileage: number;
  cost: number;
  nickname: string;
  currentMile: number;
  constructor( public dialogRef: MatDialogRef<MaintenancemakerComponent>,
               @Inject(MAT_DIALOG_DATA) data, private notif: NotificationService) {
    this.nickname = data.nickname;
    this.currentMile = data.currentMileage;
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
    if (this.name && this.intervalMile && this.date && this.mileage && this.cost) {
      if (Number(this.mileage) <= Number(this.currentMile)) {
        this.dialogRef.close({
          maintenanceName: this.name,
          intervalMile: this.intervalMile,
          date: this.date,
          mileage: this.mileage,
          cost: this.cost
        });
        this.notif.showNotif('Maintenance record for ' + this.nickname + ' added!', 'Dismiss');
      } else {
        this.notif.showNotif('\'Last Maintenance Mileage\' should be smaller than current mileage: ' + this.currentMile, 'Dismiss');
      }

    } else {
      this.notif.showNotif('Please fill in all fields.', 'Dismiss');
    }
  }

}
