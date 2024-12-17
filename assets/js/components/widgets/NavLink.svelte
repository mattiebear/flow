<script>
  import { inertia, Link, page } from '@inertiajs/svelte';

  import { className } from '../../utils/style';

  let { href, icon } = $props();
</script>

<Link
  {href}
  class={className('block p-[1px] rounded-xl', {
    'dark:text-zinc-300 bg-gradient-to-b from-zinc-600 to-transparent to-80%':
      $page.url.startsWith(href),
  })}
>
  <div
    class={className('h-full rounded-[calc(0.75rem_-_1px)] p-2.5', {
      'bg-gradient-to-b from-zinc-800 to-zinc-900': $page.url.startsWith(href),
    })}
  >
    <span class={icon}></span>
  </div>
</Link>
