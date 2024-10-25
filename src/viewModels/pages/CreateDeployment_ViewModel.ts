import { CreateDeployment_Model } from "../../models/pages/CreateDeployment_Model";
import { Deployment_Model } from "../../models/db/Deployment_Model";
import      { Modal_ViewModel }      from "../info/Modal_ViewModel";
import      { ModalEnum }            from "../../types/info/Modal";
import axios from "axios";
import type { Deployment } from "../../types/db/Deployment";

export class CreateDeployment_ViewModel {

  private _model : CreateDeployment_Model;

  constructor() {
    this._model = new CreateDeployment_Model();
  }

  get model() {
    return this._model;
  }

  setDeployment(value : Deployment) {
    this._model.deployment = new Deployment_Model(value);
  }


  // Post deployment
  async PostDeployment() {
  
    try{
      let response = await axios({
        method: 'post',
        url: 'https://localhost:7168/api/deployments',
        data: {
          name: this._model.deployment?.name,
          label: this._model.deployment?.label,
          description: this._model.deployment?.description,
          start_date: this._model.deployment?.start_date,
          external_url: this._model.deployment?.external_url,
          visibility: this._model.deployment?.visibility
        }
      });
      return response;
    }
    catch (e: any) {
      return e;      
    }
  }


  ReturnDefaultDeployment() : Deployment {
    return {
      id: undefined,
      name: '', 
      label: '', 
      description:'', 
      start_date: new Date(), 
      end_date: null, 
      external_url: null, 
      visibility: 0
    };
  }

  ShowModal({type=ModalEnum.Default, title="", message=""}: {type? : ModalEnum, title: string, message: string})
  {
    let ModalViewModel = new Modal_ViewModel();
    ModalViewModel.model.update(cm => {
      cm.type = type;
      cm.title = title;
      cm.message = message;
      return cm;
    });
    ModalViewModel.OpenModal();
  }

}