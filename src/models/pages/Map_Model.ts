export default class Map_Model {

  #center:    [number, number] = [-2.24215, 53.473435];
  #zoom:      number = 11;
  #apiKey:    string = 'pk.eyJ1IjoiZXR0b3JlbXVyYWJpdG8iLCJhIjoiY2t5MWphbWV6MDczbDJubGpkM2V5MzVucSJ9.dii_8lbgqJqSOILZEPSyrQ';
  #style:     string = `mapbox://styles/ettoremurabito/cky4yo7nj5s2f15pcivxqchw2`;
  #maxPitch:  number = 60;
  #container: string = 'mapContainer'; // This is the id that a div needs to have to display the map

  get Center() {
    return this.#center;
  }

  set Center(center: [number, number]) {
    this.#center = center
  }

  get Zoom() {
    return this.#zoom;
  }

  set Zoom(zoom: number) {
    this.#zoom = zoom;
  }

  get ApiKey() {
    return this.#apiKey;
  }

  set ApiKey(apiKey: string) {
    this.#apiKey = apiKey;
  }

  get Style() {
    return this.#style;
  }

  set Style(style: string) {
    this.#style = style;
  }

  get MaxPitch() {
    return this.#maxPitch;
  }

  set MaxPitch(maxPitch: number) {
    this.#maxPitch = maxPitch;
  }

  get Container() {
    return this.#container;
  }

  set Container(container: string) {
    this.#container = container;
  }

}