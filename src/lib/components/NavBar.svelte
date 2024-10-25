<script lang="ts">
  import { page }    from '$app/stores';
  import NavBarModel from '$models/navigation/NavBarModel';
  import SvgIcon     from '@jamescoyle/svelte-icon';
	import logo2       from '$lib/assets/imgs/U360_medium.webp';
	import logo        from '$imgs/Urban-360-Logo-full.webp';

  $: classesActive = (href: string) =>
      href === $page.url.pathname ? ' text-neutral-200' : '';

	$: classesActiveItem = (href: string) => 
		href === $page.url.pathname ? 'text-neutral-200 border-l-2 border-accent': 'border-l-2 border-transparent';
</script>


<div class="menu bg-primary min-h-full p-0 [&_li>*]:rounded-none w-42">

	<a href={"/"} class="w-full flex justify-center" >
		<div class="mt-6 mb-8 w-full flex justify-center">
			<img src={logo} alt="logo" class="w-28" />
		</div>
	</a>

	<ul> 
		{#each Object.keys(NavBarModel) as k}	
			<li class="w-full flex justify-start text-neutral-300 {classesActiveItem(NavBarModel[k].target)} text-lg">
				<a href={NavBarModel[k].target} class="w-full flex justify-start mr-4" >				
					<SvgIcon
						type="mdi"
						path={NavBarModel[k].icon}
						class="text-neutral-400 {classesActive(NavBarModel[k].target)}"
						size=""
					></SvgIcon>
					<p>{NavBarModel[k].label}</p>			
				</a>
			</li>
		{/each}
	</ul>

</div>