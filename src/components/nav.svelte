<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  import Main from './nav/main.svelte';
  import { isMainSite } from '../utils/frontend-url';

  export let segment;
  let user = $session.user;
</script>

{#if segment === 'frame'}
  <!-- nothing -->
{:else if isMainSite($session.host)}
  <Main {segment} {user} />
{/if}
