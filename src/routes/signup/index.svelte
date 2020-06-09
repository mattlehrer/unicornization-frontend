<script>
  const apiBaseUrl = process.env.API_BASE_URL;

  let username = '';
  let email = '';
  let password;

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(process.env.API_BASE_URL + '/auth/signup', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) window.location.href = 'login/success';
  };
</script>

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
      <div class="flex flex-row items-center">
        <button
          class="flex-shrink-0 btn btn-primary btn-primary:hover btn:focus"
          type="submit">
          Sign Up
        </button>
        <div class="ml-5 text-sm">
          By signing up, you agree to our
          <a href="/terms">terms of service</a>
          and
          <a href="/privacy">privacy policy</a>
          .
        </div>
      </div>
    </form>

    <h2 class="mt-10 mb-2 h2">Or Sign Up With</h2>
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
