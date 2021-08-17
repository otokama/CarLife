import {Component, Input, OnInit} from '@angular/core';
import {Comments} from "../_models/Comments";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-commentsection',
  templateUrl: './commentsection.component.html',
  styleUrls: ['./commentsection.component.css']
})
export class CommentsectionComponent implements OnInit {
  @Input() comments: Comments[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.comments);
  }

}
