<script lang="ts">
  import { Login_ViewModel } from '$viewmodels/pages/Login_ViewModel';

  const ViewModel = new Login_ViewModel();
  let model = ViewModel.model;
</script>


<div class="w-full">

  <label class="form-control w-full" for="email">
    <div class="label label-text text-neutral-500">Email *</div>
    <input 
      bind:value={$model.credentials.email} 
      id="email" 
      type="email" 
      name="email"
      class="input input-bordered {$model.isEmailEmpty ? 'border-2 border-red-600' : ''}"
      required 
    />
  </label>

  <label class="form-control w-full" for="password">
    <div class="label label-text text-neutral-500">Password *</div>
    <input 
      bind:value={$model.credentials.password}
      class="input input-bordered {$model.isPasswordWeak ? 'border-2 border-red-600' : ''}"
      class:fieldError={$model.isPasswordEmpty}
      id="password" 
      type="password" 
      name="password" 
      required 
    />
  </label>

  <div class="mt-2">
    {#if $model.error}
    {#each $model.message as m}
    <p class="text-sm text-red-500">{m}</p>
    {/each}
    {/if}
  </div>
  
  <div>
    <button class="btn mt-12 w-32 bg-accent" on:click={e => ViewModel.LoginUser()}>Login</button>
  </div>

</div>