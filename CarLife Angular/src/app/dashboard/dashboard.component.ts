import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {VehicleService} from "../_services/vehicle.service";
import {MaintenanceService} from "../_services/maintenance.service";
import {VehicleRecord} from "../_models/VehicleRecord";
import {MaintenanceRecord} from "../_models/MaintenanceRecord";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicleRecords: VehicleRecord[] = [];
  mainRecords: MaintenanceRecord[] = [];
  hasVehicles: boolean;
  constructor(private authService: AuthService, private vehicleService: VehicleService,
              private mainService: MaintenanceService) { }
  ngOnInit(): void {
    this.vehicleService.getVehiclesRecord().subscribe(
      vehicles => {
        console.log(vehicles);
        this.vehicleRecords = vehicles;
        if ( this.vehicleRecords.length === 0) {
          this.hasVehicles = false;
        } else {
          this.hasVehicles = true;
        }
      }, error => { console.log('get vehicle records failed.'); }
    );
  }

  loadComments() {

  }

}
