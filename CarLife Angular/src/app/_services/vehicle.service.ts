import {Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {VehicleRecord} from "../_models/VehicleRecord";
import {VehicleType} from "../_models/VehicleType";
import {AuthService} from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private URL = environment.URL;
  constructor(private notif: NotificationService,
              private authService: AuthService, private http: HttpClient) {

  }

  getVehiclesRecord() {
    return this.http.get<VehicleRecord[]>(`${this.URL}/vehicle/getvehicles/${this.authService.currentUserValue.username}`);
  }

  getVehicleRecordByDate(date: Date) {
    return this.http.get<VehicleRecord>(`${this.URL}/vehicle/getvehiclesbydate/${date}`);
  }

  getAllVehicles() {
    return this.http.get<VehicleRecord[]>(`${this.URL}/vehicle/getallvehicles`);
  }

  deleteVehicleRecord(date: Date) {
    return this.http.delete(`${this.URL}/vehicle/deletevehicle/${date}`);
  }

  editVehicleRecord(record: VehicleRecord) {
    return this.http.post(`${this.URL}/vehicle/editvehicle`, record);
  }
  createNewVehicleRecord(record: VehicleRecord) {
    return this.http.post('${this.URL}/vehicle/addvehicle', record);
  }

  updateMileage(addDate: Date, miles: number) {
    return this.http.post(`${this.URL}/vehicle/updatemileage/${addDate}`, {miles});
  }


}
