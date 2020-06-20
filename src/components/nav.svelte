<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  import Main from './nav/main.svelte';
  import { isMainSite } from '../utils/frontend-url';

  export let segment;
  const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
</script>

{#if segment === 'frame'}
  <!-- nothing -->
{:else if isMainSite(frontendBaseUrl, $session.host)}
  <Main {segment} />
{/if}
