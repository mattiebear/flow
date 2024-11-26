<script>
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import Form from './technique_form/Form.svelte';

  let client = new QueryClient();
</script>

<QueryClientProvider {client}>
  <Form />
</QueryClientProvider>
