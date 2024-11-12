<script>
  import { produce } from 'immer';

  import { className } from '../js/style';
  import { randomId } from '../js/utils';
  import AutoResizeTextarea from './AutoResizeTextarea.svelte';

  export let live;
  export let technique;

  let form = {
    name: '',
    description: '',
    layout: [],
    steps: [],
  };

  $: steps = (() => {
    return form.layout.map((child) => {
      return form.steps.find(
        (step) => step.id === child.id || step.tempId === child.id
      );
    });
  })();

  function updateForm(key, value) {
    form = { ...form, [key]: value };
  }

  function updateStep(id, key, value) {
    form = produce(form, (draft) => {
      const step = draft.steps.find(
        (step) => step.id === id || step.tempId === id
      );

      step[key] = value;
    });
  }

  function handleSubmit() {
    console.log('submit', form);
  }

  function handleAddStep() {
    form = produce(form, (draft) => {
      const id = randomId();

      draft.steps.push({
        tempId: id,
        description: '',
      });

      draft.layout.push({ id });
    });
  }
</script>

<form autocomplete="off" on:submit|preventDefault={handleSubmit}>
  <div class="mb-8">
    <label for="name" class="text-sm text-zinc-500 mb-1"> Name </label>
    <input
      class={className(
        'text-6xl px-3 py-4 placeholder:text-neutral-500 w-full outline-none',
        'text-neutral-900 dark:text-neutral-300 bg-transparent',
        'border-b border-zinc-300 dark:border-zinc-500 focus:border-zinc-100',
        'transition-colors'
      )}
      id="name"
      on:change={(e) => updateForm('name', e.target.value)}
      placeholder="Butterfly Sweep"
      value={form.name}
    />
  </div>

  <div class="w-full grid grid-cols-technique gap-4">
    <div class="flex justify-end items-center">
      <span
        class={className(
          'inline-block px-6 py-1 rounded-full',
          'border border-solid border-zinc-300'
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
        class={className(
          'bg-none bg-transparent outline-none border-none p-1',
          'w-full resize-none min-h-[6rem]'
        )}
        onChange={(e) => updateForm('description', e.target.value)}
        placeholder="Describe the starting position for this technique"
        value={form.description}
      />
    </div>

    {#each steps as step, index}
      <div class="flex justify-end items-center">
        <span
          class={className(
            'inline-block px-6 py-1 rounded-full',
            'border border-solid border-zinc-300'
          )}>Step {index + 1}</span
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
          onChange={(e) =>
            updateStep(step.id || step.tempId, 'description', e.target.value)}
          placeholder="Describe the this step"
          value={step.description}
        />
      </div>
    {/each}

    <div class="col-start-2 flex flex-row justify-center">
      <button
        class={className(
          'p-1 rounded-full border border-solid border-zinc-500 transition-colors',
          'hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
        )}
        on:click={handleAddStep}
        type="button"
      >
        <span class="hero-plus" />
      </button>
    </div>
  </div>

  <div class="flex justify-end">
    <button class="mt-6" type="submit">Submit</button>
  </div>
</form>
