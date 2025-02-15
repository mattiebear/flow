<script>
  import { produce } from 'immer';
  import { fade } from 'svelte/transition';

  import { className } from '../../js/utils/style';
  import AutoResizeTextarea from '../components/AutoResizeTextarea.svelte';
  import Modal from '../components/Modal.svelte';
  import Popover from '../components/Popover.svelte';

  let {
    canMoveDown,
    canMoveUp,
    onChange,
    onDelete,
    onMove,
    onNext,
    number,
    step,
  } = $props();

  let isFocusModalOpen = $state(false);
  let isMenuOpen = $state(false);

  function moveStep(direction) {
    isOpen = false;
    onMove(step.layout_id, direction);
  }

  function addFocus() {
    onChange(step.layout_id, 'focuses', [...step.focuses, { description: '' }]);
  }

  function updateFocus(index, value) {
    let focuses = produce(step.focuses, (draft) => {
      draft[index].description = value;
    });

    onChange(step.layout_id, 'focuses', focuses);
  }
</script>

<div
  class="flex justify-end items-start mt-[calc(3rem_-_16px)]"
  transition:fade={{ duration: 100 }}>
  <span
    class={className(
      'inline-block px-6 py-1 rounded-full',
      'border border-solid border-zinc-500 dark:border-zinc-300'
    )}>Step {number}</span>
</div>

<div
  class={className(
    'rounded-xl w-full py-2 px-3 border navigateToStepborder-solid',
    step.errors.description ? 'border-red-900' : 'border-zinc-500'
  )}
  transition:fade={{ duration: 100 }}>
  <AutoResizeTextarea
    id={`step-description-${number}`}
    onchange={(e) => onChange(step.layout_id, 'description', e.target.value)}
    onkeypress={(e) => {
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
    value={step.description} />

  {#if step.errors.description}
    <p class="text-red-700 dark:text-red-300 text-sm mt-1">
      {step.errors.description}
    </p>
  {/if}

  <div class="flex justify-end gap-x-2">
    <Modal
      isOpen={isFocusModalOpen}
      onClose={() => (isFocusModalOpen = false)}
      size="md">
      <div class="flex flex-col gap-y-2">
        <p class="text-lg">At this point:</p>
        <div
          class="rounded-xl w-full py-2 px-3 border border-solid border-zinc-500">
          <p class="text-zinc-500 italic">
            {step.description || 'No description given...'}
          </p>
        </div>

        <p class="text-lg">focus on:</p>
      </div>

      <div class="w-full grid grid-cols-[5rem_1fr] gap-4">
        {#each step.focuses as focus, index}
          <div
            class="flex justify-end items-start mt-4"
            transition:fade={{ duration: 100 }}>
            <span
              class={className(
                'inline-block px-2 py-0.5 rounded-full text-sm',
                'border border-solid border-zinc-500 dark:border-zinc-300'
              )}>Focus {index + 1}</span>
          </div>

          <div
            class={className(
              'rounded-xl w-full py-2 px-3 border border-solid',
              'border-amber-500'
            )}
            transition:fade={{ duration: 100 }}>
            <AutoResizeTextarea
              id={`step-description-${number}`}
              onchange={(e) => updateFocus(index, e.target.value)}
              onkeypress={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  onNext();
                }
              }}
              class={className(
                'bg-none bg-transparent outline-none border-none p-1',
                'w-full resize-none min-h-[4rem] focus:ring-0'
              )}
              placeholder="What is your focus?"
              value={focus.description} />

            <div class="flex justify-end">
              <button
                aria-label="Remove focus"
                class="transition-colors text-zinc-500 hover:text-red-500"
                type="button"
                onclick={() =>
                  onChange(
                    step.layout_id,
                    'focuses',
                    step.focuses.filter((_, i) => i !== index)
                  )}>
                <span class="hero-trash"></span>
              </button>
            </div>
          </div>
        {/each}

        <div class="col-span-2 flex flex-row justify-center">
          <button
            aria-label="Add focus"
            class={className(
              'p-1 rounded-full border border-solid border-zinc-500 transition-colors',
              'hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
            )}
            onclick={addFocus}
            type="button">
            <span class="hero-plus"></span>
          </button>
        </div>
      </div>
    </Modal>

    <button
      aria-label="Edit focuses"
      class={className('transition-colors', {
        'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300':
          !step.focuses.length,
        'text-amber-500 hover:text-amber-700 dark:hover:text-amber-300':
          step.focuses.length,
      })}
      onclick={(e) => {
        e.stopPropagation();
        isFocusModalOpen = true;
      }}
      type="button">
      <span class="hero-exclamation-circle"></span>
    </button>

    <Popover isOpen={isMenuOpen}>
      {#snippet trigger()}
        <button
          aria-label="Edit step"
          class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          type="button"
          onclick={() => (isMenuOpen = !isMenuOpen)}>
          <span class="hero-cog-6-tooth"></span>
        </button>
      {/snippet}

      {#snippet content()}
        <ul class="flex flex-col gap-y-2">
          {#if canMoveUp}
            <li>
              <button
                class="option flex justify-between"
                onclick={() => moveStep(-1)}
                type="button">
                Move Up
                <span class="hero-arrow-up"></span>
              </button>
            </li>
          {/if}

          {#if canMoveDown}
            <li>
              <button
                class="option flex justify-between"
                onclick={() => moveStep(1)}
                type="button">
                Move Down
                <span class="hero-arrow-down"></span>
              </button>
            </li>
          {/if}

          <li>
            <button
              class="option flex justify-between"
              onclick={() => onDelete(step.layout_id)}
              type="button">
              Remove
              <span class="hero-trash"></span>
            </button>
          </li>
        </ul>
      {/snippet}
    </Popover>
  </div>
</div>
