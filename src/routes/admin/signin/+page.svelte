<script lang="ts">
	import { goto } from '$app/navigation';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';
	import { COLLECTION_USER, pb } from '$lib/pb-integrate/pb_client';
	import { onMount } from 'svelte';

	let errMessage: string | null = null;

	function handleSubmit() {
		const email = document.getElementById('email') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;
		pb.collection(COLLECTION_USER)
			.authWithPassword(email.value, password.value)
			.then((v) => {
				goto('/admin');
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	onMount(() => {
		if (pb.authStore.isValid) {
			goto('/admin');
			return;
		}
	});

	function clearErrMessage() {
		errMessage = null;
	}
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<!-- <img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/> -->
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6 flex flex-col items-center" on:submit|preventDefault={handleSubmit}>
			<div class="w-full">
				<label for="email" class="label-text">Email address or user name</label>
				<div class="mt-2">
					<input
						on:focus={clearErrMessage}
						id="email"
						name="email"
						autocomplete="email"
						required
						class="input input-bordered w-full"
					/>
				</div>
			</div>

			<div class="w-full">
				<div class="flex items-center justify-between">
					<label for="password" class="label-text">Password</label>
				</div>
				<div class="mt-2">
					<input
						on:focus={clearErrMessage}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="input input-bordered w-full"
					/>
				</div>
			</div>
			<span class="mt-2" />
			{#if errMessage != null}
				<div class=" text-red-500">
					<p>{errMessage}</p>
				</div>
			{/if}
			<div class="flex justify-center">
				<button type="submit" class="btn btn-wide btn-primary">Sign in</button>
			</div>
		</form>
	</div>
</div>
