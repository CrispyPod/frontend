<script lang="ts">
	import { goto } from '$app/navigation';
	// import { graphqlRequest } from '$lib/graphqlRequest';
	// import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';

	let errMessage: string | null = null;
	export let handleNext: () => any;

	async function handleFinish() {
		// 		const tokenS = get(token);
		// 		const result = await graphqlRequest(
		// 			tokenS,
		// 			`mutation{
		//   modifySiteConfig(input:{setupComplete:true}){
		//     setupComplete
		//   }
		// }`
		// 		);
		// 		const jsonResp = await result.json();
		// 		if (jsonResp.data.modifySiteConfig.setupComplete) {
		// 			handleNext();
		// 		}
	}
</script>

<div class="">
	Finish, Please hit the next button to enter admin console.

	<div class="mt-6 flex items-center justify-end gap-x-6">
		{#if errMessage != null}
			<div class="alert alert-error">
				<strong class="font-bold">{errMessage}</strong>
			</div>
		{/if}
		<button type="submit" class="btn btn-active btn-primary" on:click={handleFinish}>Finish</button>
	</div>
</div>
