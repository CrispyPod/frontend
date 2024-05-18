<script lang="ts">
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';
	import type { Episode } from '$lib/models/episode';
	import { COLLECTION_EPISODE, pb } from '$lib/pb-integrate/pb_client';

	export let episodeData: Episode | null;
	export let handleNext: (e: Episode) => any;
	let errMessage: string | null = null;

	async function onNext() {
		const form: HTMLFormElement | null = document.querySelector('#visibilityForm');
		const formData = new FormData(form!);
		const data = {
			status: formData.get('status')!.toString()
		};

		pb.collection(COLLECTION_EPISODE)
			.update(episodeData!.id, data)
			.then((v) => {
				handleNext(episodeData!);
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="w-32">
		<form id="visibilityForm">
			<div class="form-control">
				<label class="label cursor-pointer">
					<div class="badge badge-neutral">Draft</div>
					<input type="radio" name="status" class="radio" value="draft" checked />
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer">
					<div class="badge badge-accent">Published</div>
					<input type="radio" name="status" class="radio" value="published" />
				</label>
			</div>
		</form>
	</div>
</div>

<div class="mt-6 flex items-center justify-end gap-x-6">
	<a href="/admin/episode" type="button" class="btn btn-active">Cancel</a>
	<button type="submit" class="btn btn-active btn-primary" on:click={onNext}>Finish</button>
</div>
