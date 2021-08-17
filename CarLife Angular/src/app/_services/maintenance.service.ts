import {Injectable} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {MaintenanceRecord} from "../_models/MaintenanceRecord";
import {HttpClient} from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class MaintenanceService {


  constructor(private authService: AuthService, private http: HttpClient) {}

  getMaintenanceRecord(addDate) {
    return this.http.get<MaintenanceRecord[]>(`http://localhost:3030/main/getmainrecord/${addDate}`);
  }

  create(record: MaintenanceRecord) {
    return this.http.post(`http://localhost:3030/main/addmainrecord`, record);
  }

  delete(mainRecord: MaintenanceRecord) {
    return this.http.delete(`http://localhost:3030/main/${mainRecord.addDate.toString()}`);
  }

  edit(mainRecord: MaintenanceRecord) {
    return this.http.post(`http://localhost:3030/main/editmainrecord/${mainRecord.addDate.toString()}`, mainRecord);
  }

}
