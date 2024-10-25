import type { Sensor } from "../../types/db/Sensor";

export class Sensor_Model implements Sensor {
  private _id          :  number;
  private _name        : string;
  private _label       : string;
  private _description : string | null;
  private _platform    : number;

  constructor(_sensor : Sensor) {
    this._id          = _sensor.id;
    this._name        = _sensor.name;
    this._label       = _sensor.label;
    this._description = _sensor.description;
    this._platform    = _sensor.platform;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  get description() {
    return this._description;
  }

  get platform() {
    return this._platform;
  }
}