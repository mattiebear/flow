<script>
	export let live;
	export let technique = {};

	let name = '';
</script>

<form autocomplete="off">
	<div class="flex flex-col">
		<input
			aria-label="Technique name
			id="name"
			bind:value={name}
			placeholder="Butterfly Sweep"
			class={[
				"text-6xl px-3 py-2 placeholder:text-neutral-500",
				"text-neutral-900 dark:text-neutral-300 bg-none bg-transparent"
			]} 
		/>
	</div>
</form>
