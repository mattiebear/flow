<script>
  import { produce } from 'immer';

  import { randomId } from '../js/utils/id';
  import { className } from '../js/utils/style';
  import AutoResizeTextarea from './AutoResizeTextarea.svelte';
  import StepCard from './StepCard.svelte';

  export let live;
  export let technique;

  let form = { ...technique };

  $: orderedSteps = form.layout.map((node) => {
    return form.steps.find((step) => step.layout_id === node.layout_id);
  });

  $: {
    console.log({ orderedSteps });
  }

  function addStep() {
    form = produce(form, (draft) => {
      const id = randomId();

      draft.steps.push({
        title: '',
        description: '',
        layout_id: id,
      });

      draft.layout.push({
        layout_id: id,
      });
    });
  }

  // function deleteStep(id) {
  //   steps = steps.filter((step) => step.idx !== id);
  //   layout = layout.filter((child) => child.id !== id);
  // }

  // function updateStep(id, key, value) {
  //   steps = produce(steps, (draft) => {
  //     const step = draft.find((step) => step.idx === id);
  //     step[key] = value;
  //   });
  // }

  // function moveStep(id, direction) {
  //   const index = layout.findIndex((child) => child.id === id);
  //   const newIndex = index + direction;

  //   if (newIndex < 0 || newIndex >= layout.length) {
  //     return;
  //   }

  //   layout = produce(layout, (draft) => {
  //     draft.splice(newIndex, 0, draft.splice(index, 1)[0]);
  //   });
  // }

  function submit() {
    console.log({ form });
    // live.pushEvent('save', { technique: form });
  }
</script>

<form autocomplete="off" on:submit|preventDefault={submit}>
  <div class="mb-8">
    <label for="name" class="text-sm text-zinc-700 dark:text-zinc-500 mb-1">
      Name
    </label>
    <input
      id="name"
      bind:value={form.name}
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
        bind:value={form.description}
        aria-label="Description of starting position"
        class={className(
          'bg-none bg-transparent outline-none border-none p-1',
          'w-full resize-none min-h-[6rem]'
        )}
        placeholder="Describe the starting position for this technique"
      />
    </div>

    <!-- {#each orderedSteps as step, index (step.idx)}
      <StepCard
        canMoveDown={index < orderedSteps.length - 1}
        canMoveUp={index > 0}
        number={index + 1}
        {step}
      />
    {/each} -->

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
