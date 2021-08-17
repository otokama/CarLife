import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {NotificationService} from "../_services/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-modrecordeditdialog',
  templateUrl: './modrecordeditdialog.component.html',
  styleUrls: ['./modrecordeditdialog.component.css']
})
export class ModrecordeditdialogComponent {

  fieldControl = new FormControl('', [Validators.required]);
  modtype: string;
  cost: number;
  make: string;
  partname: string;
  mileage: number;
  date: Date;
  addDate: Date;
  maxDate = new Date((new Date().getTime()));
  nickname: string;
  currentMileage: number;
  constructor(public dialogRef: MatDialogRef<ModrecordeditdialogComponent>,
              private notif: NotificationService, @Inject(MAT_DIALOG_DATA) data) {
    this.nickname = data.nickname;
    this.currentMileage = data.currentMileage;
    this.modtype = data.currentRecord.type.toString();
    this.cost = data.currentRecord.cost;
    this.make = data.currentRecord.make;
    this.partname = data.currentRecord.partname;
    this.mileage = data.currentRecord.mileage;
    this.date = data.currentRecord.date;
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
    if (this.modtype && this.cost && this.make && this.partname && this.mileage && this.date) {
      if (Number(this.mileage) <= Number(this.currentMileage)) {
        this.dialogRef.close({
          type: this.modtype,
          cost: this.cost,
          make: this.make,
          partname: this.partname,
          mileage: this.mileage,
          date: this.date,
          addDate: this.addDate
        });
        this.notif.showNotif('Mods updated for ' + this.nickname + ' !', 'Dismiss');

      } else {
        this.notif.showNotif('Enter a mileage lower than ' + this.currentMileage, 'Dismiss');
      }
    } else {
      this.notif.showNotif('Please fill in all fields.', 'Dismiss');
    }

  }

}
