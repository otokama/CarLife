import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {VehicleRecord} from "../_models/VehicleRecord";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-vehiclerecord',
  templateUrl: './vehiclerecord.component.html',
  styleUrls: ['./vehiclerecord.component.css']
})
export class VehiclerecordComponent implements OnInit {
  @Input() vehiclerecord: VehicleRecord;
  @Output() editEvent = new EventEmitter<VehicleRecord>();
  @Output() deleteEvent = new EventEmitter<VehicleRecord>();
  @Input() displayOnDash: boolean;
  bodytype = ['Hatchback', 'Sedan', 'Coupe', 'Sports Car', 'Convertible', 'SUV', 'Minivan', 'Pickup'];
  constructor(private notif: NotificationService) { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteEvent.emit(this.vehiclerecord);
  }

  edit() {
    this.editEvent.emit(this.vehiclerecord);
  }

}
