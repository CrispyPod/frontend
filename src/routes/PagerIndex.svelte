<script lang="ts">
	export let active: boolean = false;
	export let index: number;

	export let handleClick: () => any = () => {};
</script>

{#if active}
	<a
		on:click={handleClick}
		href="#"
		aria-current="page"
		class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>{index}</a
	>
{:else}
	<a
		on:click={handleClick}
		href="#"
		class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
		>{index}</a
	>
{/if}
