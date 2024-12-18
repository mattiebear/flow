<script module>
  import AppLayout from '../../layout/App.svelte';
  import RootLayout from '../../layout/Root.svelte';

  export const layout = [RootLayout, AppLayout];
</script>

<script>
  import Breadcrumbs from '../../common/Breadcrumbs.svelte';

  let { breadcrumbs } = $props();
</script>

<main
  class="grid col-span-11 grid-cols-subgrid grid-rows-[48px_48px_auto] grid-areas-techniques py-7"
>
  <div class="grid-in-breadcrumbs">
    <Breadcrumbs items={breadcrumbs} />
  </div>

  <div class="grid-in-search">
    <div class="h-full flex items-center">
      <form
        class="flex flex-row rounded-full border border-solid border-zinc-300 items-center px-1 gap-x-2"
      >
        <span class="hero-magnifying-glass"></span>
        <input
          type="text"
          placeholder="Add filters"
          class="bg-inherit border-none w-full basis-0 grow p-1 focus:ring-0"
          name="filter"
        />
      </form>
    </div>
  </div>

  <div class="grid-in-filters">
    <div class="h-full flex flex-row gap-y-2 items-center">
      <!-- TODO: Add filters -->
    </div>
  </div>
</main>
