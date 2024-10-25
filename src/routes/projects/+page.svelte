<script lang="ts">
  import type { PageData } from './$types';
  // import axios from "axios";

  export let data: PageData;

  function formatDate(dateString: string | null): string {
    if (!dateString) {
      return "Present"
    }
    let dateObj = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(dateObj);
  }

  // async function GetDeployments() {
  //   let response = await axios({
  //     method: 'get',
  //     url: 'https://localhost:7168/api/deployments',
  //   });
  //   console.log(response.data);
  // }
</script>

<div class="bg-neutral h-full w-full p-4 px-12">

<div class="card card-body overflow-x-auto m-12 shadow-xl bg-neutral-100 cursor-default p-4">
  <table class="table table-pin-rows table-zebra">
    <thead>
      <tr class="text-base bg-neutral-100">
        <th>Name</th>
        <th>Decscription</th>
        <th>Start date</th>
        <th>End date</th>
      </tr>
    </thead>
    <tbody>
      {#each data.deployments as d}
      <tr class="hover cursor-arrow">
        <td>{d.label}</td>
        <td>{d.description} {#if d.external_url}[<a href={d.external_url} target="_blank" class="link-info">more info</a>]{/if}</td>
        <td>{formatDate(d.start_date)}</td>
        <td>{formatDate(d.end_date)}</td>
      </tr>
      {/each}
      
    </tbody>
  </table>
</div>
</div>