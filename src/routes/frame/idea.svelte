<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { stores } from '@sapper/app';
  import { apiBaseUrl } from '../../utils/api';
  const { session } = stores();

  const user = $session.user;
  let headline;
  let domain;
  // let msg = 'init';

  onMount(() => {
    fetch(`${apiBaseUrl}/me`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ user });
        console.log('ME', data);
        // domain = data;
      })
      .catch((err) => console.log('DOMAIN ERROR', { err }));
  });

  const loginWindow = () => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
    window.open(
      'http://localhost:3001/login',
      'Log in to Unicornization',
      params
    );
  };

  export let handleIdeaSubmit = async function (event) {
    if (!user) {
      loginWindow();
      return;
    }

    console.log(event);
    // const { idea, domain } = event.data;
    const ideaDto = {
      headline,
      domain,
    };
    axios
      .post(`${apiBaseUrl}/idea`, ideaDto, { withCredentials: true })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const response = await fetch(`${apiBaseUrl}/idea`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(ideaDto),
    // }).catch((err) => console.log({ err }));
    // console.log({ response });
    // if (response.ok) {
    //   // alert: posted!
    //   console.log(response);
    // } else {
    //   // alert: failed!
    //   console.log(response);
    // }
    // console.log(await response.json());
  };
</script>

<form on:submit|preventDefault={handleIdeaSubmit}>
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
      <button class="btn btn-primary btn-primary:hover btn:focus" type="submit">
        Submit
      </button>
    </div>
  </div>
</form>
