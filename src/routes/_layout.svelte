<script>
  import Nav from '../components/nav.svelte';
  export let segment;
</script>

<Nav {segment} />

<main class="mx-2 my-4 overflow-hidden md:mx-16 md:my-8">
  <slot />
</main>
