<script>
  import { onDestroy, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import { className } from '../../js/utils/style';

  let { children, isOpen = false, onClose, size = 'md' } = $props();

  let modal = $state();

  let listeners = [];

  onMount(() => {
    let click = (e) => {
      if (modal && !modal.contains(e.target)) {
        onClose();
      }
    };

    let keydown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
      }
    };

    listeners.push(click, keydown);

    document.addEventListener('click', click);
    document.addEventListener('keydown', keydown);
  });

  onDestroy(() => {
    listeners.forEach((listener) => {
      document.removeEventListener('click', listener);
    });
  });
</script>

{#if isOpen}
  <div
    class="relative z-50"
    transition:fade={{
      duration: 100,
    }}>
    <div
      class="bg-zinc-50/90 dark:bg-zinc-800/90 fixed inset-0 transition-opacity"
      aria-hidden="true">
    </div>
    <div class="fixed inset-0 overflow-y-auto" role="dialog" aria-modal="true">
      <div class="flex min-h-full items-center justify-center">
        <div
          class={className([
            'w-full p-4 sm:p-6 lg:py-8',
            {
              'max-w-lg': size === 'sm',
              'max-w-xl': size === 'md',
              'max-w-2xl': size === 'lg',
              'max-w-3xl': size === 'xl',
            },
          ])}
          bind:this={modal}>
          <div
            class="shadow-zinc-700/10 ring-zinc-700/10 relative rounded-2xl bg-stone-300 dark:bg-zinc-900 p-14 shadow-lg ring-1 transition">
            <div class="absolute top-6 right-5">
              <button
                type="button"
                class="-m-3 flex-none p-3 opacity-20 hover:opacity-40"
                onclick={onClose}
                aria-label="close">
                <span class="hero-x-mark-solid h-5 w-5"></span>
              </button>
            </div>
            <div>
              {@render children?.()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
