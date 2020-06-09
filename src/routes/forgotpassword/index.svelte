<script>
  let email = '';
  let sent = false;

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }

    const response = await fetch(
      process.env.API_BASE_URL + '/auth/forgot-password',
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    ).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) sent = true;
  };
</script>

{#if !sent}
  <div class="container mx-auto">
    <div class="flex justify-center px-6 my-12">
      <!-- <div class="flex w-full xl:w-3/4 lg:w-11/12">
        <div
          class="hidden w-full h-auto bg-gray-400 bg-cover rounded-l-lg lg:block lg:w-1/2"
          style="background-image:
          url('https://source.unsplash.com/oWTW-jNGl9I/600x800')" /> -->
      <div class="w-full p-5 bg-white rounded-lg lg:w-1/2 lg:rounded-l-none">
        <div class="px-8 mb-4 text-center">
          <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
          <p class="mb-4 text-sm text-gray-700">
            We get it, stuff happens. Just enter your email address below and
            we'll send you a link to reset your password!
          </p>
        </div>
        <form
          class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          on:submit|preventDefault={handleSubmit}>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-bold text-gray-700"
              for="email">
              Email
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border
              rounded shadow appearance-none focus:outline-none
              focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter Email Address..."
              bind:value={email} />
          </div>
          <div class="mb-6 text-center">
            <button
              class="w-full px-4 py-2 font-bold text-white bg-red-500
              rounded-full hover:bg-red-700 focus:outline-none
              focus:shadow-outline"
              type="submit">
              Reset Password
            </button>
          </div>
          <hr class="mb-6 border-t" />
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline
              hover:text-blue-800"
              href="/signup">
              Create an Account!
            </a>
          </div>
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline
              hover:text-blue-800"
              href="/login">
              Already have an account? Login!
            </a>
          </div>
        </form>
      </div>
      <!-- </div> -->
    </div>
  </div>
{:else}Recover email sent{/if}
