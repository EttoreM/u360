import type { RecommendedUnit } from "../../types/db/RecommendedUnit";

export class RecommendedUnit_Model implements RecommendedUnit {

  private _observable : number;
  private _unit       : number;

  constructor(_unit : RecommendedUnit) {
    this._observable = _unit.observable;
    this._unit       = _unit.unit;
  }

  get observable() {
    return this._observable;
  }

  get unit() {
    return this._unit;
  }
  
}