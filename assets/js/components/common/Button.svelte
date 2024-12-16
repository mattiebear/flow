<script>
  import { className } from '../../utils/style';

  let {
    children,
    color = 'primary',
    size = 'md',
    variant = 'solid',
    ...rest
  } = $props();

  let buttonStyleMatrix = {
    primary: {
      solid: 'bg-indigo-700 text-zinc-200 hover:bg-indigo-800',
      outline:
        'border border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-zinc-200',
    },
    destructive: {
      solid: 'bg-red-600 text-zinc-200 hover:bg-red-800',
      outline:
        'border border-solid border-red-600 text-zinc-900 dark:text-zinc-200 hover:text-zinc-300 dark:hover:text-zinc-800',
    },
  };

  let buttonSizes = {
    sm: 'px-2 py-1 rounded-md',
    md: 'px-3 py-2 rounded-md',
  };

  let classes = $derived(
    className(buttonStyleMatrix[color][variant], buttonSizes[size])
  );
</script>

<button class={classes} {...rest}>
  {@render children?.()}
</button>
