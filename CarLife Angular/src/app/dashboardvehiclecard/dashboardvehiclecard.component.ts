import {Component, Input, OnInit} from '@angular/core';
import {VehicleRecord} from "../_models/VehicleRecord";

@Component({
  selector: 'app-dashboardvehiclecard',
  templateUrl: './dashboardvehiclecard.component.html',
  styleUrls: ['./dashboardvehiclecard.component.css']
})
export class DashboardvehiclecardComponent implements OnInit {
  panelOpen: boolean;
  @Input() vehicleRecord: VehicleRecord;

  bodytype = ['Hatchback', 'Sedan', 'Coupe', 'Sports Car', 'Convertible', 'SUV', 'Minivan', 'Pickup'];

  constructor() { }
  ngOnInit(): void {
    this.panelOpen = false;
  }

}
