<script>
  import { produce } from 'immer';

  import { Step } from '../js/entities/Step';
  import { className } from '../js/utils/style';
  import AutoResizeTextarea from './AutoResizeTextarea.svelte';
  import StepCard from './StepCard.svelte';

  export let live;
  export let technique;

  // TODO: Should this be in an object? Maybe wait for Svelte version 5.
  let name = '';
  let description = '';
  let steps = [];
  let layout = [];

  // TODO: Handle missing layout and steps
  $: orderedSteps = layout.map((child) => {
    return steps.find((step) => step.idx === child.id);
  });

  function addStep() {
    const step = new Step();

    steps = produce(steps, (draft) => {
      draft.push(step);
    });

    layout = produce(layout, (draft) => {
      draft.push({ id: step.idx });
    });
  }

  function deleteStep(id) {
    steps = steps.filter((step) => step.idx !== id);
    layout = layout.filter((child) => child.id !== id);
  }

  function updateStep(id, key, value) {
    steps = produce(steps, (draft) => {
      const step = draft.find((step) => step.idx === id);
      step[key] = value;
    });
  }

  function moveStep(id, direction) {
    const index = layout.findIndex((child) => child.id === id);
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= layout.length) {
      return;
    }

    layout = produce(layout, (draft) => {
      draft.splice(newIndex, 0, draft.splice(index, 1)[0]);
    });
  }

  function submit() {
    const technique = {
      name,
      description,
      steps: steps.map((step) => step.toJSON()),
      layout,
    };

    live.pushEvent('save', { technique });
  }
</script>

<form autocomplete="off" on:submit|preventDefault={submit}>
  <div class="mb-8">
    <label for="name" class="text-sm text-zinc-700 dark:text-zinc-500 mb-1">
      Name
    </label>
    <input
      id="name"
      bind:value={name}
      class={className(
        'text-6xl px-3 py-4 placeholder:text-neutral-500 w-full outline-none',
        'text-neutral-900 dark:text-neutral-300 bg-transparent',
        'border-b border-zinc-400 dark:border-zinc-500 focus:border-zinc-500 dark:focus:border-zinc-100',
        'transition-colors'
      )}
      placeholder="Butterfly Sweep"
    />
  </div>

  <div class="w-full grid grid-cols-technique gap-4">
    <div class="flex justify-end items-center">
      <span
        class={className(
          'inline-block px-6 py-1 rounded-full',
          'border border-solid border-zinc-500 dark:border-zinc-300'
        )}>Start</span
      >
    </div>

    <div
      class={className(
        'rounded-xl w-full py-2 px-3',
        'border border-solid border-zinc-500',
        'bg-gradient-to-br from-indigo-950 to-zinc-900 to-50%'
      )}
    >
      <AutoResizeTextarea
        id="description"
        bind:value={description}
        aria-label="Description of starting position"
        class={className(
          'bg-none bg-transparent outline-none border-none p-1',
          'w-full resize-none min-h-[6rem]'
        )}
        placeholder="Describe the starting position for this technique"
      />
    </div>

    {#each orderedSteps as step, index (step.idx)}
      <StepCard
        canMoveDown={index < orderedSteps.length - 1}
        canMoveUp={index > 0}
        number={index + 1}
        onDelete={deleteStep}
        onMove={moveStep}
        onUpdate={updateStep}
        {step}
      />
    {/each}

    <div class="col-start-2 flex flex-row justify-center">
      <button
        aria-label="Add step"
        class={className(
          'p-1 rounded-full border border-solid border-zinc-500 transition-colors',
          'hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
        )}
        on:click={addStep}
        type="button"
      >
        <span class="hero-plus" />
      </button>
    </div>
  </div>

  <div class="flex justify-end mt-6">
    <button class="button" type="submit">Submit</button>
  </div>
</form>
