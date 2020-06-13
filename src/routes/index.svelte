<script context="module">
  export async function preload(page) {
    const { host } = page;

    console.log({ host });
    let name = host.split(':')[0];
    return { name };
  }
</script>

<script>
  import Landing from './_landing.svelte';
  import Domain from '../components/domain/domain.svelte';

  export let name;
</script>

{#if ['localhost', '127.0.0.1'].includes(name)}
  <Landing />
{:else}
  <Domain {name} />
{/if}
