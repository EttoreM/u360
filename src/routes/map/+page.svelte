<script lang="ts">
  import  mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { onMount, onDestroy } from 'svelte';
  import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';

  let map: mapboxgl.Map;
  let mapContainer: HTMLElement;

  let lng  : number = -2.24215;
  let lat  : number = 53.473435;
  let zoom : number = 11;

  onMount(() => {
    const initialState = { lng, lat, zoom };

    map = new mapboxgl.Map({
      container: mapContainer,
      accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: `mapbox://styles/ettoremurabito/cky4yo7nj5s2f15pcivxqchw2`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  });

  onDestroy(() => {
    if (map) map.remove();
  });
</script>

<div class="bg-neutral h-screen w-full">
<div class="map-wrap relative w-full h-full">
  <div class="map" bind:this={mapContainer}></div>
</div>
</div>

<style>
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>