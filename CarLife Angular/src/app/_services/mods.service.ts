import {Injectable} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Mods} from "../_models/Mods";
import {ModType} from "../_models/ModType";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class ModsService {
  mods: Mods[] = [];
  private URL = environment.URL;
  constructor( private authService: AuthService, private http: HttpClient) {
    this.mods = [
      {
        type: ModType.Exhaust,
        cost: 1000,
        make: 'MBRP',
        partname: 'Race Cat-Back Exhaust',
        mileage: 20000,
        date: new Date('2021-04-13T09:30:00'),
        addDate: new Date('2021-04-13T09:30:00'),
        vehicleAddDate: new Date('2020-12-11T09:30:00')
      },
      {
        type: ModType.Exterior,
        cost: 1400,
        make: 'Anderson Composite',
        partname: 'Carbon Fiber Rear Diffuser',
        mileage: 26800,
        date: new Date('2021-04-20T09:30:00'),
        addDate: new Date('2021-04-20T09:30:00'),
        vehicleAddDate: new Date('2020-12-11T09:30:00')
      },
      {
        type: ModType.Exhaust,
        cost: 300,
        make: 'Megan Racing',
        partname: 'Test Pipes',
        mileage: 13000,
        date: new Date('2021-01-23T09:30:00'),
        addDate: new Date('2021-01-23T09:30:00'),
        vehicleAddDate: new Date('2010-11-15T09:30:00')
      },
      {
        type: ModType.Exhaust,
        cost: 1100,
        make: 'Tomei',
        partname: 'Extreme Titanium Exhaust',
        mileage: 25900,
        date: new Date('2021-02-26T09:30:00'),
        addDate: new Date('2021-02-26T09:30:00'),
        vehicleAddDate: new Date('2010-11-15T09:30:00')
      }
    ];

  }

  getRecords(addDate: Date) {
    return this.http.get<Mods[]>(`${this.URL}/mods/getMods/${addDate}`);
  }

  create(record: Mods) {
    return this.http.post(`${this.URL}/mods/addmods`, record);
  }

  edit(record: Mods) {
    return this.http.post(`${this.URL}/mods/editmods`, record);
  }

  delete(record: Mods) {
    return this.http.delete(`${this.URL}/mods/deletemods/${record.addDate}`);
  }

}
