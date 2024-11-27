<script>
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import Form from './technique_form/Form.svelte';

  export let errors;
  export let live;
  export let technique;

  let client = new QueryClient();
</script>

<QueryClientProvider {client}>
  <Form {errors} {live} {technique} />
</QueryClientProvider>
