import _                   from "lodash";
import type { Observable } from "../../types/db/Observable";
import type { Unit }       from "../../types/db/Unit";
import type { Platform }   from "../../types/db/Platform";


export class CreatePlatform_Model {

  // #region Private Properties
  private _platform            : Platform | null = null;
  private _deploymentId        : Number | null = null;
  private _geolocation         : {lon: number | null, lat: number | null} = {lon: null, lat: null};
  private _typicalObservables  : Array<Observable> | [] = [];
  private _recommendedUnits    : {[observableId : number] : Array<Unit> | []} = {};
  private _observables         : Array<{observableId: number, unitId: number | null, timeIntervalId: number | null, comment: string}> = [];
  // #endregion Private Properties


  // #region Constructor
  constructor() {}
  // #endregion Constructor


  // #region Getters
  get platform() : Platform | null {
    return this._platform;
  }

  get deploymentId() : Number | null {
    return this._deploymentId;
  }

  get geolocation() : {lon: number | null, lat: number | null} {
    return this._geolocation;
  }

  get typicalObservables() : Array<Observable> {
    return this._typicalObservables;
  }

  get recommendedUnits() : {[observableId : number] : Array<Unit> | []} {
    return this._recommendedUnits;
  }

  get observables() : Array<{observableId: number, unitId: number | null, timeIntervalId: number | null, comment: string}> {
    return this._observables;
  }
  // #endregion Getters


  // #region Setters
  set platform(value: Platform) {
    this._platform = value;
  }

  set deploymentId(value: Number | null) {
    this._deploymentId = value;
  }

  set geolocation(_geoloc: {lon: number | null, lat: number | null}) {
    this._geolocation = _geoloc;
  }

  set typicalObservables(value : Array<Observable>) {
    if (value) {
      this._typicalObservables = [...value]; // I create a hard copy of the array passed
    }
  }

  set recommendedUnits(value : {[observableId : number] : Array<Unit> | []}) {
    if (value) {
      this._recommendedUnits = _.cloneDeep(value);
    }
  }

  set observables(_obs: Array<{observableId: number, unitId: number | null, timeIntervalId: number | null, comment: string}>) {
    this._observables = [..._obs];
  }
  // #endregion Setters

}