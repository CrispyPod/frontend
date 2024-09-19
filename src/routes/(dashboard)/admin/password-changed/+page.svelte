<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => {
			goto('/admin/signin');
		}, 3000);
	});
</script>

<div class="w-full flex justify-center items-center">
	<div class=" min-h-full px-6 py-12 lg:px-8 prose">
		<section class="">
			<h1>Password Changed</h1>
			<p>You will be redirected to sign in page in 3 seconds.</p>
		</section>
	</div>
</div>
