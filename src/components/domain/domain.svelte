<script>
  import { onMount } from 'svelte';
  import { apiBaseUrl } from '../../utils/api';

  export let name;
  let domain;
  // let idea;
  // let receiver;

  onMount(() => {
    fetch(`${apiBaseUrl}/domain/${name}`, {
      method: 'GET',
      mode: 'cors',
      // credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('DOMAIN', data);
        domain = data;
      })
      .catch((err) => console.log('DOMAIN ERROR', { err }));
  });

  // let forwardIdea = async function (event) {
  //   event.preventDefault();
  //   if (!event.target.checkValidity()) {
  //     return;
  //   }
  //   console.log('forwarding idea', idea);

  //   receiver = document.getElementById('unicornization').contentWindow;
  //   // console.log(receiver);
  //   receiver.postMessage({ idea, domain }, 'http://localhost:3001');
  // };
</script>

<!-- Domain page -->
<svelte:head>
  <title>{name}</title>
</svelte:head>

<iframe
  class="absolute top-0 right-0"
  title="Unicornization"
  name="unicornization"
  id="unicornization"
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
    <iframe
      src="http://localhost:3001/frame/idea"
      name="idea"
      title="idea"
      width="100%" />
  </div>
{/if}
