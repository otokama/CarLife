import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../_services/notification.service";
import {AuthService} from "../_services/auth.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-commentdialog',
  templateUrl: './commentdialog.component.html',
  styleUrls: ['./commentdialog.component.css']
})
export class CommentdialogComponent implements OnInit {
  comment: string;
  fieldControl = new FormControl('', [Validators.required]);
  tunerList: User[] = [];
  currentTuner: string;
  constructor(
    public dialogRef: MatDialogRef<CommentdialogComponent>, private notif: NotificationService, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (!this.isTuner()) {
      this.tunerList = data.tunerList;
    }
  }

  ngOnInit(): void {
    console.log(this.tunerList);
  }
  getError() {
    if (this.fieldControl.hasError('required')) {
      return 'You must fill in this field.';
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  isTuner() {
    return this.authService.isTuner();
  }

  save() {
    if (this.comment && this.comment.length > 0) {
      if (!this.isTuner() ) {
        if (!this.currentTuner) {
          this.notif.showNotif('You must choose your tuner.', 'Dismiss');
          return;
        } else {
          console.log('posted to tuner: ', this.currentTuner);
          this.dialogRef.close({
            comment: this.comment,
            tuner: this.currentTuner
          });
        }
      } else {
        this.dialogRef.close({
          comment: this.comment,
        });
      }
      this.notif.showNotif('New comment added!', 'Dismiss');
    } else {
      this.notif.showNotif('You must type something.', 'Dismiss');
    }
  }

}
