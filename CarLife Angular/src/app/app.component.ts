import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {Role} from './_models/role';
import {IgxAvatarModule} from 'igniteui-angular';
import {Subscription} from 'rxjs';
import {NotificationService} from "./_services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  avatarColor = '';
  currentUser: User;
  initials = ' ';
  private currentUserSubs: Subscription;
  constructor(  private router: Router,
                private authService: AuthService,
                private notif: NotificationService
  ) {
    this.currentUserSubs = this.authService.currentUser.subscribe(x => {
        if (x) {
          this.currentUser = x;
          this.initials = this.currentUser.firstName.charAt(0).toUpperCase() +
            this.currentUser.lastName.charAt(0).toUpperCase();
          this.avatarColor = this.currentUser.avatarColor;
        }
    } );
  }

  ngOnInit() {
    this.currentUserSubs = this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    } );

  }




  get isTuner() {
    return this.authService.isTuner();
  }

  get isUser() {
    if (!this.currentUser) {
      return false;
    }
    return this.currentUser;
  }

  logout() {
    this.notif.showNotif('See you soon! ' + this.currentUser.username, 'Dismiss');
    this.authService.logout();
    this.initials = '';
    this.router.navigate(['/login']);
  }


}
