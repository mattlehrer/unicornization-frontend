<script>
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let headline;
  export let votes;
  export let voted;

  const dispatch = createEventDispatcher();

  $: score = votes.reduce((acc, curr) => acc + curr.type, 0);
</script>

<div class="flex flex-row items-center w-full">
  <div class="flex flex-col items-center">
    <button
      on:click={() => dispatch('vote', { type: 1, ideaId: id })}
      class="-my-1 {voted && voted.type === 1 ? 'text-orange-600' : 'text-gray-500'}">
      ▲
    </button>
    <div id="score" class="text-gray-600 ">{score}</div>
    <button
      on:click={() => dispatch('vote', { type: -1, ideaId: id })}
      class="-my-1 {voted && voted.type === -1 ? 'text-orange-600' : 'text-gray-500'}">
      ▼
    </button>
  </div>
  <div class="ml-3 text-lg">{headline}</div>
</div>
