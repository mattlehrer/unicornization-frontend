<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let title;
  export let content;
  export let type;

  let color;

  switch (type) {
    case 'error': {
      color = 'red';
      break;
    }
    case 'warn': {
      color = 'orange';
      break;
    }
    case 'info': {
      color = 'blue';
      break;
    }
    case 'success': {
      color = 'green';
      break;
    }
    default: {
      color = 'blue';
      break;
    }
  }

  const close = (e) => {
    dispatch('close', e.detail);
  };
</script>

<div
  class="bg-{color}-100 border border-{color}-400 text-{color}-700 px-4 py-3
  rounded relative"
  role="alert">
  <strong class="font-bold">{title}</strong>
  <p class="inline pr-5">{content}</p>
  <span on:click={close} class="absolute top-0 bottom-0 right-0 px-3 py-3">
    <svg
      class="fill-current h-6 w-6 text-{color}-500"
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20">
      <title>Close</title>
      <path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0
        1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10
        8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2
        1.2 0 0 1 0 1.698z" />
    </svg>
  </span>
</div>
