<script>
  import { className } from '../../utils/style';

  let { children, variant = 'default', ...rest } = $props();

  let classes = $derived(
    className(
      'px-2 py-1.5 rounded-lg hover:bg-indigo-500 hover:text-zinc-100 w-full',
      'flex justify-between items-center',
      {
        default: '',
        destructive: 'text-red-500 hover:bg-red-500 hover:text-zinc-100',
      }[variant]
    )
  );
</script>

<button class={classes} {...rest}>
  {@render children?.()}
</button>
