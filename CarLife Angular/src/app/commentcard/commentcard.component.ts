import {Component, Input, OnInit} from '@angular/core';
import {Comments} from "../_models/Comments";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-commentcard',
  templateUrl: './commentcard.component.html',
  styleUrls: ['./commentcard.component.css']
})
export class CommentcardComponent implements OnInit {
  @Input() comment: Comments;
  @Input() isMyComment: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

}
