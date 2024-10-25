export type Platform = {
  id          : number | undefined,
  name        : string,
  label       : string,
  description : string | null,
  type        : number,
  is_static   : boolean,
  visibility  : number
}