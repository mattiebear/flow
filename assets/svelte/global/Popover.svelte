<script>
	import { onMount, onDestroy } from 'svelte';
  import { scale } from 'svelte/transition';
	import { className } from '../../js/utils/style';

	export let isOpen = false;
	export let size = 'md';

	let listener;
	let popover;
	let trigger;
	let content;

	onMount(() => {
		listener = (e) => {
			if (popover && !popover.contains(e.target)) {
				isOpen = false;
			}
		};

		document.addEventListener('click', listener);
	})

	onDestroy(() => {
		if (listener) {
			document.removeEventListener('click', listener);
		}
	})

</script>

<div class="relative" bind:this={popover}>
	<slot name="trigger"></slot>

	{#if isOpen}
		<div bind:this={content} class={className("menu absolute", size)} transition:scale={{
			duration: 100,
			opacity: 0,
			start: 0.9,
			}}>
			<slot name="content"></slot>
		</div>
	{/if}
</div>
