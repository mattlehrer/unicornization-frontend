<svelte:head>
  <title>Unicornization</title>
</svelte:head>

<div>

  <div
    class="container flex flex-col flex-wrap items-center px-3 mx-auto
    md:flex-row">
    <!--Left Col-->
    <div
      class="flex flex-col items-start justify-center w-full text-center
      md:w-2/5 md:text-left">
      <!-- <p class="w-full uppercase tracking-loose">What business are you?</p> -->
      <h1 class="my-4 text-3xl font-bold leading-tight md:text-5xl">
        The social network for parked domains.
      </h1>
      <p
        class="mx-auto mb-8 text-lg leading-normal md:text-2xl md:text-left
        md:mx-0">
        If you owned it, what you build?
      </p>

      <button
        class="px-8 py-4 mx-auto my-6 font-bold text-gray-800 bg-white
        rounded-full shadow-lg lg:mx-0 hover:underline">
        <a href="/signup">Add domains for free</a>
      </button>

    </div>
    <!--Right Col-->
    <div class="invisible py-6 text-center md:w-3/5 md:visible">
      <img
        class="z-50 w-full"
        alt="waiting computer user"
        src="https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80" />
    </div>

  </div>

</div>
