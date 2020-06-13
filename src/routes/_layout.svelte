<script>
  import { stores } from '@sapper/app';
  import Nav from '../components/nav.svelte';

  const { session } = stores();
  export let segment;
</script>

{#if ['localhost', '127.0.0.1'].includes($session.host)}
  <Nav {segment} />
{/if}

<main class="mx-2 my-4 overflow-hidden md:mx-16 md:my-8">
  <slot />
</main>
