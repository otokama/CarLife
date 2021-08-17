import {Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {VehicleRecord} from "../_models/VehicleRecord";
import {VehicleType} from "../_models/VehicleType";
import {AuthService} from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private notif: NotificationService,
              private authService: AuthService, private http: HttpClient) {

  }

  getVehiclesRecord() {
    return this.http.get<VehicleRecord[]>(`http://localhost:3030/vehicle/getvehicles/${this.authService.currentUserValue.username}`);
  }

  getVehicleRecordByDate(date: Date) {
    return this.http.get<VehicleRecord>(`http://localhost:3030/vehicle/getvehiclesbydate/${date}`);
  }

  getAllVehicles() {
    return this.http.get<VehicleRecord[]>('http://localhost:3030/vehicle/getallvehicles');
  }

  deleteVehicleRecord(date: Date) {
    return this.http.delete(`http://localhost:3030/vehicle/deletevehicle/${date}`);
  }

  editVehicleRecord(record: VehicleRecord) {
    return this.http.post(`http://localhost:3030/vehicle/editvehicle`, record);
  }
  createNewVehicleRecord(record: VehicleRecord) {
    return this.http.post('http://localhost:3030/vehicle/addvehicle', record);
  }

  updateMileage(addDate: Date, miles: number) {
    return this.http.post(`http://localhost:3030/vehicle/updatemileage/${addDate}`, {miles});
  }


}
