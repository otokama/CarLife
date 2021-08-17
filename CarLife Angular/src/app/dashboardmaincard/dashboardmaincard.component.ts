import {Component, Input, OnInit} from '@angular/core';
import {MaintenanceRecord} from "../_models/MaintenanceRecord";
import {VehicleRecord} from "../_models/VehicleRecord";
import {VehicleService} from "../_services/vehicle.service";
import {MaintenanceService} from "../_services/maintenance.service";
import {NotificationService} from "../_services/notification.service";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-dashboardmaincard',
  templateUrl: './dashboardmaincard.component.html',
  styleUrls: ['./dashboardmaincard.component.css']
})
export class DashboardmaincardComponent implements OnInit {
  vehicleRecords: VehicleRecord[];
  currentVehicle: VehicleRecord;
  currentMainRecords: MaintenanceRecord[] = [];
  chartData = [
    {data: []},
    ];
  chartLabels = [];
  constructor(private vehicleService: VehicleService, private mainService: MaintenanceService,
              private notif: NotificationService, private authService: AuthService) { }



  ngOnInit(): void {
    this.vehicleService.getVehiclesRecord().subscribe(
      vehicles => {
        this.vehicleRecords = vehicles;
        if (this.vehicleRecords.length >= 1) {
          this.currentVehicle = this.vehicleRecords[0];
          this.loadMaintenanceRecords();
        }

      }
    );
  }

  loadMaintenanceRecords() {
    this.mainService.getMaintenanceRecord(this.currentVehicle.addDate).subscribe(
      records => {
        this.currentMainRecords = records;
        this.filter();
        this.sortRecords();
        this.loadSummary();
        this.checkPastDue();
      }, error => {console.log('error loading records'); }
    );
  }

  loadSummary() {
    this.chartData = [
      {data: []},
    ];
    this.chartLabels = [];
    for ( let i = 0; i < this.currentMainRecords.length; i++) {
      this.chartData[0].data[i] = this.currentMainRecords[i].cost;
      this.chartLabels[i] = this.currentMainRecords[i].maintenanceName;
    }

  }

  checkPastDue() {
    if (!this.authService.isTuner()){
      let i = 0;
      let count = 0;
      for (i; i < this.currentMainRecords.length; i++) {
        if (this.getMilesLeft(this.currentMainRecords[i]) < 0) {
          count++;
        }
      }
      if (count > 0) {
        this.notif.showNotif('You have ' + count + ' maintenance past due for your ' +
          this.currentVehicle.nickname + '!', 'Dismiss');
      }
    }
  }

  filter() {
    if (this.vehicleRecords.length >= 1) {
      this.currentMainRecords = this.currentMainRecords.filter( record => new Date(record.vehicleAddDate).getTime() ===
        new Date(this.currentVehicle.addDate).getTime() );
      this.sortRecords();
      this.loadSummary();
    }
  }

  getMilesLeft(mainRecord: MaintenanceRecord) {
    return mainRecord.intervalMile - (this.currentVehicle.mileage - mainRecord.mileage);
  }
  getProgressValue(milesleft, milesinterval) {
    return 100 - Math.ceil(((milesinterval - milesleft) / milesinterval) * 100);
  }
  sortRecords() {
    if (this.vehicleRecords.length >= 1) {
      this.currentMainRecords = this.currentMainRecords.sort( (recordA, recordB) =>
      0 - (this.getMilesLeft(recordA) > this.getMilesLeft(recordB) ? -1 : 1) );
    }
  }

}
