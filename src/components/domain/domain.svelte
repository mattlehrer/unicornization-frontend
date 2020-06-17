<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { apiBaseUrl } from '../../utils/api';
  import Alert from '../../components/alert.svelte';
  import Idea from '../../components/idea/index.svelte';

  export let name;
  let domain;
  let ideas = [];
  let usersVotesByIdea = {};
  let headline;
  let iframe;
  let ideaPosted = false;
  let ideaPostError = false;

  onMount(async () => {
    await fetch(`${apiBaseUrl}/domain/${name}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res;
      })
      .then((data) => {
        // console.log('DOMAIN', data);
        domain = data;
      })
      .catch((err) => console.log('DOMAIN ERROR', { err }));

    fetchIdeas();
    fetchVotes();
  });

  let forwardIdea = async function (event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    console.log('forwarding idea', headline);

    iframe = document.getElementById('unicornization').contentWindow;
    iframe.postMessage({ idea: { headline }, domain }, 'http://localhost:3001');
  };

  let forwardVote = async function (event) {
    console.log('forwarding vote', event.detail);
    const { type, ideaId } = event.detail;
    iframe = document.getElementById('unicornization').contentWindow;
    iframe.postMessage(
      { vote: { type, ideaId }, domain },
      'http://localhost:3001'
    );
  };

  let handleMsgResponse = async function (event) {
    console.log(event.data);
    if (event.data.newIdea) {
      if (event.data.status === 201) {
        ideaPosted = headline;
        headline = '';
        ideaPostError = false;
        await fetchIdeas();
        await fetchVotes();
      } else {
        ideaPosted = false;
        console.log(event.data);
        ideaPostError = event.data.statusText;
      }
    } else if (event.data.newVote) {
      console.log(event.data.newVote);
      await fetchIdeas();
      await fetchVotes();
    }
  };

  let fetchIdeas = async function () {
    await fetch(`${apiBaseUrl}/idea/domain/${domain.id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        // console.log('DOMAIN', data);
        ideas = data;
      })
      .catch((err) => console.log('IDEAS ERROR', { err }));
  };

  let fetchVotes = async function () {
    await fetch(`${apiBaseUrl}/vote/domain/${domain.id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res);
      })
      .then((data) => {
        // console.log('DOMAIN', data);
        const usersVotes = data;
        usersVotes.forEach(
          (vote) =>
            (usersVotesByIdea[vote.idea.id] = {
              id: vote.id,
              type: vote.type,
            })
        );
      })
      .catch((err) => console.log('VOTES ERROR', { err }));
  };
</script>

<svelte:window on:message={handleMsgResponse} />

<svelte:head>
  <title>{name}</title>
</svelte:head>

<iframe
  class="absolute top-0 right-0"
  title="Unicornization"
  name="unicornization"
  id="unicornization"
  src="http://localhost:3001/frame" />

{#if ideaPosted}
  <div
    class="w-11/12 max-w-md mx-auto my-6 sm:w-3/5"
    out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => (ideaPosted = '')}
      type="success"
      title="That worked!"
      content={`Posted ${ideaPosted}`} />
  </div>
{/if}

{#if domain}
  <div class="mx-auto mt-16">
    <h1 class="text-4xl font-light text-center h1">{domain.name}</h1>
  </div>

  <div class="mx-auto mt-12 mb-8">
    <h2 class="text-2xl font-hairline text-center h2">
      What do you wish you found here?
    </h2>
  </div>

  <div class="w-11/12 mx-auto my-6 sm:w-5/12">
    <form on:submit|preventDefault={forwardIdea}>
      <div class="flex flex-row mx-auto">
        <div class="flex-grow mb-4 mr-3">
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="idea"
            type="text"
            placeholder="What would you build?"
            bind:value={headline} />
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

    <!-- ideas -->
    {#if Array.isArray(ideas)}
      {#each ideas as idea (idea.id)}
        <div class="my-4">
          <Idea
            on:vote={forwardVote}
            {...idea}
            voted={usersVotesByIdea[idea.id]} />
        </div>
      {/each}
    {/if}
  </div>
{/if}
