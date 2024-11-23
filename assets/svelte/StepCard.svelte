<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { className } from '../js/utils/style';
  import AutoResizeTextarea from './AutoResizeTextarea.svelte';

  export let canMoveDown;
  export let canMoveUp;
  export let onChange;
  export let onDelete;
  export let onMove;
  export let onNext;
  export let number;
  export let step;

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

  function moveStep(direction) {
    isOpen = false;
    onMove(step.layout_id, direction);
  }
</script>

<div
  class="flex justify-end items-start mt-[calc(3rem_-_16px)]"
  transition:fade={{ duration: 100 }}
>
  <span
    class={className(
      'inline-block px-6 py-1 rounded-full',
      'border border-solid border-zinc-500 dark:border-zinc-300'
    )}>Step {number}</span
  >
</div>

<div
  class={className(
    'rounded-xl w-full py-2 px-3 border border-solid',
    step.errors.description ? 'border-red-900' : 'border-zinc-500'
  )}
  transition:fade={{ duration: 100 }}
>
  <AutoResizeTextarea
    id={`step-description-${number}`}
    on:change={(e) => onChange(step.layout_id, 'description', e.target.value)}
    on:keypress={(e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onNext();
      }
    }}
    class={className(
      'bg-none bg-transparent outline-none border-none p-1',
      'w-full resize-none min-h-[6rem] focus:ring-0'
    )}
    placeholder="Describe the this step"
    value={step.description}
  />

  {#if step.errors.description}
    <p class="text-red-700 dark:text-red-300 text-sm mt-1">
      {step.errors.description}
    </p>
  {/if}

  <div class="flex justify-end relative" bind:this={menu}>
    <button
      aria-label="Edit step"
      class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      type="button"
      on:click={() => (isOpen = !isOpen)}
    >
      <span class="hero-cog-6-tooth" />
    </button>

    {#if isOpen}
      <div
        class="menu absolute right-[-80px] bottom-[calc(100%_+_10px)]"
        transition:scale={{
          duration: 100,
          opacity: 0,
          start: 0.9,
        }}
      >
        <ul class="flex flex-col gap-y-2">
          {#if canMoveUp}
            <li>
              <button
                class="option flex justify-between"
                on:click={() => moveStep(-1)}
                type="button"
              >
                Move Up
                <span class="hero-arrow-up" />
              </button>
            </li>
          {/if}

          {#if canMoveDown}
            <li>
              <button
                class="option flex justify-between"
                on:click={() => moveStep(1)}
                type="button"
              >
                Move Down
                <span class="hero-arrow-down" />
              </button>
            </li>
          {/if}

          <li>
            <button
              class="option flex justify-between"
              on:click={() => onDelete(step.layout_id)}
              type="button"
            >
              Remove
              <span class="hero-trash" />
            </button>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</div>
