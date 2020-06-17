<script>
  import { stores } from '@sapper/app';
  import { apiBaseUrl } from '../../utils/api';
  const { session } = stores();

  const user = $session.user;
  let parentWindow;
  let domain;

  const loginWindow = () => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
    window.open(
      'http://localhost:3001/login',
      'Log in to Unicornization',
      params
    );
  };

  let messageHandler = async function (event) {
    if (event.data) {
      parentWindow = event.source;
      if (event.data.domain) {
        domain = event.data.domain;
      }
      if (event.data.idea)
        return handleIdeaSubmit({
          headline: event.data.idea.headline,
          domainId: domain.id,
        });
      else if (event.data.vote)
        return handleVote({
          type: event.data.vote.type,
          ideaId: event.data.vote.ideaId,
        });
    }
  };

  let handleIdeaSubmit = async function ({ headline, domainId }) {
    if (!user) {
      loginWindow();
      return;
    }

    const ideaDto = {
      headline,
      domainId,
    };
    const ideaSent = {};
    await fetch(`${apiBaseUrl}/idea`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ideaDto),
    })
      .then((res) => {
        ideaSent.status = res.status;
        ideaSent.statusText = res.statusText;
        return res.json();
      })
      .then((res) => {
        ideaSent.newIdea = res;
      })
      .catch((err) => {
        console.log({ err });
        ideaSent.error = err;
      });
    parentWindow.postMessage(ideaSent, `http://${domain.name}:3001`);
  };

  let handleVote = async function ({ type, ideaId }) {
    if (!user) {
      loginWindow();
      return;
    }

    const voteDto = {
      type,
      ideaId,
    };
    const voteSent = {};
    await fetch(`${apiBaseUrl}/vote`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteDto),
    })
      .then((res) => {
        voteSent.status = res.status;
        voteSent.statusText = res.statusText;
        if (res.ok) return res.json();
        if (res.status === 304) true;
        return null;
      })
      .then((res) => {
        voteSent.newVote = res;
      })
      .catch((err) => {
        console.log({ err });
        voteSent.error = err;
      });
    parentWindow.postMessage(voteSent, `http://${domain.name}:3001`);
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

<svelte:window on:message={messageHandler} />

<div class="flex flex-row-reverse">

  <a
    href="http://localhost:3001"
    target="_blank"
    class="mx-5 text-3xl text-right -translate-x-4 flip-x">
    🦄
  </a>
</div>
