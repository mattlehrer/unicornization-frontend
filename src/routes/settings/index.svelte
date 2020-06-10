<script>
  import * as animateScroll from 'svelte-scrollto';
  import { slide } from 'svelte/transition';
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  import isUUID from 'validator/es/lib/isUUID';
  import isEmail from 'validator/es/lib/isEmail';
  import Alert from '../../components/alert.svelte';

  const { session } = stores();
  const apiBaseUrl = process.env.API_BASE_URL;

  let mounted = false;
  let shouldUsernameUUIDAlert = false;
  let saved = false;
  let username = $session.user.username;
  let email = $session.user.email;
  let user;
  let password;
  let newPassword;
  let reenterNewPassword;
  let alertMsg = '';

  // TODO: if email is falsy, ask user for email address

  onMount(async () => {
    if (!$session.user) {
      window.location.href = '/signup';
    } else {
      fetch(apiBaseUrl + '/me', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('SETTINGS', data);
          user = data;
          ({ username, email } = user);
          if (username && isUUID(username)) {
            shouldUsernameUUIDAlert = true;
            username = '';
          }
        })
        .catch((err) => console.log('SETTINGS ERROR', { err }));

      if (username && isUUID(username)) {
        shouldUsernameUUIDAlert = true;
        username = '';
      }
      mounted = true;
    }
  });

  let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(apiBaseUrl + '/me', {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        oldPassword: password,
        newPassword,
      }),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) {
      shouldUsernameUUIDAlert = isUUID(username || $session.user.username);
      saved = true;
    } else {
      const error = await response.json();
      console.log(error);
      alertMsg = error.detail;
    }
    animateScroll.scrollToTop({ duration: 300 });
  };

  $: validate =
    (password && newPassword && newPassword === reenterNewPassword) ||
    (email && isEmail(email) && email !== $session.user.email) ||
    (username && username !== $session.user.username);
</script>

{#if alertMsg}
  <div class="w-full max-w-md mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => (alertMsg = '')}
      type="error"
      title="Uh oh!"
      content={alertMsg} />
  </div>
{/if}

{#if mounted}
  {#if shouldUsernameUUIDAlert}
    <div
      class="w-full max-w-md mx-auto my-6"
      out:slide|local={{ duration: 350 }}>
      <Alert
        on:close={() => (shouldUsernameUUIDAlert = false)}
        type="warn"
        title="Heads up!"
        content="Please pick a username to set up a profile." />
    </div>
  {/if}
  {#if saved}
    <div
      class="w-full max-w-md mx-auto my-6"
      out:slide|local={{ duration: 350 }}>
      <Alert
        on:close={() => (saved = false)}
        type="success"
        title="That worked."
        content="Your changes have been saved." />
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
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
            Email
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            bind:value={email} />
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="password">
            Current Password
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            bind:value={password} />
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="newPassword">
            New Password
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="******************"
            bind:value={newPassword} />
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-bold text-gray-700"
            for="reenterNewPassword">
            Reenter New Password
          </label>
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded
            shadow appearance-none focus:outline-none focus:shadow-outline"
            id="reenterNewPassword"
            type="password"
            placeholder="******************"
            bind:value={reenterNewPassword} />
        </div>
        <div class="flex items-center">
          <button
            class="btn btn-primary btn-primary:hover btn:focus"
            disabled={!validate}
            type="submit">
            Update Settings
          </button>
        </div>
      </form>

      {#if user}
        <h2 class="mt-5 h2">Link your accounts</h2>

        <div class="flex flex-wrap justify-between">
          {#if !user.google}
            <a
              class="mt-2 mb-5 text-gray-100 bg-gray-600 btn"
              href="{apiBaseUrl}/auth/google">
              Google
            </a>
          {/if}

          {#if !user.facebook}
            <a
              class="mt-2 mb-5 text-gray-100 bg-gray-600 btn"
              href="{apiBaseUrl}/auth/facebook">
              Facebook
            </a>
          {/if}

          {#if !user.github}
            <a
              class="mt-2 mb-5 text-gray-100 bg-gray-600 btn"
              href="{apiBaseUrl}/auth/github">
              Github
            </a>
          {/if}

          {#if !user.twitter}
            <a
              class="mt-2 mb-5 text-gray-100 bg-gray-600 btn"
              href="{apiBaseUrl}/auth/twitter">
              Twitter
            </a>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}
