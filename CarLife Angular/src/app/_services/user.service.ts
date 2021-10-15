
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from "../../environments/environment";


@Injectable({ providedIn: 'root' })
export class UserService {

  private URL = environment.URL;
  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`${this.URL}/user/allusers`);
  }

  getByUser(username: string) {
    return this.http.get<User>(`${this.URL}/user/getUser/${username}`);
  }

  getAllTuners() {
    // TODO: get list of tuners.
    return this.http.get<User[]>(`${this.URL}/user/alltuner`);
  }

  getAllCustomers() {
    return this.http.get<User[]>(`${this.URL}/user/allcustomer`);
  }

  register(user: User) {
    return this.http.post(`${this.URL}/user/register`, user);
  }


  setGoal(calGoal: number, minGoal: number) {
    return this.http.post<User>(`${this.URL}/user/setgoals`, {calGoal, minGoal});
  }

  getGoal(username) {
    return this.http.get<any>(`${this.URL}/user/getgoals/${username}`);
  }



}
