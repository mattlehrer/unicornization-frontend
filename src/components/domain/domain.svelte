<script>
  import { onMount } from 'svelte';
  import { apiBaseUrl } from '../../utils/api';

  export let name;
  let domain;
  let idea;

  onMount(() => {
    fetch(`${apiBaseUrl}/domain/${name}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('DOMAIN', data);
        domain = data;
      })
      .catch((err) => console.log('DOMAIN ERROR', { err }));
  });

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(`${apiBaseUrl}/idea`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea }),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) {
      // alert: posted!
    } else {
      // alert: failed!
    }
  };
</script>

<!-- Domain page -->
<svelte:head>
  <title>{name}</title>
</svelte:head>

<iframe
  class="absolute top-0 right-0"
  title="Unicornization"
  src="http://localhost:3001/frame" />

{#if domain}
  <!-- <p class="m-5">{JSON.stringify(domain)}</p> -->
  <div class="mx-auto mt-16">
    <h2 class="text-2xl font-hairline text-center h2">
      What do you wish you found here?
    </h2>
  </div>

  <div class="mx-auto my-12">
    <h1 class="text-4xl font-light text-center h1">{domain.name}</h1>
  </div>

  <div class="w-11/12 mx-auto my-6 sm:w-5/12">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-row mx-auto">
        <div class="flex-grow mb-4 mr-3">
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="idea"
            type="text"
            placeholder="What would you build?"
            bind:value={idea} />
        </div>
        <div>
          <button
            class="btn btn-primary btn-primary:hover btn:focus"
            type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
{/if}
