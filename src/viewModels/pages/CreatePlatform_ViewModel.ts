import        axios                  from "axios";
import      { get }                  from "svelte/store";
import      { writable }             from "svelte/store";
import      { CreatePlatform_Model } from "../../models/pages/CreatePlatform_Model";
import      { Modal_ViewModel }      from "../info/Modal_ViewModel";
import      { ModalEnum }            from "../../types/info/Modal";
import type { Observable }           from "../../types/db/Observable";
import type { RecommendedUnit }      from "../../types/db/RecommendedUnit";
import type { Unit }                 from "../../types/db/Unit";
import type { Writable }             from "svelte/store";



export class CreatePlatform_ViewModel {

  // #region Private Properties
  private _model : Writable<CreatePlatform_Model>;
  // #endregion Private Properties


  // #region Constructor
  constructor() 
  {
    this._model = writable(new CreatePlatform_Model());
  }
  // #endregion Constructor


  // #region Getters
  get model(): Writable<CreatePlatform_Model>
  {
    return this._model;
  }
  // #endregion Getters


  // #region Public Methods
  FilterTypicalObservablesForPlatformTypeSelected(
    _selectedPlatformType : number, 
    _allObservables       : Array<Observable>, 
    _allTypicalObservable : [{platform_type : number; observable : number;}]
  ) 
  {
    const FilteredTypicalObservablesIds = _allTypicalObservable
    .filter((item) => item.platform_type == _selectedPlatformType)
    .map(item => item.observable);
    console.log(FilteredTypicalObservablesIds);
    const TypicalObservables = _allObservables.filter(item => FilteredTypicalObservablesIds.includes(item.id));
    this._model.update(currentModel => {
      currentModel.typicalObservables = [...TypicalObservables];
      return currentModel;
    })
    
  }

  SetSelectedObservables(_observableId : number) 
  {
    let model = get(this._model);
    if (model.observables.some(o => o.observableId == _observableId)) {
      model.observables = model.observables.filter(v => v.observableId != _observableId);
    } else {
      if (model.observables.length > 0) {
        model.observables = [...model.observables, {observableId: _observableId, unitId: null, timeIntervalId: null, comment: ''}];
      } else {
        model.observables = [{observableId: _observableId, unitId: null, timeIntervalId: null, comment: ''}];
      }
    }
    this._model.update((currentModel) => {
      currentModel = model;
      return currentModel;
    });
 
  }

  SetRecommendedUnitsForObservableId(_observableId : number, _allRecommendedUnits : Array<RecommendedUnit>, _units : Array<Unit>) 
  {
    const recommendedUnitsIdsForThisObservable = _allRecommendedUnits
    .filter(ru => ru.observable == _observableId)
    .map(item => item.unit);
    const recommendedUnitsForThisObservable = _units.filter(u => recommendedUnitsIdsForThisObservable.includes(u.id));

    let model = get(this._model);
    
    if (!(_observableId in model.recommendedUnits)) {
      model.recommendedUnits[_observableId] = [...recommendedUnitsForThisObservable];
    }

    this._model.update((currentModel) => {
      currentModel.recommendedUnits = model.recommendedUnits;
      return currentModel;
    });
  }
  

  SetSelectedUnitForObservableId(_observableId : number, _unitId: number) 
  {
    let model = get(this._model);
    model.observables.forEach(o => {
      if (o.observableId == _observableId) {
        o.unitId = _unitId;
      }
    });
    this._model.update((currentModel) => {
      currentModel.observables = model.observables;
      return currentModel;
    });
  }

  SetSelectedTimeIntervalForObservableId(_observableId : number, _timeIntervalId: number) 
  {
    let model = get(this._model);
    model.observables.forEach(o => {
      if (o.observableId == _observableId) {
        o.timeIntervalId = _timeIntervalId;
      }
    });
    this._model.update((currentModel) => {
      currentModel.observables = model.observables;
      return currentModel;
    });
  }

  SetCommentForObservableId(_observableId: number, _comment: string) {
    let model = get(this._model);
    model.observables.forEach(o => {
      if (o.observableId == _observableId) {
        o.comment = _comment;
      }
    });
    this._model.update((currentModel) => {
      currentModel.observables = model.observables;
      return currentModel;
    });
  }

  ResetSelectedObservables() {
    this._model.update(model => {
      model.observables = [];
      return model;
    });
  }

  ResetRecommendedUnitsForObservableId() {
    this._model.update(model => {
      model.recommendedUnits = {};
      return model;
    })
  }

  ResetSelectedUnits() {
    this._model.update(model => {
      return model;
    })
  }

  ResetModel() {
    this.model.update((currentModel) => {
      currentModel = new CreatePlatform_Model();
      return currentModel;
    })
  }


  IsInfoComplete(model: CreatePlatform_Model) {
    console.log(`checking for completness`);
    console.log(model);
    return (
      model.platform?.name != null && model.platform.name.trim() != '' &&
      model.platform?.description != null && model.platform?.description.trim() != '' &&
      model.platform?.type != null &&
      model.platform?.visibility != null &&
      model.deploymentId != null && 
      model.geolocation.lat != null &&
      model.geolocation.lon != null &&
      model.observables.length != 0 &&
      !model.observables.some(o => o.unitId == null) &&
      !model.observables.some(o => o.timeIntervalId == null)
   )
  }

  async PostPlatform() 
  { 
    const model = get(this.model);
    if (!this.IsInfoComplete(model))
    {
			this.ShowModal({
				type: ModalEnum.Warning,
				title: `Incomplete information`,
				message: `Please, enter all the required information (required fields are marked with *)`
			});
			return;
		}

    const platform = model.platform;
    const geolocation = model.geolocation;
    const deploymentId = model.deploymentId;
    const observables = model.observables;

    const data = {platform, geolocation, observables, deploymentId};
    console.log(data);

    try {
      let response = await axios({
        method: 'post',
        url: 'https://localhost:7168/api/platformsavechain',
        data
      });
      console.log(response.data);
      this.ShowModal({
        type: ModalEnum.Success, 
        title: `Platform created`, 
        message: `The platform "${model.platform?.name}" has been successfully created.`
      });
    }
    catch (e: any) {
      this.ShowModal({
        type: ModalEnum.Error, 
        title: `Unable to create platform`, 
        message: `${e.message}.`
      });
    }
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
  // #endregion Public Methods


  // #region Private Methods
  SetInitialUnitForObservable(_observableId : number) 
  {
    const model = get(this.model);
    this._model.update((currentModel) => {
      return currentModel;
    });
    console.log(this._model);
  }
  // #endregion Private Methods

}