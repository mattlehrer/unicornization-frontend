<script>
  const apiBaseUrl = process.env.API_BASE_URL;
</script>

<svelte:head>
  <title>Sapper + TailwindCSS Starter</title>
</svelte:head>

<div class="container mx-auto my-5">
  <a class="btn btn-primary" href="/login">User/pass login</a>

  <a class="btn btn-primary" href="{apiBaseUrl}/auth/google">Google login</a>

  <a class="btn btn-primary" href="{apiBaseUrl}/auth/facebook">
    Facebook login
  </a>

  <a class="btn btn-primary" href="{apiBaseUrl}/auth/github">Github login</a>

  <a class="btn btn-primary" href="{apiBaseUrl}/auth/twitter">Twitter login</a>
</div>
