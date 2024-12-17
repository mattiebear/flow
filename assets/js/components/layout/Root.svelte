<script>
  import { Link } from '@inertiajs/svelte';
  import { onMount } from 'svelte';

  import Button from '../common/Button.svelte';
  import Menu from '../common/Menu.svelte';
  import MenuOption from '../common/MenuOption.svelte';
  import DarkModeToggle from '../widgets/DarkModeToggle.svelte';

  let { children, currentUser, currentUserAvatarUrl } = $props();
  let isMenuOpen = $state(false);

  const STORAGE_KEY = 'mode-toggle';

  onMount(() => {
    let mode = localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    let root = document.querySelector('html');

    let setMode = (mode) => {
      localStorage.setItem(STORAGE_KEY, mode);
      root.className = mode;
    };

    setMode(mode);
  });
</script>

<header class="border-b border-b-zinc-800 border-b-solid">
  <div
    class="container m-auto py-2 px-4 flex flex-row justify-between h-[80px]"
  >
    <div class="w-[64px]">
      <Link href="/">
        <img src="/images/logo.png" alt="Flow BBJ logo" class="h-full w-auto" />
      </Link>
    </div>

    <div class="flex flex-row items-center gap-x-4">
      {#if currentUser}
        <Menu isOpen={isMenuOpen}>
          {#snippet trigger()}
            <button
              class="rounded-full overflow-hidden h-[64px]"
              onclick={() => (isMenuOpen = !isMenuOpen)}
            >
              <div class="bg-indigo-900 h-full p-1.5 relative">
                <div
                  class="absolute right-2 h-full w-1.5 bg-gradient-to-b from-zinc-200 to-zinc-300 z-0"
                ></div>

                <img
                  alt={`Profile image for user ${currentUser.email}`}
                  src={currentUserAvatarUrl}
                  class="object-contain h-full rounded-full relative"
                />
              </div>
            </button>
          {/snippet}

          {#snippet content()}
            <span>{currentUser.email}</span>
            <hr class="my-2" />
            <ul class="flex flex-col gap-y-2">
              <li>
                <div class="flex row justify-between px-2 py-1.5">
                  Dark mode
                  <DarkModeToggle />
                </div>
              </li>
              <li>
                <Link href="/users/settings">
                  <MenuOption>Settings</MenuOption>
                </Link>
              </li>

              <li>
                <Link href="/users/log_out">
                  <MenuOption>Log out</MenuOption>
                </Link>
              </li>
            </ul>
          {/snippet}
        </Menu>
      {:else}
        <Link href="/users/log_in">
          <Button variant="outline" tabindex="-1">Log in</Button>
        </Link>

        <Link href="/users/register">
          <Button variant="solid" tabindex="-1">Sign up</Button>
        </Link>
      {/if}
    </div>
  </div>
</header>

<div class="container m-auto px-4">
  {@render children()}
</div>
