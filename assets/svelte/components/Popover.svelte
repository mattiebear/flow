<script>
  import { onDestroy, onMount } from 'svelte';
  import { scale } from 'svelte/transition';

  import { className } from '../../js/utils/style';

  let { content, isOpen = false, size = 'md', trigger } = $props();

  let listeners = [];
  let popover;

  $effect(() => {
    if (isOpen) {
      let trigger = popover.children[0];
      let menu = popover.children[1];

      let triggerRect = trigger.getBoundingClientRect();
      let menuRect = menu.getBoundingClientRect();

      let top = triggerRect.height + 4;
      let left = menuRect.width / 2 - triggerRect.width / 2;

      menu.style.top = `${top}px`;
      menu.style.left = `-${left}px`;
    }
  });

  onMount(() => {
    let click = (e) => {
      if (popover && !popover.contains(e.target)) {
        isOpen = false;
      }
    };

    let keydown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
      }
    };

    listeners.push(click, keydown);

    document.addEventListener('click', click);
    document.addEventListener('keydown', keydown);
  });

  onDestroy(() => {
    listeners.forEach((listener) => {
      document.removeEventListener('click', listener);
    });
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
