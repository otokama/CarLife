import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-vehiclerecordeditdialog',
  templateUrl: 'vehiclerecordeditdialog.component.html',
  styleUrls: ['vehiclerecordeditdialog.component.css']
})
export class VehiclerecordeditdialogComponent {
  fieldControl = new FormControl('', [Validators.required]);
  nickname: string;
  make: string;
  year: number;
  model: string;
  mileage: number;
  ownedSince: Date;
  bodyType;
  addDate: Date;
  maxDate = new Date((new Date().getTime()));
  constructor(
    public dialogRef: MatDialogRef<VehiclerecordeditdialogComponent>,
    private notif: NotificationService,  @Inject(MAT_DIALOG_DATA) data) {
    this.nickname = data.nickname;
    this.make = data.make;
    this.year = data.year;
    this.model = data.model;
    this.mileage = data.mileage;
    this.ownedSince = data.ownedSince;
    this.bodyType = data.bodyType.toString();
    this.addDate = data.addDate;

  }

  getError() {
    if (this.fieldControl.hasError('required')) {
      return 'You must fill in this field.';
    }
  }

  hasError() {
    return this.fieldControl.hasError('required');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  save() {
    if (this.make && this.year && this.model && this.mileage && this.ownedSince && this.bodyType
      && this.nickname) {
      this.dialogRef.close({
        nickname: this.nickname,
        make: this.make,
        year: this.year,
        model: this.model,
        mileage: this.mileage,
        ownedSince: this.ownedSince,
        bodyType: this.bodyType,
        addDate: this.addDate
      });
      this.notif.showNotif('Saved vehicle ' + this.nickname + '!', 'Dismiss');

    } else {
      this.notif.showNotif('Please fill in all fields.', 'Dismiss');
    }
  }

}
