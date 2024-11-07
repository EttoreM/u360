<script lang="ts">
  import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let form;
  export let data: PageData;

  $: clearUser = data?.clearUser;


  async function GoToSignUp(){
    goto('/signup');
  }

</script>


<div class="w-full">

  <form use:enhance method="post">
    <label class="form-control w-full" for="email">
      <div class="label label-text text-neutral-500">Email *</div>
      <input 
        value={form?.email?? ''} 
        id="email" 
        type="email" 
        name="email"
        class="input input-bordered {form?.isEmailInvalid? 'border-red-500' : ''}"
        required 
      />
    </label>

    <label class="form-control w-full" for="password">
      <div class="label label-text text-neutral-500">Password *</div>
      <input 
        class="input input-bordered"
        id="password" 
        type="password" 
        name="password" 
        required 
      />
    </label>

    <div class="mt-2">
      {#if form?.error}
      <p class="text-sm text-red-500">{form.message}</p>
      {/if}
    </div>
    
    <div class="flex flex-col mt-12 items-center">
      <button class="btn w-full bg-accent" type="submit">Login</button> 
      <p class="mt-6 cursor-default text-sm">Dont have an account? <button class="cursor-pointer" on:click={() => GoToSignUp()}>Sign up</button></p>
    </div>
  </form>

</div>