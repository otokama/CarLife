
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }

  getByUser(username: string) {
    return this.http.get<User>(`http://localhost:3030/user/getUser/${username}`);
  }

  getAllTuners() {
    // TODO: get list of tuners.
    return this.http.get<User[]>(`http://localhost:3030/user/alltuner`);
  }

  getAllCustomers() {
    return this.http.get<User[]>(`http://localhost:3030/user/allcustomer`);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }


  setGoal(calGoal: number, minGoal: number) {
    return this.http.post<User>(`http://localhost:3030/user/setgoals`, {calGoal, minGoal});
  }

  getGoal(username) {
    return this.http.get<any>(`http://localhost:3030/user/getgoals/${username}`);
  }



}
