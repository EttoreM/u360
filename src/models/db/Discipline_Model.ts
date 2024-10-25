import type { Discipline } from "../../types/db/Discipline";

export class Discipline_Model implements Discipline {

  private _id          : number | undefined;
  private _name        : string;
  private _label       : string;
  private _description : string;

  constructor(_discipline : Discipline) {
    this._id          = _discipline.id;
    this._name        = _discipline.name;
    this._label       = _discipline.label;
    this._description = _discipline.description;
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
  
}