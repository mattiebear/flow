<script>
  import { inertia, Link, page } from '@inertiajs/svelte';

  import NavLink from '../widgets/NavLink.svelte';

  let { children } = $props();
</script>

<!-- <.flash_group flash={@flash} /> -->

<div class="grid grid-cols-12 gap-x-6">
  <aside class="py-4">
    <nav class="m-auto flex justify-center">
      <ul class="flex flex-col gap-y-4">
        <li>
          <NavLink href="/training" icon="hero-squares-2x2" />
        </li>

        <li>
          <NavLink href="/techniques" icon="hero-pencil" />
        </li>
      </ul>
    </nav>
  </aside>

  {@render children()}
</div>
