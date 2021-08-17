import {Component, Inject, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-updatemileagedialog',
  templateUrl: './updatemileagedialog.component.html',
  styleUrls: ['./updatemileagedialog.component.css']
})
export class UpdatemileagedialogComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<UpdatemileagedialogComponent>, private notif: NotificationService,
               @Inject(MAT_DIALOG_DATA) data) {
    this.original = data.currentMiles;
  }
  fieldControl = new FormControl('', [Validators.required]);
  miles: number;
  original: number;
  ngOnInit(): void {
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
    if (this.miles) {
      if (Number(this.miles) >= Number(this.original)) {
        this.dialogRef.close({miles: this.miles});
      } else {
        this.notif.showNotif('Mileage need to be greater than ' + this.original, 'error');
      }

    } else {
      this.notif.showNotif('Please fill in mileage.', 'Dismiss');
    }
  }

}
