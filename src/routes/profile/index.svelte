<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  import { onMount } from 'svelte';
  import isUUID from 'validator/es/lib/isUUID';

  let mounted = false;
  let username = '';

  onMount(() => {
    if (!$session.user) {
      window.location.href = '/signup';
      // TODO: add flash
    } else if (isUUID($session.user.username)) {
      window.location.href = '/settings';
      // TODO: add flash
    } else {
      username = $session.user.username;
      mounted = true;
    }
  });
</script>

{#if mounted}
  <h1 class="h1">{username}'s Profile</h1>

  <h2 class="h2">Domains:</h2>

  <h2 class="h2">Ideas:</h2>

  <h2 class="h2">Votes:</h2>
{/if}
