import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';


@Component({ templateUrl: 'login.component.html' ,
  styleUrls: ['login.component.css']})
export class LoginComponent {
 // loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  username: string;
  password: string;

  constructor(
   // private formBuilder: FormBuilder,
     private router: Router,
     private authService: AuthService,
     private notif: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }





  login() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.loading = true;

    this.loading = true;
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          if (this.authService.isTuner()) {
            this.router.navigate(['/maintenance']);
          } else {
            this.router.navigate(['/dashboard']);
          }
          // this.notif.showNotif( 'Welcome!  ' + this.username, 'Dismiss');
        },
        error => {
          this.error = error;
          this.loading = false;
          // show a snackbar to user
          this.notif.showNotif(this.error, 'dismiss');
          console.log('Error', error);
        });

  }
}


