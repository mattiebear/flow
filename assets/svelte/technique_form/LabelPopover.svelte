<script>
  import { createMutation, createQuery } from '@tanstack/svelte-query';

  import { className } from '../../js/utils/style';
  import Popover from '../components/Popover.svelte';

  export let isOpen = false;
  export let onAddLabel;

  let value;

  let mutation = createMutation({
    mutationFn: async (tag) => {
      let res = await fetch('/api/labels', {
        method: 'POST',
        body: JSON.stringify({ tag }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await res.json();

      if (!res.ok) {
        // TODO: Add something to parse the error messages automatically
        throw new Error(data.errors.tag.join(', '));
      }

      onAddLabel(data);
    },
  });

  let query = createQuery({
    queryKey: ['labels', { tag: value }],
    queryFn: async ({ queryKey }) => {
      return [];
    },
    initialData: [],
  });
</script>

<Popover {isOpen} size="lg">
  <button
    aria-label="Add positions or labels to technique"
    class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
    type="button"
    on:click={() => (isOpen = !isOpen)}
    slot="trigger"
  >
    <span class="hero-tag" />
  </button>

  <div class="flex flex-row gap-x-2 items-center" slot="content">
    <input
      bind:value
      class={className(
        'focus:ring-0 border border-solid border-indigo-700 rounded-md',
        'bg-none bg-transparent outline-none p-2 w-full'
      )}
      id="technique-label-input"
      on:keypress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          $mutation.mutate(value);
        }
      }}
      placeholder="guard/half"
    />

    <button
      aria-label="Add position"
      class="button sm"
      on:click={() => $mutation.mutate(value)}
      type="button"
    >
      Add
    </button>
  </div>
</Popover>
