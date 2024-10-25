import type { FeatureOfInterest } from "../../types/db/FeatureOfInterest";

export class FeatureOfInterest_Model implements FeatureOfInterest {

  private _id          : number;
  private _name        : string;
  private _label       : string;
  private _description : string;

  constructor(_featureOfInterest : FeatureOfInterest) {
    this._id          = _featureOfInterest.id;
    this._name        = _featureOfInterest.name;
    this._label       = _featureOfInterest.label;
    this._description = _featureOfInterest.description;
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