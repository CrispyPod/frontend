<script lang="ts">
	import { Hook } from '$lib/models/hook';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import { onMount } from 'svelte';
	import { HeaderObject } from '$lib/models/headerObject';

	export let handleSave: (hd: Hook) => any;
	export let pageTitle: string;

	export let hookData: Hook;
	export let errMsg: string = '';

	const httpMethods: Array<string> = ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'PATCH'];

	function handleSubmit() {
		if (headers.length == 1 && headers[0].key == '' && headers[0].value == '') {
		} else {
			let headersRecord: Record<string, any> = {};
			headers.forEach((h) => {
				headersRecord[h.key] = h.value;
			});
			hookData.headers = JSON.stringify(headersRecord);
		}
		handleSave(hookData);
	}

	function handleSaveClicked() {
		const form = document.getElementById('newHookForm') as HTMLFormElement;
		form.reportValidity() && handleSubmit();
	}

	function closeDropdown(id: string) {
		var dropdown = document.getElementById(id);

		dropdown?.removeAttribute('open');
	}

	let headers: Array<HeaderObject> = [];

	onMount(async () => {
		if (hookData.headers != null) {
			// TODO
			let parsedJson = JSON.parse(hookData.headers);
		} else {
			headersAppendEmpty();
		}
	});

	function headersAppendEmpty() {
		headers.push(new HeaderObject('', ''));
		headers = headers;
	}
</script>

<AdminLayout {pageTitle}>
	<span slot="err">
		{#if errMsg.length > 0}
			<div role="alert" class="alert alert-error">
				<span>{errMsg}</span>
			</div>
		{/if}
	</span>
	<span slot="actions">
		{#if hookData.id != null}
			<button class="btn btn-active">Test Run</button>
		{/if}
		<button class="btn btn-active btn-primary" on:click={handleSaveClicked}>Save</button>
	</span>

	<form id="newHookForm" on:submit|preventDefault={handleSubmit}>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Name</span>
			</div>
			<input
				type="text"
				placeholder="Type here"
				bind:value={hookData.name}
				class="input input-bordered w-full"
				required
			/>
		</label>
		<div class="mt-4">
			<div class="label">
				<span class="label-text">Trigger</span>
			</div>
			<details id="dp-trigger" class="dropdown">
				<summary class="m-1 btn w-full"
					>{Hook.TriggerNames.get(hookData.trigger)}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-3 h-3"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
					</svg></summary
				>
				<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
					{#each Hook.TriggerNames.keys() as i}
						<li>
							<a
								href="javascript:;"
								on:click={() => {
									hookData.trigger = i;
									closeDropdown('dp-trigger');
								}}>{Hook.TriggerNames.get(i)}</a
							>
						</li>
					{/each}
				</ul>
			</details>
		</div>
		<div class="grid grid-cols-4 mt-4">
			<div>
				<div class="label">
					<span class="label-text">Method</span>
				</div>
				<details class="dropdown" id="dp-method">
					<summary class="m-1 btn w-full"
						>{hookData.method.toUpperCase()}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-3 h-3"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</summary>
					<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
						{#each httpMethods as m}
							<li>
								<a
									href="javascript:;"
									on:click={() => {
										hookData.method = m;
										closeDropdown('dp-method');
									}}>{m}</a
								>
							</li>
						{/each}
					</ul>
				</details>
			</div>

			<label class="form-control w-full col-span-3">
				<div class="label">
					<span class="label-text">URL</span>
				</div>
				<input
					placeholder="Type here"
					class="input input-bordered w-full"
					bind:value={hookData.webURL}
					required
                    type="url"
				/>
			</label>
		</div>

		<div class="divider">Headers</div>

		<div class="grid grid-cols-6 gap-2">
			{#each headers as h, i}
				<label class="form-control w-full">
					{#if i == 0}
						<div class="label">
							<span class="label-text">Key</span>
						</div>
					{/if}
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full"
						bind:value={h.key}
					/>
				</label>
				<div></div>
				<label class="form-control w-full col-span-3">
					{#if i == 0}
						<div class="label">
							<span class="label-text">Value</span>
						</div>
					{/if}
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full"
						bind:value={h.value}
					/>
				</label>

				{#if i != 0}
					<button
						class="btn btn-square mt-auto"
						on:click={() => {
							headers = headers.filter((x) => x != h);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/></svg
						>
					</button>
				{:else}
					<div></div>
				{/if}
			{/each}
		</div>

		<button
			class="btn mt-4"
			on:click={() => {
				headersAppendEmpty();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			Add Header
		</button>
	</form>
</AdminLayout>
