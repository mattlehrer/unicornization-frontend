<script context="module">
  export async function preload(page) {
    const { code } = page.params;

    return { code };
  }
</script>

<script>
  import Alert from '../../components/alert.svelte';
  import { slide } from 'svelte/transition';
  import { passwordRule, isStrongPassword } from '../../utils/password';

  export let code;

  let newPassword = '';
  let confirmPassword = '';
  let resOk = false;
  let resError = 0;
  let warn = false;

  export let handleSubmit = async function (event) {
    if (!event.target.checkValidity()) {
      return;
    }
    console.log({ code, newPassword });

    const response = await fetch(
      process.env.API_BASE_URL + '/auth/reset-password/',
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, newPassword }),
      }
    ).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) {
      resOk = true;
    } else {
      resError = response.status;
    }
  };

  const shouldWarn = () => {
    if (!isStrongPassword(newPassword)) warn = true;
    else warn = false;
  };
</script>

{#if !resOk && !resError}
  <div
    class="container mx-auto out:slide|local={{ delay: 200, duration: 1000 }}">
    <div class="flex justify-center px-6 my-12">
      <div class="w-full p-5 bg-white rounded-lg lg:w-1/2 lg:rounded-l-none">
        <div class="px-8 mb-4 text-center">
          <h3 class="pt-4 mb-2 text-2xl">Reset Your Password</h3>

        </div>
        <form
          class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          on:submit|preventDefault={handleSubmit}>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-bold text-gray-700"
              for="newPassword">
              New Password
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border
              rounded shadow appearance-none focus:outline-none
              focus:shadow-outline {warn ? 'border-red-500' : ''}"
              id="newPassword"
              type="password"
              placeholder="*************"
              on:blur={shouldWarn}
              bind:value={newPassword} />
            {#if !isStrongPassword(newPassword)}
              <p
                class="px-3 pt-2 text-xs italic {warn ? 'text-red-500' : 'text-gray-600'}"
                transition:slide|local={{ duration: 300 }}>
                {passwordRule}
              </p>
            {/if}
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-bold text-gray-700"
              for="confirmPassword">
              Confirm Password
            </label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border
              rounded shadow appearance-none focus:outline-none
              focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="*************"
              bind:value={confirmPassword} />
          </div>
          <div class="mb-6">
            <button
              class="btn btn-primary"
              type="submit"
              disabled={!(newPassword && newPassword === confirmPassword)}>
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <!-- </div> -->
    </div>
  </div>
{:else if resError === 404}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => (window.location.href = '/forgotpassword')}
      type="error"
      title="Uh Oh!"
      content="That password reset link expired. We can send you a new one." />
  </div>
{:else if resError}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => {
        resOk = false;
        resError = false;
      }}
      type="error"
      title="Uh Oh!"
      content="Please use a strong password." />
  </div>
{:else}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => (window.location.href = '/signin')}
      type="success"
      title="Password reset!"
      content="Please log in with your new password." />
  </div>
{/if}
