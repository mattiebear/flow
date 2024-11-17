<script>
  import { onMount } from 'svelte';

  let el;

  export let value = '';

  onMount(() => {
    el.style.height = el.scrollHeight + 'px';
    el.style.overflowY = 'hidden';

    el.addEventListener('input', () => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    });
  });
</script>

<textarea bind:this={el} bind:value {...$$restProps} />
