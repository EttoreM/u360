import Map_Model  from '../../models/components/Map_Model';
import mapboxgl  from 'mapbox-gl';
import * as turf from '@turf/turf';
import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';

import type { Location } from '../../types/db/Location';
import type { Platform } from '../../types/db/Platform';

const markerIcons: Record<string, string> = {
	air:            './src/lib/assets/imgs/markers/air.png',
	air_quality:    './src/lib/assets/imgs/markers/air_quality.png',
	hydrology:      './src/lib/assets/imgs/markers/hydrology.png',
	weather:        './src/lib/assets/imgs/markers/weather.png',
	car_park:       './src/lib/assets/imgs/markers/parking.png',
	traffic_camera: './src/lib/assets/imgs/markers/traffic_camera.png',
	default:        './src/lib/assets/imgs/markers/general.png',
	user_location:  './src/lib/assets/imgs/markers/user_location.png'
};


/**
 * A singleton class defining the ViewModel of the Map
 */
export default class Map_ViewModel {


	//#region Private properties
	static  _instance :  Map_ViewModel;
	private _map      !: mapboxgl.Map;
	private _mapModel !: Map_Model;
	//#endregion Private properties


	//#region constructor
	constructor() {}
	//#endregion constructor

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

	//#region Public methods
	initMap(_container: string) {

		// Delete a possible pre-existing map.
		this.deleteMap();

		// Instantriate the map model.
		this._mapModel = new Map_Model();

		// Create map
		const map = new mapboxgl.Map({
			container: _container,
			accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
			style: this._mapModel.Style,
			center: this._mapModel.Center,
			zoom: this._mapModel.Zoom,
			maxPitch: this._mapModel.MaxPitch,
      attributionControl: this._mapModel.AttributionControl
		});

		// Load and add to the map the images to be used as markers.
		Object.keys(markerIcons).forEach((key) => {
			map.loadImage(markerIcons[key], (error, image) => {
				if (error) throw error;
				this._map.addImage(key, image as HTMLImageElement | ImageBitmap);
			});

			// Show popup when cliking on a marker.
			map.on('click', 'individual-markers', (e): void => {
				if (e.features && e.features.length > 0) {
					if (e.features[0].geometry.type !== 'GeometryCollection') {
						const coordinates = e.features[0].geometry.coordinates.slice();

						// Zoom on the marker when the user clicks on it.
						map.flyTo({
							center: coordinates as mapboxgl.LngLatLike,
							zoom: 16,
							essential: true // This animation is not interrupted by other animations
						});

            
						if (e.features[0].properties) {
							const label = `
            <div style="color: grey; font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;">
              <p><strong>Platform:</strong></p>
              <p>${e.features[0].properties.label}</p>
              <hr class="m-1" />
              <p><strong>Current Deployment(s)</strong>:</p>
              <ul>
                <li>${e.features[0].properties.deployment}</li>
              </ul>
            </div>`;

							new mapboxgl.Popup()
								.setLngLat(coordinates as mapboxgl.LngLatLike)
								.setHTML(label)
								.addTo(map);
						}
					}
				}
			});

      // Define the aspect of the cursor when hovering on individual markers. 
			map.on('mouseenter', 'individual-markers', function () {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'individual-markers', function () {
				map.getCanvas().style.cursor = '';
			});
		});	

		this._map = map;
		this.#addMouseHoverEffectForClusters();
	}


	deleteMap() {
		if (this._map) {
			this._map.remove();
		}
	}


	get map() {
		return this._map;
	}

	get mapModel() {
		return this._mapModel;
	}

	//#endregion Public methods

	
	//#region Private methods
	#addMouseHoverEffectForClusters() {
		this._map.on('style.load', () => {
			let hoveredFeatureId: number | string | null | undefined = null;

			this._map.on('mousemove', 'clusters', (e) => {
				if (e.features !== undefined && e.features.length > 0) {
					if (hoveredFeatureId) {
						this._map.setFeatureState(
							{ source: 'source_id', id: hoveredFeatureId },
							{ hover: false }
						);
					}
					hoveredFeatureId = e.features[0].id;
					this._map.setFeatureState({ source: 'source_id', id: hoveredFeatureId }, { hover: true });
				}
			});

			this._map.on('mouseleave', 'clusters', () => {
				if (hoveredFeatureId) {
					this._map.setFeatureState(
						{ source: 'source_id', id: hoveredFeatureId },
						{ hover: false }
					);
				}
				hoveredFeatureId = null;
			});
		});
	}
	//#endregion Private methods


	//#region Public methods

	toggleUserLocationMarker(position: GeolocationPosition) {
		if (this._map.getLayer("userLocation")) {
			this.removeUserLocationMarker();
			return;
		}
		
		this.addUserLocationMarker(position);
	}


	removeUserLocationMarker() {
		if (this._map.getLayer("userLocation")) {
			this._map.removeLayer("userLocation");
		}
		if (this._map.getSource('userLocation')) {
			this._map.removeSource('userLocation');
		}
		if (this._map.getLayer("userLocationAccuracy")) {
			this._map.removeLayer("userLocationAccuracy");
		}
		if (this._map.getSource('userLocationAccuracy')) {
			this._map.removeSource('userLocationAccuracy');
		}
	}


	addUserLocationMarker(position: GeolocationPosition) {

		if (this._map.getLayer("userLocation")) {
			this.removeUserLocationMarker();
		}

		const circle = turf.circle([position.coords.longitude, position.coords.latitude], position.coords.accuracy / 1000, {
			steps: 100,
			units: 'kilometers'
		});


		// Add the circle to the map
		this._map.addSource('userLocationAccuracy', {
			'type': 'geojson',
			'data': circle
		});

		this._map.addLayer({
			'id': 'userLocationAccuracy',
			'type': 'fill',
			'source': 'userLocationAccuracy',
			'paint': {
				'fill-color': '#1DA1F2',
				'fill-opacity': 0.2
			}
		});

		this._map.addSource('userLocation', {
			type: 'geojson',
			data: {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [position.coords.longitude, position.coords.latitude]
				},
				properties: {

				}
			}
		});
	
		// Add a layer to display the source as a circle with a radius equal to the accuracy
		this._map.addLayer({
			id: 'userLocation',
			type: 'symbol',
			source: 'userLocation',
			layout: {
				"icon-image": 'user_location',
				'icon-size': 0.32
			}
		});

		// Get the bounding box of the circle
		const bbox = turf.bbox(circle);

		// Convert the bounding box to a LatLngBounds object
		const bounds = new mapboxgl.LngLatBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]);
	
		// Fit the map to the bounds
		this._map.fitBounds(bounds, { padding: 10, duration: 500 });
	}





  GetPlatformsLocationsJoin(
    _platforms: Array<Platform>, 
    _locations: Array<Location>, 
    platformHasLocation: Array<{platform_id: number, location_id: number}>
  ) {
    console.log(_platforms);
    console.log(_locations);
    console.log(platformHasLocation)
  }
	//#endregion Public methods
}
