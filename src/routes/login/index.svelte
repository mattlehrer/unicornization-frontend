<script>
  // import { stores } from '@sapper/app';
  // const { session } = stores();

  let username = '';
  let password;

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(process.env.API_BASE_URL + '/auth/signin', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) window.location.href = 'login/success';
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="username">Username</label>
  <input required type="username" id="username" bind:value={username} />

  <label for="password">Password</label>
  <input required type="password" id="password" bind:value={password} />

  <button type="submit">Sign in</button>
</form>
