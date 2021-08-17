import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Comments} from "../_models/Comments";
import {AuthService} from "./auth.service";
import {Role} from "../_models/role";


@Injectable({ providedIn: 'root' })
export class CommentService {

  constructor(private authService: AuthService, private http: HttpClient) {}


  getConversation(author, postedTo) {
    return this.http.post<Comments[]>(`http://localhost:3030/comment/getcomments`, {person1: author, person2: postedTo});
  }

  getCommentByDate(addDate: Date) {
    return this.http.get<Comments>(`http://localhost:3030/comment/getcommentbydate/${addDate}`);
  }

  create(comment: Comments) {
    return this.http.post(`http://localhost:3030/comment/addcomment`, comment);
  }



}
