<script>
	import { useMutation } from '@sveltestack/svelte-query';

	export let isOpen;
	export let onClose;

	let value;

	let mutation = useMutation(async (label) => {
		let res = await fetch('/api/labels', {
			method: 'POST',
			body: JSON.stringify({ tag: label }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let data = await res.json();

		if (!res.ok) {
			// TODO: Add something to parse the error messages automatically
			throw new Error(data.errors.tag.join(', '));
		}

		return data;
	});
</script>
