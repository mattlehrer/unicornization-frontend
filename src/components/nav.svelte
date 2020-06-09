<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    /* padding: 0 1em; */
  }
  [aria-current] {
    position: relative;
    display: inline-block;
  }
  [aria-current]::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }
  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav class="m-2 md:mx-16">
  <ul class="flex flex-row justify-between">
    <div class="flex flex-row">
      <li>
        <a aria-current={segment === undefined ? 'page' : undefined} href=".">
          home
        </a>
      </li>
      {#if !$session.user}
        <li>
          <a
            aria-current={segment === 'about' ? 'page' : undefined}
            href="about">
            how it works
          </a>
        </li>
        <li>
          <a
            aria-current={segment === 'pricing' ? 'page' : undefined}
            href="pricing">
            pricing
          </a>
        </li>
      {/if}
    </div>
    <div class="flex flex-row">
      {#if $session.user}
        <li>
          <a aria-current={segment === 'add' ? 'page' : undefined} href="add">
            add a domain
          </a>
        </li>
        <li>
          <a
            aria-current={segment === 'profile' ? 'page' : undefined}
            href="profile">
            profile
          </a>
        </li>
        <li>
          <a
            aria-current={segment === 'settings' ? 'page' : undefined}
            href="settings">
            settings
          </a>
        </li>
        <li>
          <a
            aria-current={segment === 'logout' ? 'page' : undefined}
            href="logout">
            logout
          </a>
        </li>
      {:else}
        <li>
          <a
            aria-current={segment === 'signup' ? 'page' : undefined}
            href="signup">
            sign up
          </a>
        </li>
        <li>
          <a
            aria-current={segment === 'login' ? 'page' : undefined}
            href="login">
            login
          </a>
        </li>
      {/if}
    </div>
  </ul>
</nav>
