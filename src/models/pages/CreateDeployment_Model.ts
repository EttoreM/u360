import      { Deployment_Model } from "../db/Deployment_Model";
import type { Deployment } from "../../types/db/Deployment";
import type { AxiosResponse }   from "axios";


export class CreateDeployment_Model {

  private _response   : AxiosResponse  | null = null;
  private _deployment : Deployment_Model | null = null;

  constructor(_res: AxiosResponse | null = null, _dep : Deployment_Model | null = null ) {
    if (_res) {
      this._response = _res;
    }
    if (_dep) {
      this._deployment = _dep;
    }
  }

  get deployment() : Deployment_Model | null {
    return this._deployment;
  }

  get response() : AxiosResponse | null {
    return this._response;
  }

  set deployment(value : Deployment) {
    this._deployment = new Deployment_Model(value);
  }

  set response(value : AxiosResponse) {
    this._response = value;
  }

}