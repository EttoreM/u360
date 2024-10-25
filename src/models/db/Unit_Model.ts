import type { Unit } from "../../types/db/Unit";

export class Unit_Model implements Unit {

  private _id          : number;
  private _name        : string;
  private _label       : string;
  private _description : string;
  private _symbol      : string;

  constructor(_unit : Unit) {
    this._id          = _unit.id;
    this._name        = _unit.name;
    this._label       = _unit.label;
    this._description = _unit.description;
    this._symbol      = _unit.symbol;
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

  get symbol() {
    return this._symbol;
  }
  
}