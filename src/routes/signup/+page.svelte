<script lang="ts">
  import type { PageData } from './$types';
  import { SignUp_ViewModel } from '$viewmodels/pages/SignUp_ViewModel';

  export let data: PageData;

  const ViewModel = new SignUp_ViewModel();
  let model = ViewModel.model;

</script>


<div class="w-full">

  <label class="form-control w-full" for="firstName">
    <div class="label label-text text-neutral-500">First Name *</div>
    <input 
      bind:value={$model.user.first_name}
      id="firstName" 
      type="text" 
      name="firstName"
      class="input input-bordered {$model.isFirstNameEmpty ? 'border-2 border-red-600' : ''}"
      required 
    />
  </label>

  <label class="form-control w-full" for="lastName">
    <div class="label label-text text-neutral-500">Last Name *</div>
    <input 
      bind:value={$model.user.last_name} 
      id= "lastName" 
      type="text" 
      name="lastName"
      class="input input-bordered {$model.isLastNameEmpty ? 'border-2 border-red-600' : ''}"
      required
    />
  </label>

  <label class="form-control w-full" for="email">
    <div class="label label-text text-neutral-500">Email *</div>
    <input 
      bind:value={$model.user.email} 
      id="email" 
      type="email" 
      name="email"
      class="input input-bordered {$model.isEmailDomainWrong ? 'border-2 border-red-600' : ''}"
      required 
    />
  </label>

  <label class="form-control w-full" for="password">
    <div class="label label-text text-neutral-500">Password *</div>
    <input 
      bind:value={$model.user.password}
      class="input input-bordered {$model.isPasswordWeak ? 'border-2 border-red-600' : ''}"
      class:fieldError={$model.weakPassword}
      id="password" 
      type="password" 
      name="password" 
      required 
    />
  </label>

  <label class="form-control w-full" for="intitution">
    <div class="label label-text text-neutral-500">Institution *</div>
    <select 
      bind:value={$model.user.institution}
      class="flex select input-bordered max-w-1/5 min-w-22 m-1 text-base  {$model.isInstitutionInvalid ? 'border-2 border-red-600' : ''}"
      id="institution" 
      name="institution" 
      required 
    >
      {#each data?.institutions as institution}
      <option value={institution.id}>{institution.label}</option>
      {/each}
    </select>
  </label>

  <div class="mt-2">
    {#if $model.error}
    {#each $model.message as m}
    <p class="text-sm text-red-500">{m}</p>
    {/each}
    {/if}
  </div>
  
  <div>
    <button class="btn mt-12 w-full bg-accent" on:click={e => ViewModel.RegisterUser(data)}>Sign up</button>
  </div>

</div>