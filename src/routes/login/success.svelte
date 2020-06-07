<script>
  import { stores } from '@sapper/app';
  const { session } = stores();
</script>

user: {JSON.stringify($session.user)}
