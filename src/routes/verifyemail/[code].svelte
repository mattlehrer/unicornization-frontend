<script context="module">
  export async function preload(page) {
    const { code } = page.params;

    return { code };
  }
</script>

<script>
  import Alert from '../../components/alert.svelte';
  import { apiBaseUrl } from '../../utils/api';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let code;

  let resError = false;
  let resErrorDetail = '';
  let emailConfirmed = false;

  onMount(async () => {
    const response = await fetch(`${apiBaseUrl}/verify-email/${code}`, {
      mode: 'cors',
      credentials: 'include',
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) {
      emailConfirmed = true;
    } else {
      resError = response.status;
      resErrorDetail = response.json().detail;
    }
  });
</script>

{#if resError === 404}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => {
        window.location.href = '/verifyemail/resend';
      }}
      type="error"
      title="Uh Oh!"
      content="That email confirmation link expired. We can send you a new one." />
  </div>
{:else if resError}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => {
        window.location.href = '/verifyemail/resend';
      }}
      type="error"
      title="Uh Oh!"
      content={resErrorDetail} />
  </div>
{:else if emailConfirmed}
  <div class="w-full max-w-lg mx-auto my-6" out:slide|local={{ duration: 350 }}>
    <Alert
      on:close={() => (window.location.href = '/')}
      type="success"
      title="Email confirmed!"
      content="Thank you." />
  </div>
{/if}
