<script lang="ts">
  import { Modal_ViewModel } from "../../viewModels/info/Modal_ViewModel";
  import { isModalOpen }     from "../../viewModels/info/Modal_ViewModel";
  import { ModalEnum }       from "../../types/info/Modal";
  import   SvgIcon           from '@jamescoyle/svelte-icon';
  
  export let type    : ModalEnum = ModalEnum.Default;
  export let title   : string = "";
  export let message : string = "";

  let ViewModel : Modal_ViewModel = new Modal_ViewModel();
  
  ViewModel.model.update((cm) => {
    cm.type = type;
    cm.title = title;
    cm.message = message;
    return cm;
  });

  let model = ViewModel.model;
  let isOpen = isModalOpen;
</script>


{#if $isOpen}
<dialog class="modal modal-open modal-bottom sm:modal-middle">
  <div class="modal-box">

    <!-- Title bar of the modal -->
    <div class="flex align-middle items-center">
      <SvgIcon
        type="mdi"
        path={$model.style.icon}
        class={`mr-2 ${$model.style.color}`}
        size="40"
      ></SvgIcon>
      <h3 class="text-2xl font-bold title">{$model.title}</h3>
    </div>

    <!-- Content of the modal -->
    <p class="py-4 text-base">{$model.message}</p>

    <!-- Action buttons -->
    <div class="modal-action">
      <button 
        class="btn" 
        on:click={() => ViewModel.CloseModal()}
      >Close</button>
    </div>
    
  </div>
</dialog>
{/if}