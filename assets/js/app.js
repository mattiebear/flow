import { createInertiaApp } from '@inertiajs/svelte';
import { mount } from 'svelte';

createInertiaApp({
  resolve: async (name) => await import(`./components/pages/${name}.svelte`),
  setup({ el, App, props }) {
    mount(App, { target: el, props });
  },
});
