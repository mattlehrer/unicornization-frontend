<script>
  import { stores } from '@sapper/app';
  import Nav from '../components/nav.svelte';
  import { isMainSite } from '../utils/frontend-url';

  const { session } = stores();
  export let segment;
  const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
</script>

{#if isMainSite(frontendBaseUrl, $session.host)}
  <Nav {segment} />
{/if}

<main class="mx-2 my-4 overflow-hidden md:mx-16 md:my-8">
  <slot />
</main>
