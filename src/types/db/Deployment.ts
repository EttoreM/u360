export type Deployment = {
  id           : number | undefined,
  name         : string,
  label        : string,
  description  : string,
  start_date   : Date,
  end_date     : Date | null,
  external_url : string | null,
  visibility   : number
}