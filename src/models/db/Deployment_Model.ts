import type {Deployment} from "../../types/db/Deployment";


export class Deployment_Model implements Deployment{

  private _id           : number | undefined;
  private _name         : string;
  private _label        : string;
  private _description  : string;
  private _start_date   : Date;
  private _end_date     : Date | null;
  private _external_url : string | null;
  private _visibility   : number;

  constructor(_deployment : Deployment) {
    this._id           = _deployment.id;
    this._name         = _deployment.name;
    this._label        = _deployment.label;
    this._description  = _deployment.description;
    this._start_date   = _deployment.start_date;
    this._end_date     = _deployment.end_date;
    this._external_url = _deployment.external_url;
    this._visibility   = _deployment.visibility;
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

  get start_date() {
    return this._start_date;
  }

  get end_date() {
    return this._end_date;
  }

  get external_url() {
    return this._external_url;
  }

  get visibility() {
    return this._visibility;
  }
}