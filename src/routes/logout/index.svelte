<script>
  import { apiBaseUrl } from '../../utils/api';

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
    if (response.ok) window.location.href = '/';
  };
  logout();
</script>
