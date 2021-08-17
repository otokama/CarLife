import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-vehicle-add-dialog',
  templateUrl: 'vehiclemakerdialog.component.html',
  styleUrls: ['vehiclemakerdialog.component.css']
})
export class VehiclemakerdialogComponent {
  fieldControl = new FormControl('', [Validators.required]);
  nickname: string;
  make: string;
  year: number;
  model: string;
  mileage: number;
  ownedSince: Date;
  bodyType: number;
  maxDate = new Date((new Date().getTime()));
  constructor(
    public dialogRef: MatDialogRef<VehiclemakerdialogComponent>,
    private notif: NotificationService) {}

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
        bodyType: this.bodyType
      });
      this.notif.showNotif('Added new vehicle ' + this.nickname + '!', 'Dismiss');
    } else {
      this.notif.showNotif('Please fill in all fields.', 'Dismiss');
    }
  }

}
