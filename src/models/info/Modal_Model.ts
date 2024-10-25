import      { mdiAlert, 
              mdiAlertOctagon, 
              mdiCheckCircle, 
              mdiInformation } from '@mdi/js';
import      { ModalEnum }      from "../../types/info/Modal";
import type { Modal_Type }     from "../../types/info/Modal";


export class Modal_Model {

  // #region Private Properties
  private static _instance : Modal_Model;
  private _type            : ModalEnum;
  private _style           : Modal_Type;
  private _title           : string;
  private _message         : string;
  private _options         : {[option: string]: Modal_Type} = 
  {
    [ModalEnum.Error]: {
      color: 'text-red-600',
      icon: mdiAlertOctagon
    },
    [ModalEnum.Warning]: {
      color: 'text-orange-600',
      icon: mdiAlert
    },
    [ModalEnum.Success]: {
      color: 'text-green-600',
      icon: mdiCheckCircle
    },
    [ModalEnum.Info]: {
      color: 'text-blue-600',
      icon: mdiInformation
    },
    [ModalEnum.Default]: {
      color: 'text-neutral-600',
      icon: ''
    }
  }
  // #endregion Private Properties

  
  // #region Constructor
  private constructor(_type : ModalEnum = ModalEnum.Default, _title: string = '', _message : string = '') 
  {
    this._type    = _type;
    this._style   = this._options[this._type];
    this._title   = _title;
    this._message = _message;
  }
  // #endregion Constructor


  // #region Getters
  get type() : ModalEnum
  {
    return this._type;
  }

  get style() : Modal_Type
  {
    return this._style;
  }

  get title() : string
  {
    return this._title;
  }

  get message() : string
  {
    return this._message;
  }
  // #endregion Getters


  // #region Setters
  set type(_type : ModalEnum)
  {
    this._type = _type;
    this._style = this._options[this._type];
  }

  set title(_title : string) 
  {
    this._title = _title;
  }

  set message(_message : string)
  {
    this._message = _message;
  }
  // #endregion Setters


  // Public static method to get the (single) instance of the class
  static GetInstance() : Modal_Model {
    if (!Modal_Model._instance) {
      Modal_Model._instance = new Modal_Model();
    }
    return Modal_Model._instance;
  }

}

