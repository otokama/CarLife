import {Role} from './role';
import {VehicleType} from './VehicleType';

export class VehicleRecord {
  ownerUsername: string;
  nickname: string;
  make: string;
  year: number;
  model: string;
  mileage: number;
  ownedSince: Date;
  bodyType: VehicleType;
  addDate: Date;
}
