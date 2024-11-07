<script lang="ts">
  import      { onMount, onDestroy } from 'svelte';
  import        Map_ViewModel        from '$viewmodels/components/Map_ViewModel';
  import type { PageData }           from './$types';

  export let data : PageData;

  let mapViewModel: Map_ViewModel;
	let mapIsIdle: Boolean = true;

  // $: unsubscribe = PlatformSelectorModel.subscribe((value) => {
	// 	const visiblePlatforms = data.currentPlatforms.filter((p) => {
	// 		let ok = false;
	// 		for (const key in value) {
	// 			if (p.platform.disciplines[0] == key && value[key].visible) {
	// 				ok = true;
	// 				break;
	// 			}
	// 		}
	// 		return ok;
	// 	});
	// 	const platformLayerModel = new PlatformLayerModel(visiblePlatforms);
	// 	platformLayerModel.buildSource(visiblePlatforms);
	// 	if (mapViewModel && mapViewModel.map.isStyleLoaded()) {
	// 		platformLayerModel.addLayers();
	// 	}
	// });

  onMount(() => {
		// Initialising the map and adding it to its html container.
		mapViewModel = Map_ViewModel.Instance;
		mapViewModel.initMap('mapContainer');

		// Define the case when the loading wheel should appear on the map.
		mapViewModel.map.on('sourcedata', (e) => {
			if (e.isSourceLoaded) mapIsIdle = false;
		});
		mapViewModel.map.on('idle', () => {
			mapIsIdle = true;
		});

		// Initialising the model for the layers that will be displayed on the map.
		// const platformLayerModel = new PlatformLayerModel(data.currentPlatforms);

		// Add the layers to the map
		// mapViewModel.map.on('style.load', () => platformLayerModel.addLayers());
	});

	onDestroy(() => {
		// unsubscribe();
	});


  // let map: mapboxgl.Map;
  // let mapContainer: HTMLElement;

  // let lng  : number = -2.24215;
  // let lat  : number = 53.473435;
  // let zoom : number = 11;

  // onMount(() => {
  //   const initialState = { lng, lat, zoom };

  //   map = new mapboxgl.Map({
  //     container: mapContainer,
  //     accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
  //     style: `mapbox://styles/ettoremurabito/cky4yo7nj5s2f15pcivxqchw2`,
  //     center: [initialState.lng, initialState.lat],
  //     zoom: initialState.zoom
  //   });
  // });

  // onDestroy(() => {
  //   if (map) map.remove();
  // });
</script>


<div class="map-wrap relative w-full h-full">
  <div class="w-full h-full" id="mapContainer"></div>
</div>
