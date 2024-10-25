<script lang="ts">
  import type { PageData }                       from './$types';
  import      { mdiLightbulbOutline, mdiMemory, mdiChartTimelineVariant  } from '@mdi/js';
  import        SvgIcon                          from '@jamescoyle/svelte-icon';

  export let data: PageData;
</script>


<div class="bg-neutral h-full w-full p-4 px-12">

  <div class="stat shadow-md bg-neutral-100 text-neutral-500 rounded-xl w-fit m-2">
    <div class="stat-figure text-primary">
      <SvgIcon
        type="mdi"
        path={mdiMemory}
        class='text-neutral-500'
        size="40"
      />
    </div>
      <div class="stat-title">Platform</div>
      <div class="text-4xl font-bold">{data.platforms.length}</div>
      <div class="stat-desc">(6 seems not providing data)</div>
  </div>


  <div class="stat shadow-md bg-neutral-100 text-neutral-500 rounded-xl w-fit m-2">
    <div class="stat-figure text-primary">
      <SvgIcon
        type="mdi"
        path={mdiLightbulbOutline}
        class='text-neutral-500'
        size="40"
      />
    </div>
      <div class="stat-title">Deployments</div>
      <div class="text-4xl font-bold">{data.deployments.length}</div>
      <div class="stat-desc">Write something here if necessary</div>
  </div>

  <div class="stat shadow-md bg-neutral-100 text-neutral-500 rounded-xl w-fit m-2">
    <div class="stat-figure text-primary">
      <SvgIcon
        type="mdi"
        path={mdiChartTimelineVariant }
        class='text-neutral-500'
        size="40"
      />
    </div>
      <div class="stat-title">Datastreams</div>
      <div class="text-4xl font-bold">{data.timeseries.length}</div>
      <div class="stat-desc">Write something here if necessary</div>
  </div>

</div>