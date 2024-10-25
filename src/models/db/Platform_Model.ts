import type { Platform } from "../../types/db/Platform";

export class Platform_Model implements Platform {
  private _id          : number | undefined;
  private _name        : string;
  private _label       : string;
  private _description : string | null;
  private _type        : number;
  private _is_static   : boolean;
  private _visibility  : number;

  constructor(_platform : Platform) {
    this._id          = _platform.id;
    this._name        = _platform.name;
    this._label       = _platform.label;
    this._description = _platform.description;
    this._type        = _platform.type;
    this._is_static   = _platform.is_static;
    this._visibility  = _platform.visibility;
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

  get description(){
    return this._description;
  }

  get type() {
    return this._type;
  }

  get is_static() {
    return this._is_static;
  }

  get visibility() {
    return this._visibility;
  }
}