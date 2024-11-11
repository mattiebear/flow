<script>
  // export let live;
  export let technique = {};

  function handleSubmit() {
    console.log(technique, this);
  }
</script>

<form autocomplete="off" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col">
    <div>
      <label for="name" class="text-sm text-zinc-500 mb-1"> Name </label>
      <input
        aria-label="Technique name"
        class="text-6xl px-3 py-4 placeholder:text-neutral-500 w-full text-neutral-900 dark:text-neutral-300 bg-transparent border-b border-zinc-300 dark:border-zinc-500"
        id="name"
        on:change={(e) => (technique.name = e.target.value)}
        placeholder="Butterfly Sweep"
        value={technique.name}
      />
    </div>

    <div class="flex justify-end">
      <button class="mt-6" type="submit">Submit</button>
    </div>
  </div>
</form>
