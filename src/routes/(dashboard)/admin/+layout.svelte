<script lang="ts">
	import '../../../app.css';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { get } from 'svelte/store';
	import { BreadCombItem } from '$lib/models/breadCombItems';
	import { pb } from '$lib/pb-integrate/pb_client';
	import { siteConfigS } from '$lib/stores/siteConfigStore';

	function handleSignOut() {
		pb.authStore.clear();
		goto('/signin');
	}

	let breadCombItems: Array<BreadCombItem> = [];

	onMount(() => {
		if ($page.url.pathname == '/admin/signin' && pb.authStore.isValid) {
			goto('/admin');
			return;
		}

		if (!pb.authStore.isValid) {
			goto('/signin');
			return;
		}

		siteConfigS.init().then(() => {
			const siteConfig = get(siteConfigS);
			if (siteConfig.setup_step != 'done') {
				goto('/admin/setup');
			}
		});

		reRenderBreadcrumb();
	});

	afterNavigate(() => {
		reRenderBreadcrumb();
	});

	export function loginCheck() {
		if (pb.authStore.isValid) {
			goto('/signin');
		}
	}

	function reRenderBreadcrumb() {
		tick().finally(() => {
			if ($page.url.pathname.replace('/admin', '').length > 0) {
				let builtLink = '';
				breadCombItems = $page.url.pathname
					.split('/')
					.filter((x) => x.length > 0)
					.map((x) => {
						builtLink += '/' + x;
						const comb = new BreadCombItem(builtLink, x.slice(0, 1).toUpperCase() + x.slice(1));
						return comb;
					});
			} else {
				breadCombItems = [];
			}
		});
	}

	// export let pageTitle: String;
</script>

<svelte:head>
	<title>CrispyPod - Admin</title>
</svelte:head>

<div class="navbar bg-neutral text-neutral-content">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-neutral lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
				<li><a href="/admin/episode" class="btn-neutral">Episodes</a></li>
				<li><a href="/admin/site-setting" class="btn-neutral">Settings</a></li>
				<li><a href="/admin/static-deploy" class="btn-neutral">Deploy</a></li>
				<!-- <li><a href="/admin/hooks" class="btn-neutral">Hooks</a></li> -->
				<!-- <li>
					<a>Parent</a>
					<ul class="p-2">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</li> -->
				<!-- <li><a>Item 3</a></li> -->
			</ul>
		</div>
		<a class="btn btn-neutral normal-case text-xl" href="/admin">CrispyPod</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		{#if $page.url.pathname !== '/admin/setup'}
			<ul class="menu-horizontal px-1">
				<li><a href="/admin/episode" class="btn btn-neutral">Episodes</a></li>
				<li><a href="/admin/site-setting" class="btn btn-neutral">Settings</a></li>
				<li><a href="/admin/static-deploy" class="btn btn-neutral">Deploy</a></li>
				<!-- <li><a href="/admin/hooks" class="btn btn-neutral">Hooks</a></li> -->
				<!-- <li tabindex="0">
				<details>
					<summary>Parent</summary>
					<ul class="p-2">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</details>
			</li>
			<li><a>Item 3</a></li> -->
			</ul>
		{/if}
	</div>
	<div class="navbar-end">
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="white"
						class="w-10 h-10"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
			>
				<li>
					<a class="justify-between" href="/admin/profile"> Profile </a>
				</li>
				<li><button on:click={handleSignOut}>Logout</button></li>
			</ul>
		</div>
	</div>
</div>

<main>
	<div class="mx-auto max-w-7xl py-6 lg:px-8 px-6">
		<div class="text-sm breadcrumbs">
			<ul>
				{#each breadCombItems as b, i}
					{#if i != breadCombItems.length - 1}
						<li>
							<a href={b.link}>{b.name}</a>
						</li>
					{:else}
						<li><span class="font-bold">{b.name}</span></li>{/if}
				{/each}
			</ul>
		</div>
		<!-- <div class="flex justify-between">
			<h2
				class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
			>
				{pageTitle}
			</h2>
			<slot name="err" />
			<slot name="actions" />
		</div> -->
		<!-- <div class="divider" /> -->

		<slot />
	</div>
</main>
