<script>
  import { slide } from 'svelte/transition';
  import Alert from '../../components/alert.svelte';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { apiBaseUrl } from '../../utils/api';

  const { session } = stores();

  let mounted = false;
  let loginFail = false;
  let username = '';
  let password;

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(`${apiBaseUrl}/auth/signin`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) window.location.href = '/';
    else {
      loginFail = true;
    }
  };

  onMount(async () => {
    if ($session.user) {
      window.location.href = '/';
    }
    mounted = true;
  });
</script>

{#if mounted}
  {#if loginFail}
    <div
      class="w-full max-w-md mx-auto my-6"
      out:slide|local={{ duration: 350 }}>
      <Alert
        on:close={() => (loginFail = false)}
        type="error"
        title=""
        content="Incorrect username or password" />
    </div>
  {/if}

  <div class="w-full max-w-md mx-auto">
    <div class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="username">
            Username
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            bind:value={username} />
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="password">
            Password
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            bind:value={password} />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="btn btn-primary btn-primary:hover btn:focus"
            type="submit">
            Sign In
          </button>
          <a
            class="inline-block text-sm font-bold text-blue-500 align-baseline
            hover:text-blue-800"
            href="/forgotpassword">
            Forgot Password?
          </a>
        </div>
      </form>

      <h2 class="mt-10 mb-2 h2">Or Login With</h2>
      <div class="flex flex-wrap justify-between">
        <a class="mt-2 mb-5 btn btn-primary" href="{apiBaseUrl}/auth/google">
          Google
        </a>

        <a class="mt-2 mb-5 btn btn-primary" href="{apiBaseUrl}/auth/facebook">
          Facebook
        </a>
        <a class="mt-2 mb-5 btn btn-primary" href="{apiBaseUrl}/auth/github">
          Github
        </a>

        <a class="mt-2 mb-5 btn btn-primary" href="{apiBaseUrl}/auth/twitter">
          Twitter
        </a>
      </div>
    </div>
  </div>
{/if}
