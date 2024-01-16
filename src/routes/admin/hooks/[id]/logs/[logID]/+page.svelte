<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import TimestampToTimeString from '$lib/components/TimestampToTimeString.svelte';
	import HookStatusBadge from '$lib/components/admin-hooks/HookStatusBadge.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { HookLog } from '$lib/models/hookLog';
	import { token } from '$lib/stores/tokenStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let data: any;
	let hookLog: HookLog;

	onMount(async () => {
		let tokenS = get(token);
		let result = await graphqlRequest(
			tokenS,
			`
        {
  hookLog(id:"${data.logID}"){
    hookID,
    status,
    responseHeader,
    responseBody,
    createTime,
    duration
  }
}
        `
		);
		let jsonResp = await result.json();
		hookLog = jsonResp.data.hookLog;
	});
</script>

<AdminLayout pageTitle="Hook Log Detail">
	{#if hookLog != null}
		<div class="grid grid-cols-2">
			<div>
				Hook ID:
				{hookLog.hookID}
			</div>
			<div>
				Status:
				<!-- {hookLog.status} -->
				<HookStatusBadge hookStatus={hookLog.status} />
			</div>
			<div>
				Start time:
				<!-- {hookLog.createTime} -->
				<TimestampToTimeString timeStamp={hookLog.createTime} showTimeString={true} />
			</div>
			<!-- <div>
				Duration:
				{hookLog.duration}
			</div> -->
			<div class="divider col-span-2"></div>
			<div class=" col-span-2">
				Response Header:
				{hookLog.responseHeader}
			</div>
			<div class="divider col-span-2"></div>
			<div class=" col-span-2">
				Response Body:
				{hookLog.responseBody}
			</div>
		</div>
	{/if}
</AdminLayout>
