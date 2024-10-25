import type { Observable } from "../../types/db/Observable";

export class Observable_Model implements Observable {

  private _id          : number;
  private _name        : string;
  private _label       : string;
  private _description : string;
  private _cumulative  : boolean;

  constructor(_observable : Observable) {
    this._id          = _observable.id;
    this._name        = _observable.name;
    this._label       = _observable.label;
    this._description = _observable.description;
    this._cumulative  = _observable.cumulative;
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

  get cumulative() {
    return this._cumulative;
  }
  
}