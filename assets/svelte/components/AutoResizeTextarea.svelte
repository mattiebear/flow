<script>
  import { onMount } from 'svelte';

  let { onchange, onkeypress, ...rest } = $props();

  let el;

  onMount(() => {
    el.style.height = el.scrollHeight + 'px';
    el.style.overflowY = 'hidden';

    el.addEventListener('input', () => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    });
  });
</script>

<textarea bind:this={el} {onchange} {onkeypress} {...rest}></textarea>
