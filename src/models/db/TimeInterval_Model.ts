import type { TimeInterval } from "../../types/db/TimeInterval";


export class TimeInterval_Model implements TimeInterval{

  private _id     : number | undefined;
  private _name   : string;
  private _label  : string;
  private _symbol : string;

  constructor(_timeInterval : TimeInterval) {
    this._id     = _timeInterval.id;
    this._name   = _timeInterval.name;
    this._label  = _timeInterval.label;
    this._symbol = _timeInterval.symbol;
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

  get symbol() {
    return this._symbol;
  }

}