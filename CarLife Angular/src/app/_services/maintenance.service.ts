import {Injectable} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {MaintenanceRecord} from "../_models/MaintenanceRecord";
import {HttpClient} from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class MaintenanceService {

  private URL = environment.URL;
  constructor(private authService: AuthService, private http: HttpClient) {}

  getMaintenanceRecord(addDate) {
    return this.http.get<MaintenanceRecord[]>(`${this.URL}/main/getmainrecord/${addDate}`);
  }

  create(record: MaintenanceRecord) {
    return this.http.post(`${this.URL}/main/addmainrecord`, record);
  }

  delete(mainRecord: MaintenanceRecord) {
    return this.http.delete(`${this.URL}/main/${mainRecord.addDate.toString()}`);
  }

  edit(mainRecord: MaintenanceRecord) {
    return this.http.post(`${this.URL}/main/editmainrecord/${mainRecord.addDate.toString()}`, mainRecord);
  }

}
