import type { Location } from "../../types/db/Location";

export class Location_Model implements Location {

  private _id          : number;
  private _name        : string | null;
  private _label       : string | null;
  private _description : string | null;
  private _address     : string | null;
  private _geometry    : string;
  private _type        : string | null;

  constructor(_location : Location) {
    this._id          = _location.id;
    this._name        = _location.name;
    this._label       = _location.label;
    this._description = _location.description;
    this._address     = _location.address;
    this._geometry    = _location.geometry;
    this._type        = _location.type;
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

  get address() {
    return this._address;
  }

  get geometry() {
    return this._geometry;
  }

  get type() {
    return this._type;
  }

}