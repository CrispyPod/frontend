<script lang="ts">
	import '../../../app.css';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { get } from 'svelte/store';
	import { BreadCombItem } from '$lib/models/breadCombItems';
	import { siteConfigS } from '$lib/stores/siteConfigStore';
	import {
		Avatar,
		Dropdown,
		DropdownDivider,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';
	import { backend_pb } from '$lib/pb-integrate/admin_pb';

	function handleSignOut() {
		backend_pb.authStore.clear();
		goto('/signin');
	}

	let breadCombItems: Array<BreadCombItem> = [];

	onMount(() => {
		if ($page.url.pathname == '/admin/signin' && backend_pb.authStore.isValid) {
			goto('/admin');
			return;
		}

		if (!backend_pb.authStore.isValid) {
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
		if (backend_pb.authStore.isValid) {
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

<Navbar>
	<NavBrand href="/">
		<!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			CrispyPod
		</span>
	</NavBrand>
	<div class="flex items-center md:order-2">
		<Avatar id="avatar-menu" />
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<!-- <DropdownHeader>
			<span class="block text-sm">Bonnie Green</span>
			<span class="block truncate text-sm font-medium">name@flowbite.com</span>
		</DropdownHeader> -->
		<DropdownItem href="/admin/profile">Profile</DropdownItem>
		<!-- <DropdownItem>Settings</DropdownItem>
		<DropdownItem>Earnings</DropdownItem> -->
		<DropdownDivider />
		<DropdownItem on:click={handleSignOut}>Logout</DropdownItem>
	</Dropdown>
	<NavUl>
		<NavLi href="/admin/episode">Episodes</NavLi>
		<NavLi href="/admin/site-setting">Settings</NavLi>
		<NavLi href="/admin/static-deploy">Deploy</NavLi>
	</NavUl>
</Navbar>

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
