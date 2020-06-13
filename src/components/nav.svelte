<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  import Main from './nav/main.svelte';

  export let segment;
  let user = $session.user;
</script>

{#if segment === 'frame'}
  <!-- nothing -->
{:else if ['localhost', '127.0.0.1'].includes($session.host)}
  <Main {segment} {user} />
{/if}
