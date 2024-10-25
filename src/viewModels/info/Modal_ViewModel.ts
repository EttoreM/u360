import      { writable }    from 'svelte/store';
import      { Modal_Model } from "$models/info/Modal_Model";
import type { Writable }    from 'svelte/store';


export let isModalOpen : Writable<boolean> = writable(false);


export class Modal_ViewModel {

  // #region Private Properties
  private _model : Writable<Modal_Model>;
  // #endregion Private Properties


  // #region Constructor
  constructor() 
  {
    this._model = writable(Modal_Model.GetInstance());
  }
  // #endregion Constructor


  // #region Getters
  get model() : Writable<Modal_Model>
  {
    return this._model;
  };
  // #endregion Getters


  // #region Public Methods
  OpenModal()
  {
    isModalOpen.set(true);
  }

  CloseModal()
  {
    isModalOpen.set(false);
  }
  // #endregion Public Methods
}


