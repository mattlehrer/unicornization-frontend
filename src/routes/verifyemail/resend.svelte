<script>
  import Alert from '../../components/alert.svelte';
  import { apiBaseUrl } from '../../utils/api';
  import { slide } from 'svelte/transition';
  import isEmail from 'validator/es/lib/isEmail';

  let emailResent = false;
  let email = '';

  let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }
    await fetch(`${apiBaseUrl}/resend-verify-email/`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).catch((err) => console.log({ err }));
    emailResent = true;
  };
</script>

{#if emailResent}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => (window.location.href = '/')}
      type="success"
      title="Email sent."
      content="Please check your inbox." />
  </div>
{/if}

<div class="container mx-auto out:slide|local={{ delay: 200, duration: 1000 }}">
  <div class="flex justify-center px-6 my-8">
    <div class="w-full p-5 bg-white rounded-lg lg:w-1/2 lg:rounded-l-none">
      <div class="px-8 mb-4 text-center">
        <h3 class="pt-4 mb-2 text-2xl">Resend Verification Email</h3>

      </div>
      <form
        class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
        on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
            Email to Confirm
          </label>
          <input
            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border
            rounded shadow appearance-none focus:outline-none
            focus:shadow-outline"
            id="email"
            type="email"
            placeholder="*************"
            bind:value={email} />
        </div>

        <div class="mb-6">
          <button
            class="btn btn-primary"
            type="submit"
            disabled={!isEmail(email)}>
            Resend Email
          </button>
        </div>
      </form>
    </div>
    <!-- </div> -->
  </div>
</div>
