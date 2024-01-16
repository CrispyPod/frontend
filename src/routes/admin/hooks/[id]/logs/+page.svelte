<script lang="ts">
	import PagedHookLog from '$lib/components/admin-hooks/PagedHookLog.svelte';
	export let data: any;
</script>

<PagedHookLog page={1} hookID={data.id} />
