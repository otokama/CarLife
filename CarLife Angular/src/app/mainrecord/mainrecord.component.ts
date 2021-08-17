import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaintenanceRecord} from "../_models/MaintenanceRecord";
import {NotificationService} from "../_services/notification.service";
import {VehicleRecord} from "../_models/VehicleRecord";
import {VehicleService} from "../_services/vehicle.service";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-mainrecord',
  templateUrl: './mainrecord.component.html',
  styleUrls: ['./mainrecord.component.css']})
export class MainrecordComponent implements OnInit {
  @Input() mainrecord: MaintenanceRecord;
  @Input() currentVehicle;
  @Input() milesLeft: number;
  @Input() milesLeftProgressValue: number;
  @Output() editEvent = new EventEmitter<MaintenanceRecord>();
  @Output() deleteEvent = new EventEmitter<MaintenanceRecord>();
  @Output() commentEvent = new EventEmitter<MaintenanceRecord>();
  constructor(private notif: NotificationService, private authService: AuthService, private vehicleService: VehicleService) { }
  ngOnInit(): void {
  }

  isTuner() {
    return this.authService.isTuner();
  }

  delete() {
    this.deleteEvent.emit(this.mainrecord);
  }

  edit() {
    this.editEvent.emit(this.mainrecord);
  }

  comment() {
    this.commentEvent.emit(this.mainrecord);
  }

}
