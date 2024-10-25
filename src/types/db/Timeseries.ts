export type Timeseries = {
  id                : number,
  observed_property : string,
  comment           : string | null,
  unit              : string,
  time_interval     : string,
  cumulative        : boolean,
  visibility        : number,
  from_sensor       : number
}