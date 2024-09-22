<script lang="ts">
	import { goto } from '$app/navigation';
	import { backend_pb } from '$lib/pb-integrate/admin_pb';

	let errMessage: string | null = null;
	export let handleNext: () => any;

	async function handleFinish() {
		if (!backend_pb.authStore.isValid) {
			goto('/admin/signin');
			return;
		}
		handleNext();
	}
</script>

<div class="">
	Set up finished! Please hit the next button to enter admin console.

	<div class="mt-6 flex items-center justify-end gap-x-6">
		{#if errMessage != null}
			<div class="alert alert-error">
				<strong class="font-bold">{errMessage}</strong>
			</div>
		{/if}
		<button type="submit" class="btn btn-active btn-primary" on:click={handleFinish}>Finish</button>
	</div>
</div>
