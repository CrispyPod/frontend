<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '../../../lib/components/AdminLayout.svelte';
	import { get } from 'svelte/store';
	import { userS } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';

	let user: User;
	let errMessage: string | null = null;

	onMount(() => {
// 		user = get(userS);
// 		if (user == null) {
// 			const tokenS = get(token);
// 			const result = await graphqlRequest(
// 				tokenS,
// 				`{
//   me{
//     email
//     userName
//     displayName
//   }
// }`
// 			);
// 			const jsonResp = await result.json();
// 			if (jsonResp.data != null) {
// 				userS.set(jsonResp.data.me);
// 				user = jsonResp.data.me;
// 			}
// 		}
	});

	async function handleFormSubmit(e: SubmitEvent) {
		// const form = document.querySelector('#ProfileForm');
		// const formData = new FormData(form as HTMLFormElement);
		// const tokenS = get(token);
		// var passwordField = '';
		// if ((formData.get('Password') as string).length > 0) {
		// 	passwordField += ',password:"' + formData.get('Password') + '"';
		// }
		// const result = await graphqlRequest(
		// 	tokenS,
		// 	`mutation{
		//   modifyMe(input:{email:"` +
		// 		formData.get('Email') +
		// 		`",displayName:"` +
		// 		formData.get('DisplayName') +
		// 		`",userName:"` +
		// 		formData.get('UserName') +
		// 		`"` +
		// 		passwordField +
		// 		`}){
		//     email
		//     userName
		//     id
		//     displayName
		//   }
		// }`
		// );

		// const resultJson = await result.json();
		// if (resultJson.data != null) {
		// 	userS.set(resultJson.data.modifyMe);
		// 	goto('/admin');
		// } else {
		// 	errMessage = resultJson.errors[0].message;
		// }
	}
</script>

<AdminLayout pageTitle="Profile">
	<form id="ProfileForm" on:submit|preventDefault={handleFormSubmit}>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="UserName">
				<span class="label-text text-sm font-medium leading-6 text-gray-900">User name</span>
			</label>
			<input
				id="UserName"
				name="UserName"
				type="text"
				value={user == null ? '' : user.userName}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>

			<label class="label" for="DisplayName">
				<span class="label-text text-sm font-medium leading-6 text-gray-900"
					>Display name(author)</span
				>
			</label>
			<input
				id="DisplayName"
				name="DisplayName"
				type="text"
				value={user == null ? '' : user.displayName}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>

			<label class="label" for="Email">
				<span class="label-text text-sm font-medium leading-6 text-gray-900">Email</span>
			</label>
			<input
				id="Email"
				name="Email"
				type="text"
				value={user == null ? '' : user.email}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>

			<label class="label" for="Password">
				<span class="label-text text-sm font-medium leading-6 text-gray-900">Password</span>
			</label>
			<input
				id="Password"
				name="Password"
				type="password"
				placeholder="Leave empty to use old password"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="mt-6 flex items-center justify-end gap-x-6">
			{#if errMessage != null}
				<div class="mr-auto">
					<div
						class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
						role="alert"
					>
						<strong class="font-bold">{errMessage}</strong>
					</div>
				</div>
			{/if}
			<a href="/admin" type="button" class="btn">Cancel</a>
			<button type="submit" class="btn btn-primary">Save</button>
		</div>
	</form>
</AdminLayout>
