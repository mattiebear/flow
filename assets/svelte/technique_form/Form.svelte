<script>
  import { waitForElement } from '../../js/utils/dom';
  import { className } from '../../js/utils/style';
  import AutoResizeTextarea from '../components/AutoResizeTextarea.svelte';
  import LabelPopover from './LabelPopover.svelte';
  import StepCard from './StepCard.svelte';

  let { action, errors = {}, live, technique } = $props();

  let form = $state({ ...technique });
  let isLabelMenuOpen = $state(false);

  let orderedSteps = $derived.by(() => {
    return form.layout.map((node) => {
      let index = form.steps.findIndex(
        (step) => step.layout_id === node.layout_id
      );

      return {
        ...form.steps[index],
        errors: errors.steps ? errors.steps[index] : {},
      };
    });
  });

  function addStep() {
    let id =
      (form.steps
        .map((step) => step.layout_id)
        .sort((a, b) => a - b)
        .pop() || 0) + 1;

    form.steps.push({
      description: '',
      layout_id: id,
      focuses: [],
    });

    form.layout.push({
      layout_id: id,
    });
  }

  function deleteStep(id) {
    form.steps = form.steps.filter((step) => step.layout_id !== id);
    form.layout = form.layout.filter((child) => child.layout_id !== id);
  }

  function updateStep(id, key, value) {
    let index = form.steps.findIndex((step) => step.layout_id === id);
    form.steps[index][key] = value;
  }

  function moveStep(id, direction) {
    let index = form.layout.findIndex((node) => node.layout_id === id);
    let newIndex = index + direction;

    if (newIndex < 0 || newIndex >= form.layout.length) {
      return;
    }

    form.layout.splice(newIndex, 0, form.layout.splice(index, 1)[0]);
  }

  function submit(e) {
    e.preventDefault();
    e.stopPropagation();
    live.pushEventTo('#technique-form', 'save', { technique: form });
  }

  async function navigateToStep(number) {
    let el = document.getElementById(`step-description-${number}`);

    if (el) {
      return el.focus();
    }

    addStep();

    el = await waitForElement(`#step-description-${number}`);
    el.focus();
  }

  async function openLabelMenu() {
    isLabelMenuOpen = !isLabelMenuOpen;
    let el = await waitForElement('#technique-label-input');
    el.focus();
  }

  function addLabel(label) {
    form.labels.push(label);
    isLabelMenuOpen = false;
    document.getElementById('description').focus();
  }

  function removeLabel(id) {
    form.labels = form.labels.filter((label) => label.id !== id);
  }
</script>

<form autocomplete="off" onsubmit={submit}>
  <div class="mb-8">
    <input
      onchange={(e) => (form.name = e.target.value)}
      onkeydown={(e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          document.getElementById('description').focus();
        }
      }}
      value={form.name}
      class={className(
        'text-6xl px-3 py-4 h-[92px] placeholder:text-neutral-500 w-full outline-none border-b',
        'text-neutral-900 dark:text-neutral-300 bg-transparent transition-colors',
        {
          'border-red-900 placeholder:text-red-400 dark:placeholder:text-red-300':
            errors.name,
          'border-zinc-400 dark:border-zinc-500 focus:border-zinc-500 dark:focus:border-zinc-100':
            !errors.name,
        }
      )}
      placeholder="Technique name" />

    {#if errors.name}
      <p class="text-red-700 dark:text-red-300 text-sm mt-1">{errors.name}</p>
    {/if}
  </div>

  <div class="w-full grid grid-cols-[8rem_1fr] gap-4">
    <div class="flex justify-end items-start mt-[calc(3rem_-_16px)]">
      <span
        class={className(
          'inline-block px-6 py-1 rounded-full',
          'border border-solid border-zinc-500 dark:border-zinc-300'
        )}>Start</span>
    </div>

    <div
      class={className(
        'rounded-xl w-full py-2 px-3',
        'border border-solid border-zinc-500',
        'bg-gradient-to-br from-indigo-950 to-zinc-900 to-50%'
      )}>
      <AutoResizeTextarea
        autofocus
        id="description"
        onchange={(e) => (form.description = e.target.value)}
        onkeypress={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigateToStep(1);
          } else if (e.key === '#') {
            e.preventDefault();
            openLabelMenu();
          }
        }}
        value={form.description}
        aria-label="Description of starting position"
        class={className(
          'bg-none bg-transparent outline-none border-none p-1',
          'w-full resize-none min-h-[6rem] focus:ring-0'
        )}
        placeholder="Describe the starting position for this technique" />

      <div class="flex justify-between">
        <div class="flex flex-row gap-x-2 grow">
          {#each form.labels as label (label.id)}
            <button
              class={className(
                'inline-flex gap-x-0.5 items-center px-3 rounded-full leading-7 bg-indigo-800',
                'border border-solid border-zinc-500 dark:border-zinc-300'
              )}
              onclick={() => removeLabel(label.id)}
              type="button">
              <span class="text-zinc-300">#{label.tag}</span>
              <span class="hero-x-mark-micro text-zinc-500 hover:text-zinc-300"
              ></span>
            </button>
          {/each}
        </div>

        <LabelPopover {form} isOpen={isLabelMenuOpen} onAddLabel={addLabel} />
      </div>
    </div>

    {#each orderedSteps as step, index (step.layout_id)}
      <StepCard
        canMoveDown={index < orderedSteps.length - 1}
        canMoveUp={index > 0}
        onChange={updateStep}
        onDelete={deleteStep}
        onMove={moveStep}
        onNext={() => navigateToStep(index + 2)}
        number={index + 1}
        {step} />
    {/each}

    <div class="col-start-2 flex flex-row justify-center">
      <button
        aria-label="Add step"
        class={className(
          'p-1 rounded-full border border-solid border-zinc-500 transition-colors',
          'hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200'
        )}
        onclick={addStep}
        type="button">
        <span class="hero-plus"></span>
      </button>
    </div>
  </div>

  <div class="flex justify-end mt-6 gap-x-2">
    {#if action === 'edit'}
      <a
        class="button outlined"
        href={`/techniques/${technique.id}`}
        type="button"
        data-phx-link="patch"
        data-phx-link-state="push">
        Cancel
      </a>
    {/if}

    <button class="button" type="submit">
      {action === 'new' ? 'Create' : 'Update'}
    </button>
  </div>
</form>
