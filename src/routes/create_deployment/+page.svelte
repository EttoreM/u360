<script lang="ts">

  import type { Deployment }                 from '../../types/db/Deployment';
  import       Modal                         from "$lib/components/Modal.svelte";
  import      { CreateDeployment_ViewModel } from '../../viewModels/pages/CreateDeployment_ViewModel';
  import      { ModalEnum }            from "../../types/info/Modal";

  const ViewModel = new CreateDeployment_ViewModel();
 
  let newDeployment : Deployment = ViewModel.ReturnDefaultDeployment(); 
  let created = false;
  let failed = false;
  let start_date = '';
  let visibility : number;
  let isUrlValidOrNull = true;

  $: newDeployment.name = newDeployment.label.trim().replaceAll(' ', '_').toLowerCase();
  $: newDeployment.start_date = new Date(start_date);
  $: newDeployment.visibility = Number(visibility);

  async function create_deployment() {
    newDeployment.external_url = newDeployment.external_url == '' ? null : newDeployment.external_url;
    ViewModel.setDeployment(newDeployment);
    const result = await ViewModel.PostDeployment();
    
    if (result.status === 201) {
      created = true;
      ViewModel.ShowModal({type: ModalEnum.Success, title: "Deployment created", message: `The deployment "${newDeployment.name}" has been successfully created`});
    }
    else {
      failed = true;
      ViewModel.ShowModal({type: ModalEnum.Error, title: "Unable to create deployment", message: `${result.message} ${result.status}.`});
    }
  }

  function isValidHttpUrl() { 
    if (newDeployment.external_url != null && newDeployment.external_url != ""){   
      newDeployment.external_url?.trim();       
      try {
        new URL(newDeployment.external_url);
        isUrlValidOrNull = true; 
      } catch (_) {
        isUrlValidOrNull = false;  
      }
    }
    else {
      isUrlValidOrNull = true;
    }
  }

  function ResetCreationStatus() {
    created = false;
    failed = false;
  }

  function ClearFields(){
    newDeployment = ViewModel.ReturnDefaultDeployment();
    start_date = '';
    isUrlValidOrNull = true;
    visibility = 0;
    ResetCreationStatus();
  }

</script>


<div class="bg-neutral h-full w-full p-12">

  <div class="card lg:card-side h-fit shadow-md bg-neutral-100 text-neutral-500 border-primary mx-auto min-w-96 max-w-4xl">

    <div class="card-body max-lg:hidden">
      <p class="title my-4 items-start text-4xl">Create a new deployment</p>
    </div>

    <div class="card-body items-center lg:w-2/3">

      <p class="title mb-4 lg:hidden items-start text-4xl">Create a new deployment</p>
      
        <label class="form-control w-full">
          <div class="label label-text text-neutral-500">Name *</div>
          <input id="label" name="label" class="input input-bordered" type="text" bind:value={newDeployment.label} on:change={ResetCreationStatus} />
        </label>

        <!-- This input element is hidden -->
        <input id="name" name="name" type="text"value={newDeployment.name} class="grow hidden">
    
        <label class="form-control w-full">
          <div class="label label-text text-neutral-500">Description *</div>
          <textarea id="description" name="description" class="textarea textarea-bordered flex grow w-full text-base" bind:value={newDeployment.description} on:change={ResetCreationStatus} />
        </label>

        <label class="form-control w-full">
          <div class="label label-text text-neutral-500">Start date *</div>
          <input id="start_date" name="start_date" type="datetime-local" class="input input-bordered" bind:value={start_date} on:change={ResetCreationStatus} />
        </label>

        <label class="form-control w-full">
          <div class="label label-text text-neutral-500">Project link (url)</div>
          <input id="external_url" name="external_url" class="input input-bordered {isUrlValidOrNull ? '' : 'bg-red-100'}" type="url" bind:value={newDeployment.external_url} on:change={ResetCreationStatus} on:input={isValidHttpUrl} />
        </label>

        <label class="form-control w-full">
          <div class="label label-text text-neutral-500">Select who can see it *</div>
          <select class="select input-bordered text-base" id="visibility" name="visibility" bind:value={visibility} on:change={ResetCreationStatus}>
            <option value=0>Everyone</option>
            <option value=1>Only superusers</option>
            <option value=2>Only you</option>
            <option value=3>Website administrator</option>
          </select>
        </label>

        <div class="card-actions">
          <button class="btn mt-12 w-32 bg-accent" on:click={create_deployment}>Create</button>
          <button class="btn mt-12 w-32" on:click={ClearFields}>Clear</button>
        </div>

    </div>
  </div>

  <Modal />

</div>
