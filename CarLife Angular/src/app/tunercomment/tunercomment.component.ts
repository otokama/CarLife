import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../canvasjs-3.2.13/canvasjs.min.js';
import {AuthService} from "../_services/auth.service";
import {Comments} from "../_models/Comments";
import {CommentService} from "../_services/comment.service";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {NotificationService} from "../_services/notification.service";
import {first} from "rxjs/operators";
import {Role} from "../_models/role";

@Component({
  selector: 'app-tunercomment',
  templateUrl: './tunercomment.component.html',
  styleUrls: ['./tunercomment.component.css']
})
export class TunercommentComponent implements OnInit {
  comments: Comments[] = [];
  currentUser: string;
  currentUsername: string;
  currentCustomer: string;
  currentTuner: string;
  newComment: string;
  userList: User[] = [];
  keyboard = false;
  constructor(private authService: AuthService, private commentService: CommentService, private userService: UserService,
              private notif: NotificationService) {
  }

  ngOnInit(): void {
    this.currentUsername =  this.authService.currentUserValue.username;
    this.currentUser = this.authService.currentUserValue.firstName + ' ' + this.authService.currentUserValue.lastName;
    if (this.isTuner()) {
      this.initialLoadTunerRecords();
    } else {
      this.initialLoadRecords();
    }


  }

  initialLoadRecords() {
    this.userService.getAllTuners().subscribe( users => {
      this.userList = users;
      if (users.length >= 1) {
        this.currentTuner = users[0].username;
        this.loadConversationWithTuner();
      }
    }, error => {console.log('error loading tuners.'); });
  }

  initialLoadTunerRecords() {
    this.userService.getAllCustomers().subscribe(users => {
      this.userList = users;
      if (users.length >= 1) {
        this.currentCustomer = users[0].username;
        this.loadConversationWithCustomers();
      }
      }, error => {console.log('error loading tuners.'); });
  }

  loadConversationWithTuner() {
    this.commentService.getConversation(this.authService.currentUserValue.username, this.currentTuner).subscribe(
      comments => {
        this.comments = comments;
      }, error => {console.log('error loading conversation'); }
    );
  }

  loadConversationWithCustomers() {
    this.commentService.getConversation(this.authService.currentUserValue.username, this.currentCustomer).subscribe(
      comments => {
        this.comments = comments;
      }, error => {console.log('error loading conversation'); }
    );
  }

  isTuner() {
    return this.authService.isTuner();
  }

  isMyComment(comment: Comments): boolean {
    return this.currentUsername === comment.authorUsername;
  }

  toggleKeyboard() {
    if (this.keyboard) {
      this.keyboard = false;
    } else {
      this.keyboard = true;
    }
  }

  post() {
    if (this.newComment.length > 0) {
      let submitComment: Comments = null;
      if (this.isTuner()) {
        submitComment = {
          vehicle: null,
          maintenance: null,
          comments: this.newComment,
          role: this.authService.currentUserValue.role,
          postedTo: this.currentCustomer,
          authorUsername: this.authService.currentUserValue.username,
          avatarColor: this.authService.currentUserValue.avatarColor,
          initials: this.authService.currentUserValue.firstName[0].toUpperCase() + this.authService.currentUserValue.lastName[0].toUpperCase(),
          addDate: new Date((new Date().getTime()))
        };
      } else {
        submitComment = {
          vehicle: null,
          maintenance: null,
          comments: this.newComment,
          role: this.authService.currentUserValue.role,
          postedTo: this.currentTuner,
          authorUsername: this.authService.currentUserValue.username,
          avatarColor: this.authService.currentUserValue.avatarColor,
          initials: this.authService.currentUserValue.firstName[0].toUpperCase() + this.authService.currentUserValue.lastName[0].toUpperCase(),
          addDate: new Date((new Date().getTime()))
        };
      }
      this.commentService.create(submitComment).subscribe(
        resp => {
          if (this.isTuner()) {
            this.loadConversationWithCustomers();
          } else {
            this.loadConversationWithTuner();
          }
          this.notif.showNotif('Posted new comment!', 'Dismiss');
          this.newComment = '';
        }, error => {console.log('error submitting comment.'); }
      );
    } else {
      this.notif.showNotif('You haven\'t typed anything.', 'Dismiss');
    }

  }
}
