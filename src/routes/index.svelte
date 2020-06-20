<script context="module">
  export async function preload(page) {
    const { host } = page;

    // console.log({ host });
    let name = host.split(':')[0];
    return { name };
  }
</script>

<script>
  import Landing from './_landing.svelte';
  import Domain from '../components/domain/domain.svelte';
  import { isMainSite } from '../utils/frontend-url';

  const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
  export let name;
</script>

{#if isMainSite(frontendBaseUrl, name)}
  <Landing />
{:else}
  <Domain {name} />
{/if}
