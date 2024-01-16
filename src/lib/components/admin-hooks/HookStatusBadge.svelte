<script lang="ts">
	export let hookStatus: number;
</script>

{#if hookStatus == 0}
	<div class="badge badge-neutral">running</div>
{:else if hookStatus == 1}
	<div class="badge badge-accent">finished</div>
{/if}
