<script>
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  import Form from './technique_form/Form.svelte';

  let client = new QueryClient();
  let { action, errors, live, technique } = $props();
</script>

<QueryClientProvider {client}>
  <Form {action} {errors} {live} {technique} />
</QueryClientProvider>
