import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {NotificationService} from "../_services/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modificationrecordmakerdialog',
  templateUrl: './modificationrecordmakerdialog.component.html',
  styleUrls: ['./modificationrecordmakerdialog.component.css']
})
export class ModificationrecordmakerdialogComponent {

  fieldControl1 = new FormControl('', [Validators.required]);
  modtype: number;
  cost: number;
  make: string;
  partname: string;
  mileage: number;
  addDate: Date;
  maxDate = new Date((new Date().getTime()));
  nickname: string;
  currentMile: number;
  constructor(public dialogRef: MatDialogRef<ModificationrecordmakerdialogComponent>,
              private notif: NotificationService, @Inject(MAT_DIALOG_DATA) data) {
    this.nickname = data.nickname;
    this.currentMile = data.currentMileage;
  }


  getError() {
    if (this.fieldControl1.hasError('required')) {
      return 'You must fill in this field.';
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  hasError() {
    return this.fieldControl1.hasError('required');
  }
  save() {
    if (this.modtype && this.cost && this.make && this.partname && this.mileage && this.addDate) {
      if (Number(this.mileage) <= Number(this.currentMile)) {
        this.dialogRef.close({
          type: this.modtype,
          cost: this.cost,
          make: this.make,
          partname: this.partname,
          mileage: this.mileage,
          date: this.addDate
        });
        this.notif.showNotif('Mods added for ' + this.nickname + ' !', 'Dismiss');
      } else {
        this.notif.showNotif('Enter a mileage lower than ' + this.currentMile, 'Dismiss');
      }
    } else {
      this.notif.showNotif('Please fill in all fields.', 'Dismiss');
    }
  }
}
