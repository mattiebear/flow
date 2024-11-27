<script>
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { onDestroy } from 'svelte';
  import { derived, writable } from 'svelte/store';

  import { className } from '../../js/utils/style';
  import Popover from '../components/Popover.svelte';

  export let isOpen = false;
  export let onAddLabel;

  let tag = '';
  let search = '';
  let timeout;

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

  $: {
    if (timeout && search !== tag) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      search = tag;
    }, 300);
  }

  $: query = createQuery({
    queryKey: ['labels', { search }],
    queryFn: async () => {
      let res = await fetch(`/api/labels?search=${search}&limit=5`);
      let data = await res.json();
      return data;
    },
    initialData: [],
    enabled: search.length > 0,
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

  <div slot="content" class="flex flex-col gap-y-2">
    <div class="flex flex-row gap-x-2 items-center">
      <input
        bind:value={tag}
        class={className(
          'focus:ring-0 border border-solid border-indigo-700 rounded-md',
          'bg-none bg-transparent outline-none p-2 w-full'
        )}
        id="technique-label-input"
        on:keypress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            $mutation.mutate(tag);
          }
        }}
        placeholder="guard/half"
      />

      <button
        aria-label="Add position"
        class="button sm"
        on:click={() => $mutation.mutate(tag)}
        type="button"
      >
        Add
      </button>
    </div>

    {#each $query.data as label (label.id)}
      <div class="flex flex-row gap-x-2 items-center">
        <span class="text-sm">{label.tag}</span>
      </div>
    {/each}
  </div>
</Popover>
