<script lang="ts">
	export let timeStamp: number;

	export let showDateString: boolean = true;
	export let showTimeString: boolean = false;

	let date = new Date(timeStamp * 1000);
</script>

{#if showDateString}
	{date.toLocaleDateString()}
{/if}
{#if showTimeString}
	{date.toLocaleTimeString()}
{/if}
