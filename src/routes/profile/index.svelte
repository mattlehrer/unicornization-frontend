<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  import { onMount } from 'svelte';
  import isUUID from 'validator/es/lib/isUUID';
  import { apiBaseUrl } from '../../utils/api';

  let mounted = false;
  let username = '';

  onMount(() => {
    if (!$session.user) {
      window.location.href = '/signup';
    } else if (isUUID($session.user.username)) {
      window.location.href = '/settings';
    } else {
      username = $session.user.username;
      mounted = true;
    }
  });

  async function fetchData(table) {
    const res = await fetch(
      `${apiBaseUrl}/${table}/user/${$session.user.sub}`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }
</script>

{#if mounted}
  <div class="w-full mx-auto sm:w-3/5">
    <h1 class="text-3xl h1">{username}'s Profile</h1>

    {#await fetchData('domain')}
      <h2 class="my-5 text-xl h2">Loading Domains...</h2>
    {:then domains}
      {#if domains.length}
        <h2 class="my-5 text-xl h2">Domains:</h2>
        {JSON.stringify(domains)}
      {:else}
        <div class="my-5 text-lg">
          This is a great time to
          <a class="text-blue-600 hover:text-blue-800" href="/add">
            add your first domain!
          </a>
        </div>
      {/if}
    {:catch error}
      <p class="text-red-500">{error.message}</p>
    {/await}

    {#await fetchData('idea')}
      <h2 class="my-5 text-xl h2">Loading Ideas...</h2>
    {:then ideas}
      <h2 class="my-5 text-xl h2">Ideas:</h2>
      {#if ideas.length}{JSON.stringify(ideas)}{/if}
    {:catch error}
      <p class="text-red-500">{error.message}</p>
    {/await}

    {#await fetchData('vote')}
      <h2 class="my-5 text-xl h2">Loading Votes...</h2>
    {:then votes}
      <h2 class="my-5 text-xl h2">Votes:</h2>
      {#if votes.length}{JSON.stringify(votes)}{/if}
    {:catch error}
      <p class="text-red-500">{error.message}</p>
    {/await}
  </div>
{/if}
