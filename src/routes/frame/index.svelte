<script>
  // import { stores } from '@sapper/app';
  // const { session } = stores();

  // const user = $session.user;

  // const loginWindow = () => {
  //   const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
  //   window.open(
  //     'http://localhost:3001/login',
  //     'Log in to Unicornization',
  //     params
  //   );
  // };
</script>

<style>
  .flip-x {
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
</style>

<div class="flex flex-row-reverse">

  <a
    href="http://localhost:3001"
    target="_blank"
    class="mx-5 text-3xl text-right -translate-x-4 flip-x">
    🦄
  </a>
</div>
