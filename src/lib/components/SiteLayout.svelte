<script>
	import Header from './Header.svelte';

	export let showHeader = true;
</script>

{#if showHeader}
	<Header />
{/if}
<slot />
