<script lang="ts">
	let errMessage: string | null = null;
	export let handleNext: () => any;
</script>

<div class="">
	Welcome to Crispypod! This is your first time signing in, so let's make some changes to the
	default settings.

	<div class="mt-6 flex items-center justify-end gap-x-6">
		{#if errMessage != null}
			<div class="alert alert-error">
				<strong class="font-bold">{errMessage}</strong>
			</div>
		{/if}
		<button type="submit" class="btn btn-active btn-primary" on:click={handleNext}>Next</button>
	</div>
</div>
