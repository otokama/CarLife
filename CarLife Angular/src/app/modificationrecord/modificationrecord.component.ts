import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mods} from "../_models/Mods";
import {VehicleRecord} from "../_models/VehicleRecord";
import {ModsService} from "../_services/mods.service";
import {AuthService} from "../_services/auth.service";
@Component({
  selector: 'app-modificationrecord',
  templateUrl: './modificationrecord.component.html',
  styleUrls: ['./modificationrecord.component.css']
})


export class ModificationrecordComponent implements OnInit {
  @Input() modRecord: Mods;
  @Input() currentVehicle: VehicleRecord;
  @Output() editEvent = new EventEmitter<Mods>();
  @Output() deleteEvent = new EventEmitter<Mods>();
  modtype = ['Engine', 'DriveTrain', 'Handling', 'Exterior', 'Interior', 'Exhaust', 'Tuning'];

  constructor(private modService: ModsService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  isTuner() {
    return this.authService.isTuner();
  }

  edit() {
    this.editEvent.emit(this.modRecord);
  }

  delete() {
    this.deleteEvent.emit(this.modRecord);
  }

}
