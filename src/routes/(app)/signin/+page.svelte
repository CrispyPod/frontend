<script lang="ts">
	import { goto } from '$app/navigation';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';
	import { pb, COLLECTION_USER } from '$lib/pb-integrate/pb_client';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { Register, Section } from 'flowbite-svelte-blocks';
	import { onMount } from 'svelte';

	let errMessage: string | null = null;

	function handleSubmit() {
		const email = document.getElementById('email') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;
		pb
			.collection(COLLECTION_USER)
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

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<Section name="login">
	<Register href="/">
		<svelte:fragment slot="top">
			<!-- <img class="w-8 h-8 mr-2" src="/images/logo.svg" alt="logo" /> -->
			Sign in to your account
		</svelte:fragment>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form class="flex flex-col space-y-6" action="#" on:submit|preventDefault={handleSubmit}>
				<!-- <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Change Password</h3> -->
				<Label class="space-y-2">
					<span>Your email</span>
					<Input
						on:focus={clearErrMessage}
						id="email"
						name="email"
						placeholder="name@company.com"
						required
					/>
				</Label>
				<Label class="space-y-2">
					<span>Your password</span>
					<Input
						on:focus={clearErrMessage}
						id="password"
						type="password"
						name="password"
						placeholder="•••••"
						required
					/>
				</Label>
				<!-- <div class="flex items-start">
					<Checkbox>Remember me</Checkbox>
					<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
						>Forgot password?</a
					>
				</div> -->
				<Button type="submit" class="w-full1">Sign in</Button>
				<!-- <p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Don’t have an account yet? <a
						href="/"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
					>
				</p> -->
			</form>
		</div>
	</Register>
</Section>
<!-- 
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
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
</div> -->
