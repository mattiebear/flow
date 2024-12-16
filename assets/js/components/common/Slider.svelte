<script>
  import { className } from '../../utils/style';

  let { class: classes, ...rest } = $props();
</script>

<label {...rest}>
  <input type="checkbox" class="hidden peer" />
  <span
    class={className([
      'block relative h-6 w-12 rounded-full cursor-pointer bg-zinc-200 drop-shadow-sm',
      'before:block before:h-8 before:w-8 before:p-1 before:absolute',
      'before:bg-amber-500 before:-left-1 before:-top-1 before:rounded-full',
      'before:transition-transform before:duration-200',
      'peer-checked:before:translate-x-6 peer-checked:before:bg-zinc-900',
      classes,
    ])}
  ></span>
</label>
