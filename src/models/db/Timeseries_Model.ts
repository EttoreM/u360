import type { Timeseries } from "../../types/db/Timeseries";

export class Timeseries_Model implements Timeseries {

    private _id                : number;
    private _observed_property : string;
    private _comment           : string | null;
    private _unit              : string;
    private _time_interval     : string;
    private _cumulative        : boolean;
    private _visibility        : number;
    private _from_sensor       : number;
  
    constructor(_timeseries : Timeseries) {
      this._id                = _timeseries.id;
      this._observed_property = _timeseries.observed_property;
      this._comment           = _timeseries.comment;
      this._unit              = _timeseries.unit;
      this._time_interval     = _timeseries.time_interval;
      this._cumulative        = _timeseries.cumulative;
      this._visibility        = _timeseries.visibility;
      this._from_sensor       = _timeseries.from_sensor;
    }

    get id() {
      return this._id;
    }

    get observed_property() {
      return this._observed_property;
    }

    get comment() {
      return this._comment;
    }

    get unit() {
      return this._unit;
    }

    get time_interval() {
      return this._time_interval;
    }

    get cumulative() {
      return this._cumulative;
    }

    get visibility() {
      return this._visibility;
    }

    get from_sensor() {
      return this._from_sensor;
    }
    
}