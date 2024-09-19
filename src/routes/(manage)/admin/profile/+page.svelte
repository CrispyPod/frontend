<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import type { AuthModel } from 'pocketbase';
	import { COLLECTION_USER, pb } from '$lib/pb-integrate/pb_client';
	import { goto } from '$app/navigation';
	import { assembleErrorMessage } from '$lib/helpers/assembleErrorMessages';

	let user: AuthModel;
	let errMessage: string | null = null;

	let toasts: { class: string; message: string }[] = [];

	onMount(() => {
		user = pb.authStore.model;

		pb.collection(COLLECTION_USER)
			.authRefresh()
			.then((v) => {
				user = v.record;
			});
	});

	async function handleFormSubmit(e: SubmitEvent) {
		const form = document.querySelector('#ProfileForm');
		const formData = new FormData(form as HTMLFormElement);
		const data = {
			username: formData.get('UserName'),
			email: formData.get('Email'),
			name: formData.get('DisplayName')
		};

		pb.collection(COLLECTION_USER)
			.update(user!.id, data)
			.then((v) => {
				const newToast = {
					class: 'alert-info',
					message: 'Profile saved'
				};
				toasts.push(newToast);
				toasts = toasts;
				setTimeout(() => {
					const index = toasts.indexOf(newToast);
					toasts.splice(index, 1);
					toasts = toasts;
				}, 3000);
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			});
	}

	let oldPassword: string = '';
	let newPassword: string = '';
	let newPasswordConfirm: string = '';

	function showChangePasswordModal() {
		oldPassword = '';
		newPassword = '';
		newPasswordConfirm = '';
		const modal: any = document.getElementById('my_modal_4');
		modal!.showModal();
	}

	function closeModal() {
		const modal: any = document.getElementById('my_modal_4');
		modal.close();
	}

	function handleSubmitChangePassword() {
		const data = {
			password: newPassword,
			passwordConfirm: newPasswordConfirm,
			oldPassword: oldPassword
		};

		pb.collection(COLLECTION_USER)
			.update(pb.authStore.model!.id, data)
			.then((v) => {
				pb.authStore.clear();
				goto('/admin/password-changed');
			})
			.catch((e) => {
				errMessage = assembleErrorMessage(e);
			})
			.finally(() => {
				const modal: any = document.getElementById('my_modal_4');
				modal.close();
			});
	}
</script>

<button class="btn btn-info" on:click={showChangePasswordModal}>Change Password</button>

<form id="ProfileForm" on:submit|preventDefault={handleFormSubmit}>
	<div class="form-control w-full max-w-xs">
		<label class="label" for="UserName">
			<span class="label-text text-sm font-medium leading-6 text-gray-900">User name</span>
		</label>
		<input
			id="UserName"
			name="UserName"
			type="text"
			value={user == null ? '' : user.username}
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
			value={user == null ? '' : user.name}
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

<dialog id="my_modal_4" class="modal">
	<div class="modal-box w-11/12 max-w-5xl">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h3 class="font-bold text-lg">Change password</h3>

		<form on:submit|preventDefault={handleSubmitChangePassword}>
			<label class="label" for="DisplayName">
				<span class="label-text text-sm font-medium leading-6 text-gray-900"
					><span class="text-red-600">*</span>Old password</span
				>
			</label>
			<input
				id="OldPassword"
				name="OldPassword"
				type="password"
				required
				bind:value={oldPassword}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>

			<label class="label" for="DisplayName">
				<span class="label-text text-sm font-medium leading-6 text-gray-900"
					><span class="text-red-600">*</span>New Password</span
				>
			</label>
			<input
				id="NewPassword"
				name="NewPassword"
				type="password"
				required
				bind:value={newPassword}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>

			<label class="label" for="DisplayName">
				<span class="label-text text-sm font-medium leading-6 text-gray-900"
					><span class="text-red-600">*</span>Confirm New Password</span
				>
			</label>
			<input
				id="ConfirmNewPassword"
				name="ConfirmNewPassword"
				type="password"
				required
				bind:value={newPasswordConfirm}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			<div class="mt-2 w-full ml-auto space-x-6">
				<button class="btn" on:click|preventDefault={closeModal}>Cancel</button>
				<button class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>
</dialog>

<div class="toast toast-start">
	{#each toasts as toast}
		<div class={`alert ${toast.class}`}>
			<span>{toast.message}</span>
		</div>
	{/each}
	<!-- <div class="alert alert-info">
		<span>New mail arrived.</span>
	</div>
	<div class="alert alert-success">
		<span>Message sent successfully.</span>
	</div> -->
</div>
