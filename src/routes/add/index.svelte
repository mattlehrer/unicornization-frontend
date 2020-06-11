<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  import { onMount } from 'svelte';
  import { apiBaseUrl } from '../../utils/api';

  let mounted = false;

  onMount(() => {
    if (!$session.user) {
      window.location.href = '/signup';
      // TODO: add flash
    } else {
      mounted = true;
    }
  });

  let domain = '';

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(`${apiBaseUrl}/domain`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain }),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    // if (response.ok) TODO: Flash domain added
  };
</script>

{#if mounted}
  <div class="w-full max-w-md mx-auto">
    <div class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="domain">
            Domain
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="domain"
            type="text"
            placeholder="yourdomain.com"
            bind:value={domain} />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="btn btn-primary btn-primary:hover btn:focus"
            type="submit">
            Add Domain
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
