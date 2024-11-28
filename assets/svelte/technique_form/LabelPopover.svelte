<script>
  import { createMutation, createQuery } from '@tanstack/svelte-query';
  import { onDestroy, onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';

  import { className } from '../../js/utils/style';
  import Popover from '../components/Popover.svelte';

  export let isOpen = false;
  export let onAddLabel;

  let tag = '';
  let search = '';
  let timeout;
  let selected = -1;
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
        throw new Error(data.errors.tag.join(', '));
      }

      selectLabel(data);
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

      selected = -1;

      return data;
    },
    initialData: [],
    enabled: search.length > 0,
  });

  function selectLabel(label) {
    onAddLabel(label);

    tag = search = '';
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

      if (tag.length > 0 && (!$query.data.length || selected === -1)) {
        return $mutation.mutate(tag);
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
        on:keypress={inputKeyPress}
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

    {#if $query.data.length > 0}
      <ul class="flex flex-col gap-y-2">
        {#each $query.data as label, index (label.id)}
          <li>
            <button
              class="option text-left"
              on:click={() => selectLabel(label)}
              type="button"
              {...selected === index ? { 'data-selected': true } : {}}
            >
              #{label.tag}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</Popover>
