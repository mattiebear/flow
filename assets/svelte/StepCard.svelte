<script>
  import { onMount, onDestroy } from 'svelte';
  import { scale } from 'svelte/transition';
  import { className } from '../js/utils/style';
  import AutoResizeTextarea from './AutoResizeTextarea.svelte';

  export let number;
  export let step;
  export let onUpdate;

  let isOpen = false;
  let menu;
  let listener;

  onMount(() => {
    listener = (e) => {
      if (menu && !menu.contains(e.target)) {
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

<div class="flex justify-end items-center">
  <span
    class={className(
      'inline-block px-6 py-1 rounded-full',
      'border border-solid border-zinc-300'
    )}>Step {number}</span
  >
</div>

<div
  class={className(
    'rounded-xl w-full py-2 px-3',
    'border border-solid border-zinc-500'
  )}
>
  <AutoResizeTextarea
    class={className(
      'bg-none bg-transparent outline-none border-none p-1',
      'w-full resize-none min-h-[6rem]'
    )}
    on:change={(e) => onUpdate(step.idx, 'description', e.target.value)}
    placeholder="Describe the this step"
    value={step.description}
  />

  <div class="flex justify-end relative">
    <button
      aria-label="Edit step"
      class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      type="button"
      on:click|stopPropagation={() => (isOpen = !isOpen)}
    >
      <span class="hero-cog-6-tooth" />
    </button>

    {#if isOpen}
      <div
        bind:this={menu}
        class="menu absolute right-[-80px] bottom-[calc(100%_+_10px)]"
        transition:scale={{
          duration: 100,
          opacity: 0,
          start: 0.9,
        }}
      >
        <ul class="flex flex-col gap-y-2">
          <li>
            <button class="option flex justify-between">
              Remove
              <span class="hero-trash" />
            </button>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</div>
