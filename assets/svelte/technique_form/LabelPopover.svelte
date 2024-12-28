<script>
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { onDestroy, onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';

  import { className } from '../../js/utils/style';
  import Popover from '../components/Popover.svelte';

  let { isOpen = false, onAddLabel } = $props();

  let search = writable('');

  let tag = $state('');
  let selected = $state(-1);

  let timeout;
  let listener;

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
        // TODO: Handle label already exists by adding it
        throw new Error(data.errors.tag.join(', '));
      }

      selectLabel(data);
    },
  });

  $effect(() => {
    if (tag !== $search && timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      $search = tag;
    }, 300);
  });

  let query = createQuery(
    derived(search, ($search) => {
      return {
        queryKey: ['labels', { search: $search }],
        queryFn: async () => {
          let res = await fetch(`/api/labels?search=${$search}&limit=5`);
          let data = await res.json();

          selected = -1;

          return data;
        },
        initialData: [],
        enabled: $search.length > 0,
      };
    })
  );

  function selectLabel(label) {
    onAddLabel(label);

    tag = $search = '';
    isOpen = false;
    selected = -1;
  }

  function clampOverflow(n, total) {
    if (n < 0) {
      return total - 1;
    }

    if (n >= total) {
      return 0;
    }

    return n;
  }

  // TODO: Adjust accessibility to handle active selections
  function inputKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      let label;

      if (selected !== -1) {
        let label = $query.data[selected];
      }

      if (tag.length > 0 && (!$query.data.length || selected === -1)) {
        // Find an existing label if it is in the listener
        let existing = $query.data.find((label) => label.tag === tag);

        if (existing) {
          selectLabel(existing);
        } else {
          $mutation.mutate(tag);
        }

        return;
      }

      if (selected !== -1) {
        let label = $query.data[selected];

        if (label) {
          selectLabel(label);
        }
      }
    }
  }

  onMount(() => {
    listener = (e) => {
      if (e.key === 'ArrowDown') {
        selected = clampOverflow(selected + 1, $query.data.length);
      }

      if (e.key === 'ArrowUp') {
        selected = clampOverflow(selected - 1, $query.data.length);
      }
    };

    document.addEventListener('keydown', listener);
  });

  onDestroy(() => {
    if (listener) {
      document.removeEventListener('keydown', listener);
    }

    if (timeout) {
      clearTimeout(timeout);
    }
  });
</script>

<Popover {isOpen} size="lg">
  {#snippet trigger()}
    <button
      aria-label="Add positions or labels to technique"
      class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
      type="button"
      onclick={() => (isOpen = !isOpen)}>
      <span class="hero-tag"></span>
    </button>
  {/snippet}

  {#snippet content()}
    <div class="flex flex-col gap-y-2">
      <div class="flex flex-row gap-x-2 items-center">
        <input
          bind:value={tag}
          class={className(
            'focus:ring-0 border border-solid border-indigo-700 rounded-md',
            'bg-none bg-transparent outline-none p-2 w-full'
          )}
          id="technique-label-input"
          onkeypress={inputKeyPress}
          placeholder="guard/half" />

        <button
          aria-label="Add position"
          class="button sm"
          onclick={() => $mutation.mutate(tag)}
          type="button">
          Add
        </button>
      </div>

      {#if $query.data.length > 0}
        <ul class="flex flex-col gap-y-2">
          {#each $query.data as label, index (label.id)}
            <li>
              <button
                class="option text-left"
                onclick={() => selectLabel(label)}
                type="button"
                {...selected === index ? { 'data-selected': true } : {}}>
                #{label.tag}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/snippet}
</Popover>
