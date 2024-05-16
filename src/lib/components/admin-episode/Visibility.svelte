<script lang="ts">
	// import { graphqlRequest } from '$lib/graphqlRequest';
	import type { Episode } from '$lib/models/episode';
	// import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;
	let errMessage: string | null = null;

	async function onNext() {
		// const statStr = (document.querySelector('input[name="radio-10"]:checked')! as HTMLInputElement)
		// 	.value;
		// const stat = parseInt(statStr);
		// const tokenS = get(token);
		// const result = await graphqlRequest(
		// 	tokenS,
		// 	`mutation{  modifyEpisode(id:"` +
		// 		episodeData!.id +
		// 		`",input: {episodeStatus:` +
		// 		stat +
		// 		`}){id}}`
		// );
		// var resultJson = await result.json();
		// if (resultJson.data != null) {
		// 	handleNext(episodeData!);
		// } else {
		// 	errMessage = resultJson.errors[0].message;
		// }
	}
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="w-32">
		<div class="form-control">
			<label class="label cursor-pointer">
				<div class="badge badge-neutral">Draft</div>
				<input type="radio" name="radio-10" class="radio" value="0" checked />
			</label>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer">
				<div class="badge badge-accent">Published</div>
				<input type="radio" name="radio-10" class="radio" value="1" />
			</label>
		</div>
	</div>
</div>

<div class="mt-6 flex items-center justify-end gap-x-6">
	<a href="/admin/episode" type="button" class="btn btn-active">Cancel</a>
	<button type="submit" class="btn btn-active btn-primary" on:click={onNext}>Finish</button>
</div>
