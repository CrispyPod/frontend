<script lang="ts">
	import { token } from '$lib/stores/tokenStore';
	import { get } from 'svelte/store';

	export let uploadFinish: (e: string) => any;
	export let accept: string = '.png,.jpeg,.jpg';

	let fileList: FileList;
	let uploading: boolean = false;

	$: fileList && startUpload();

	async function startUpload() {
		uploading = true;
		let file = fileList.item(0);
		const tokenS = get(token);

		let data = new FormData();
		data.append('file', file!);
		let resp = await fetch('/api/imageFile/upload', {
			method: 'POST',
			headers: [['Authorization', 'Bearer ' + tokenS]],
			body: data
		});

		let jsonResp = await resp.json();
		// console.log(jsonResp);

		uploading = false;

		uploadFinish(jsonResp.fileName);
	}
</script>

<input
	type="file"
	{accept}
	class="file-input file-input-bordered w-full max-w-xs"
	bind:files={fileList}
/>
