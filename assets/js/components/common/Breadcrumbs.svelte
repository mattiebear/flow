<script>
  import { Link } from '@inertiajs/svelte';

  import { className } from '../../utils/style';

  let { items } = $props();

  function isBold(index) {
    return index && index === items.length - 1;
  }
</script>

<nav class="flex flex-row items-center">
  {#each items as [label, path], index}
    {#if !path}
      <Link href={path} class="hover:underline">
        <span class={className({ 'font-semibold': isBold(index) })}>
          {label}
        </span>
      </Link>
    {:else}
      <span class={className({ 'font-semibold': isBold(index) })}>
        {label}
      </span>
    {/if}
    {#if index < items.length - 1}
      <span class="mx-2">
        <span class="hero-chevron-right-mini"></span>
      </span>
    {/if}
  {/each}
</nav>
