<script>
  import { onDestroy, onMount } from 'svelte';

  import Slider from '../common/Slider.svelte';

  const STORAGE_KEY = 'mode-toggle';

  onMount(() => {
    let mode = localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    let el = document.getElementById('dark-mode-toggle');
    let input = el.querySelector('input');
    let root = document.querySelector('html');

    let setMode = (mode) => {
      localStorage.setItem(STORAGE_KEY, mode);
      root.className = mode;
      el.dataset.mode = mode;
    };

    setMode(mode);

    if (!input) {
      return;
    }

    input.checked = mode === 'dark';

    input.addEventListener('change', (e) => {
      let mode = e.target.checked ? 'dark' : 'light';
      setMode(mode);
    });
  });
</script>

<Slider
  class="before:content-[url('/icons/sun.svg')] peer-checked:before:content-[url('/icons/moon.svg')] peer-checked:before:p-1.5"
  id="dark-mode-toggle"
/>
