import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Comments} from "../_models/Comments";
import {AuthService} from "./auth.service";
import {Role} from "../_models/role";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CommentService {
  private URL = environment.URL;
  constructor(private authService: AuthService, private http: HttpClient) {}


  getConversation(author, postedTo) {
    return this.http.post<Comments[]>(`${this.URL}/comment/getcomments`, {person1: author, person2: postedTo});
  }

  getCommentByDate(addDate: Date) {
    return this.http.get<Comments>(`${this.URL}/comment/getcommentbydate/${addDate}`);
  }

  create(comment: Comments) {
    return this.http.post(`${this.URL}/comment/addcomment`, comment);
  }



}
