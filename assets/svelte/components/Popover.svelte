<script>
  import { onDestroy, onMount } from 'svelte';
  import { scale } from 'svelte/transition';

  import { className } from '../../js/utils/style';

  let { content, isOpen = false, size = 'md', trigger } = $props();

  let listener;
  let popover;

  // TODO: Use JS to calculate positioning
  onMount(() => {
    listener = (e) => {
      if (popover && !popover.contains(e.target)) {
        isOpen = false;
      }
    };

    document.addEventListener('click', listener);
  });

  onDestroy(() => {
    if (listener) {
      document.removeEventListener('click', listener);
    }
  });
</script>

<div class="relative" bind:this={popover}>
  {@render trigger()}

  {#if isOpen}
    <div
      class={className('menu absolute z-popover', size)}
      transition:scale={{
        duration: 100,
        opacity: 0,
        start: 0.9,
      }}>
      {@render content()}
    </div>
  {/if}
</div>
