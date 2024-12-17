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
</main>
