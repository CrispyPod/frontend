<script lang="ts">
	import { get } from 'svelte/store';
	import PasswordInput from '../PasswordInput.svelte';
	import { token } from '$lib/stores/tokenStore';
	import { onMount } from 'svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import { userS } from '$lib/stores/userStore';

	let user: User;
	let errMessage: string | null = null;
	export let handleNext: () => any;
	let confirmPasswordMessage: string = '';

	let passwordValue: string = '';
	let passwordConfirmValue: string = '';
	let form: HTMLFormElement;
	let formData: FormData;

	$: if (passwordValue.length > 0 && passwordConfirmValue.length > 0) {
		if (passwordValue != passwordConfirmValue) {
			confirmPasswordMessage = 'Password does not match';
		} else {
			confirmPasswordMessage = '';
		}
	}

	onMount(async () => {
		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`{
  me{
    email
    userName
    displayName
  }
}`
		);
		const jsonResp = await result.json();
		if (jsonResp.data != null) {
			userS.set(jsonResp.data.me);
			user = jsonResp.data.me;
		}
	});

	async function handleForm() {
		form = document.querySelector('#ProfileForm') as HTMLFormElement;
		formData = new FormData(form);
		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`mutation{
		  modifyMe(input:{email:"` +
				formData.get('Email') +
				`",displayName:"` +
				formData.get('DisplayName') +
				`",userName:"` +
				formData.get('UserName') +
				`",password:"` +
				formData.get('password') +
				`"}){
		    email
		    userName
		    id
		    displayName
		  }
		}`
		);

		const resultJson = await result.json();
		if (resultJson.data != null) {
			userS.set(resultJson.data.modifyMe);
			handleNext();
		} else {
			errMessage = resultJson.erros[0].message;
		}
	}
</script>

First, let's change profile for admin.

<form id="ProfileForm" on:submit|preventDefault={handleForm}>
	<div class="form-control w-full max-w-ws">
		<label class="label" for="UserName">
			<span class="label-text text-sm font-medium leading-6 text-gray-900"
				><span class="text-red-600">*</span> User name</span
			>
		</label>
		<input
			id="UserName"
			name="UserName"
			type="text"
			value={user == null ? '' : user.userName}
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			required
		/>

		<label class="label" for="DisplayName">
			<span class="label-text text-sm font-medium leading-6 text-gray-900"
				><span class="text-red-600">*</span> Display name</span
			>
		</label>
		<input
			id="DisplayName"
			name="DisplayName"
			type="text"
			value={user == null ? '' : user.displayName}
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			required
		/>

		<label class="label" for="Email">
			<span class="label-text text-sm font-medium leading-6 text-gray-900"
				><span class="text-red-600">*</span> Email</span
			>
		</label>
		<input
			id="Email"
			name="Email"
			type="text"
			value={user == null ? '' : user.email}
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			required
		/>

		<div class="divider"></div>

		<PasswordInput valueUpdated={(v) => (passwordValue = v)} id="password">
			<span slot="top"
				><div class="label">
					<span class="label-text"><span class="text-red-600">*</span> Password</span>
				</div>
			</span>

			<span slot="bottom">
				<div class="label">
					<span class="label-text-alt"></span>
				</div>
			</span>
		</PasswordInput>

		<PasswordInput
			valueUpdated={(v) => (passwordConfirmValue = v)}
			errBorder={confirmPasswordMessage.length > 0}
			id="passwordConfirm"
		>
			<span slot="top"
				><div class="label">
					<span class="label-text"><span class="text-red-600">*</span> Confirm Password</span>
				</div>
			</span>

			<span slot="bottom">
				<div class="label">
					<span class="label-text-alt"></span>
					<span class="label-text-alt text-red-600">{confirmPasswordMessage}</span>
				</div>
			</span>
		</PasswordInput>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		{#if errMessage != null}
			<div class="alert alert-error">
				<strong class="font-bold">{errMessage}</strong>
			</div>
		{/if}
		<button
			type="submit"
			class:btn-active={passwordValue.length > 0 && passwordConfirmValue == passwordValue}
			class:btn-disabled={passwordValue.length == 0 || passwordConfirmValue != passwordValue}
			class="btn btn-primary">Next</button
		>
	</div>
</form>
