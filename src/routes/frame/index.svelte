<script>
  import { stores } from '@sapper/app';
  import { apiBaseUrl } from '../../utils/api';
  const { session } = stores();

  const user = $session.user;

  const loginWindow = () => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
    window.open(
      'http://localhost:3001/login',
      'Log in to Unicornization',
      params
    );
  };

  export let handleIdeaSubmit = async function (event) {
    console.log(user);

    if (!user) {
      loginWindow();
      return;
    }

    const { idea, domain } = event.data;
    const ideaDto = {
      headline: idea,
      domain,
    };
    const response = await fetch(`${apiBaseUrl}/idea`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ideaDto),
    }).catch((err) => console.log({ err }));
    console.log({ response });
    if (response.ok) {
      // alert: posted!
      console.log(response);
    } else {
      // alert: failed!
      console.log(response);
    }
    console.log(await response.json());
  };
</script>

<style>
  .flip-x {
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
</style>

<svelte:window on:message={handleIdeaSubmit} />

<div class="flex flex-row-reverse">

  <a
    href="http://localhost:3001"
    target="_blank"
    class="mx-5 text-3xl text-right -translate-x-4 flip-x">
    🦄
  </a>
</div>
