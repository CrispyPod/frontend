<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let onTimeout: () => any;
	export let message: string;

	let visible = true;
	onMount(() => {
		visible = true;
		setTimeout(() => {
			visible = false;
			onTimeout();
		}, 3000);
	});
</script>

{#if visible}
	<div class="alert alert-info" transition:fade>
		<span>{message}</span>
	</div>
{/if}
