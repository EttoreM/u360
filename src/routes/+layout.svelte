<script lang="ts">
  import "tailwindcss/tailwind.css";
  import NavBar from "$lib/components/NavBar.svelte";
</script>


<div class="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-start justify-start">

    <!-- Page content here -->
    <label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden absolute">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block h-6 w-6 stroke-current">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16">
        </path>
      </svg>
    </label>
    <slot />
  </div>

  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <NavBar />
  </div>
  
</div>