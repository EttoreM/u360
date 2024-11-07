
import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';


export default class Map_Model {

  private _center:    [number, number] = [-2.24215, 53.473435];
  private _zoom:      number = 11;
  private _apiKey:    string = PUBLIC_MAPBOX_ACCESS_TOKEN;
  private _style:     string = `mapbox://styles/ettoremurabito/cky4yo7nj5s2f15pcivxqchw2`;
  private _maxPitch:  number = 60;
  private _container: string = 'mapContainer'; // This is the id that a div needs to have to display the map
  private _attributionControl : boolean = false;

  get Center() {
    return this._center;
  }

  set Center(center: [number, number]) {
    this._center = center
  }

  get Zoom() {
    return this._zoom;
  }

  set Zoom(zoom: number) {
    this._zoom = zoom;
  }

  get ApiKey() {
    return this._apiKey;
  }

  set ApiKey(apiKey: string) {
    this._apiKey = apiKey;
  }

  get Style() {
    return this._style;
  }

  set Style(style: string) {
    this._style = style;
  }

  get MaxPitch() {
    return this._maxPitch;
  }

  set MaxPitch(maxPitch: number) {
    this._maxPitch = maxPitch;
  }

  get Container() {
    return this._container;
  }

  set Container(container: string) {
    this._container = container;
  }

  get AttributionControl() {
    return this._attributionControl;
  }

  set AttributionControl(value: boolean) {
    this._attributionControl = value;
  }

}