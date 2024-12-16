<script>
  import { onDestroy, onMount } from 'svelte';
  import { scale } from 'svelte/transition';

  import { className } from '../../utils/style';

  let {
    content,
    isLazy,
    isOpen = $bindable(false),
    size = $bindable('md'),
    trigger,
  } = $props();

  let el;
  let listener;

  onMount(() => {
    listener = (e) => {
      if (el && !el.contains(e.target)) {
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

<div class="relative" bind:this={el}>
  {@render trigger()}

  {#if isOpen}
    <div
      class={className('menu absolute z-popover', size)}
      transition:scale={{
        duration: 100,
        opacity: 0,
        start: 0.9,
      }}
    >
      {@render content()}
    </div>
  {/if}
</div>
