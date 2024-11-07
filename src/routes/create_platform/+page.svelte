<script lang="ts">
  import      { CreatePlatform_ViewModel } from '../../viewModels/pages/CreatePlatform_ViewModel';
  import       Modal                       from '$lib/components/Modal.svelte';
  import type { PageData }                 from './$types';
  import type { Platform }                 from '../../types/db/Platform';

	export let data: PageData;

  const ViewModel = new CreatePlatform_ViewModel();

  const defaultPlatform : Platform = {
    id: undefined,
    name  : '',
    label : '',
    description: null,
    type: 0,
    is_static: true, 
    visibility: 0
  };
  
  let newPlatform  : Platform = {...defaultPlatform};
  let visibility   : number;
  let deploymentId : number | null = null;
  let latitude     : number | null = null;
  let longitude    : number | null = null;
  let geolocation  : {lon: number | null, lat: number | null} = {lon: null, lat: null};

  $: newPlatform = {
    ...newPlatform,
    name: newPlatform?.label.trim().replaceAll(' ', '_').toLowerCase()
  };
  
  $: newPlatform = {
    ...newPlatform,
    visibility: Number(visibility)
  };

  $: ViewModel.model.update(model => {
    model.platform = {...newPlatform}
    return model;
  });

  $: ViewModel.model.update(model => {
    model.deploymentId = deploymentId
    return model;
  });

  $: geolocation = {lon: longitude == null ? null : Number(longitude), lat: latitude == null ? null : Number(latitude)};

  $: ViewModel.model.update(model => {
    model.geolocation = geolocation;
    return model;
  })
  
  let model = ViewModel.model;

  async function create_platform() {
    await ViewModel.PostPlatform();   
  }

  function ResetPlatform() {
    newPlatform = {...defaultPlatform};
  }  

  function ClearFields() {

    // Reset the local variables
    ResetPlatform();
    visibility = 0;
    longitude = null;
    latitude = null;
    deploymentId = null;

    // Reset the model exposed by the viewmodel
    ViewModel.ResetModel();
  }

  function FilterObservablesForPlatformType() {
    ViewModel.ResetSelectedObservables();
    ViewModel.ResetRecommendedUnitsForObservableId();
    ViewModel.ResetSelectedUnits();
    ViewModel.FilterTypicalObservablesForPlatformTypeSelected(newPlatform.type, data.observables, data.platform_types_typical_observables);
  }

  function toggleObservable(value: number) {
    ViewModel.SetRecommendedUnitsForObservableId(value, data.recommended_units, data.units);
    ViewModel.SetSelectedObservables(value);
  }

  function SelectUnit(_event: Event, _observableId: number) {
    const selectElement = _event.target as HTMLSelectElement;
    const unitId = Number(selectElement.value);
    ViewModel.SetSelectedUnitForObservableId(_observableId, unitId);
  }

  function SelectFrequency(_event: Event, _observableId: number) {
    const selectElement = _event.target as HTMLSelectElement;
    const timeIntervalId = Number(selectElement.value);
    ViewModel.SetSelectedTimeIntervalForObservableId(_observableId, timeIntervalId);
  }

  function SetComment(_event: Event, _observableId: number) {
    const textElement = _event.target as HTMLSelectElement;
    const comment = textElement.value;
    ViewModel.SetCommentForObservableId(_observableId, comment);
  }

</script>


<!-- Name input field -->
<label class="form-control w-full">
  <div class="label label-text text-neutral-500">Name *</div>
  <input
    class="input input-bordered" 
    type="text"
    placeholder="Max 15 chars"
    maxlength="15"
    bind:value={newPlatform.label} 
  />
</label>


<!-- This input element is hidden -->
<input id="name" name="name" type="text"value={newPlatform.name} class="grow hidden" />


<!-- Description input field -->
<label class="form-control w-full">
  <div class="label label-text text-neutral-500">Description *</div>
  <textarea 
    class="textarea textarea-bordered flex grow w-full" 
    bind:value={newPlatform.description} 
  />
</label>


<!-- Deployment select element -->
<label class="form-control w-full">
  <div class="label label-text text-neutral-500">Part of deployment... *</div>
  {#if data}
  <select 
    class="select input-bordered text-base" 
    bind:value={deploymentId}
  >
    {#each data.deployments as d}
    <option value={d.id}>{d.label}</option>
    {/each}
  </select>
  {:else}
  <p>Error fetching data. Please try again later.</p>
  {/if}
</label>


<!-- Platform type select element -->
<label class="form-control w-full">
  <div class="label label-text text-neutral-500">Platform type *</div>
  {#if data}
  <select 
    class="select input-bordered text-base" 
    bind:value={newPlatform.type} 
    on:change={FilterObservablesForPlatformType}
  >
    {#each data.platforms_types as p}
    <option value={p.id}>{p.label}</option>
    {/each}
  </select>
  {:else}
  <p>Error fetching data. Please try again later.</p> <!-- Handle any errors or null data -->
  {/if}
</label>


<!-- Set of selectable typical observable for the platform type -->
{#if $model.typicalObservables && $model.typicalObservables.length != 0}
  <label class="form-control w-full">
    <div class="label label-text text-neutral-500">Select the observables that the platform reads *</div>      
    <div class="flex flex-grow text-sm flex-wrap" >
      {#each $model.typicalObservables as o, index}
      <label class="flex items-center bg-neutral-200  rounded-lg px-2 py-1 w-fit m-1">
        <input
          value={o.id}
          type="checkbox"
          class="mr-2"
          id={index.toString()}
          on:change={() => toggleObservable(o.id)}
          checked={$model.observables.filter(obs => obs.observableId == o.id).length > 0}
        />
        <div class="tooltip hover:tooltip-open tooltip-primary tooltip-" data-tip={o.description}>
          {o.label}
        </div>
      </label>
      {/each}
    </div>
  </label>
{/if}


<!-- List of selected observable -->
{#if $model.observables && $model.observables.length > 0}
<label class="form-control w-full rounded-lg p-2 bg-neutral-200">
  <div class="label label-text text-neutral-500">The platform reads the following observables</div>
  {#each $model.observables as so}
  <div class="flex items-center my-1 w-full">
    <div class="flex flex-grow-0 items-center my-1 w-20">
      <div class="text-sm mx-2">{$model.typicalObservables.filter(to => to.id == so.observableId)[0].label}</div>
    </div>
    <div class="flex items-center flex-wrap flex-grow">
      <input 
        type="text" 
        class="input input-sm input-bordered m-1 text-sm flex flex-grow w-2/5" 
        placeholder="Comment (optional)"
        on:change={(event) => SetComment(event, so.observableId)}
      />

      <!-- Select element for the observable unit -->
      <select 
        class="flex select select-sm input-bordered max-w-1/5 min-w-22 m-1 text-sm" 
        on:change={(event) => SelectUnit(event, so.observableId)}
      >
        <option value="-1" disabled selected>Unit *</option>
        {#each $model.recommendedUnits[so.observableId] as ru}
        <option value={ru.id}>{ru.symbol}</option>
        {/each}
      </select>

      <!-- Select element for the observable frequency -->
      <select 
        class="flex select select-sm input-bordered max-w-1/5 min-w-22 m-1 text-sm" 
        on:change={(event) => SelectFrequency(event, so.observableId)}
      >
        <option value="-1" disabled selected>Freq *</option>
        {#each data.time_intervals as ti}
        <option value={ti.id}>{ti.symbol}</option>
        {/each}
      </select>

    </div>
  </div>
  {/each}
</label>
{/if}


<!-- Location input elements -->
<label class="w-full">
  <div class="label label-text text-neutral-500">Geolocaion *</div>
  <div class="w-full flex gap-4 items-stretch">
    <input 
      type="text"
      class="input input-bordered flex-grow" 
      placeholder="Latitude (decimal)"
      bind:value={latitude}
    />
    <input
      type="text"
      class="input input-bordered flex-grow" 
      placeholder="Longitude (decimal)"
      bind:value={longitude}
    />
  </div>
</label>


<!-- Visibility select element -->
<label class="form-control w-full">
  <div class="label label-text text-neutral-500">Select who can see it *</div>
  <select 
    class="select input-bordered text-base" 
    bind:value={visibility}
  >
    <option value=0>Everyone</option>
    <option value=1>Only superusers</option>
    <option value=2>Only you</option>
    <option value=3>Website administrator</option>
  </select>
</label>

<!-- Button area -->
<div class="card-actions">
  <button class="btn mt-12 w-32 bg-accent" on:click={create_platform}>Create</button>
  <button class="btn mt-12 w-32" on:click={ClearFields}>Clear</button>
</div>

<Modal />