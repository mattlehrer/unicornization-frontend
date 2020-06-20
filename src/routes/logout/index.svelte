<script>
  import { stores } from '@sapper/app';
  import { apiBaseUrl } from '../../utils/api';

  const { session } = stores();

  let logout = async function () {
    const response = await fetch(`${apiBaseUrl}/auth/logout`, {
      mode: 'cors',
      credentials: 'include',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((err) => console.log({ err }));
    console.log({ response });
    session.update((session) => {
      return {
        ...session,
        user: null,
      };
    });
    window.location.href = '/';
  };
  logout();
</script>
