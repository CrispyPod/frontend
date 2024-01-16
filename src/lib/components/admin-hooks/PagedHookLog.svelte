<script lang="ts">
	import { onMount } from 'svelte';
	import AdminLayout from '../AdminLayout.svelte';
	import { get } from 'svelte/store';
	import { token } from '$lib/stores/tokenStore';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { HookLog } from '$lib/models/hookLog';
	import Pager from '$lib/components/Pager.svelte';
	import HookStatusBadge from './HookStatusBadge.svelte';
	import TimestampToTimeString from '../TimestampToTimeString.svelte';

	export let page: number;
	export let hookID: string;

	let hookLogs: Array<HookLog> = [];
	let sum = 0;
	let hasNextPage = false;
	let hasPreviousPage = false;

	onMount(async () => {
		let tokenS = get(token);
		let result = await graphqlRequest(
			tokenS,
			`{
hookLogList(hookID:"${hookID}",pagination:{pageIndex:${page},perPage:25}){
  items{
    id,status,createTime,duration
  },
  totalCount,
  pageInfo{
    hasNextPage,
    hasPreviousPage
  }
}
}`
		);
		let jsonResp = await result.json();
		hookLogs = jsonResp.data.hookLogList.items ?? [];
		hasPreviousPage = jsonResp.data.hookLogList.pageInfo.hasPreviousPage ?? false;
		hasNextPage = jsonResp.data.hookLogList.pageInfo.hasNextPage ?? false;
		sum = jsonResp.data.hookLogList.totalCount ?? 0;
	});
</script>

<AdminLayout pageTitle="Hook Logs">
	<ul role="list" class="divide-y divide-gray-100">
		{#each hookLogs as hl, i}
			<li class="flex justify-between gap-x-6 py-5">
				<div class="my-auto">
					<TimestampToTimeString timeStamp={hl.createTime} showTimeString={true} />
				</div>

				<div class="my-auto">
					<HookStatusBadge hookStatus={hl.status} />
				</div>

				<div class="sm:flex sm:items-end">
					<a class="sm:ml-3" href="/admin/hooks/{hookID}/logs/{hl.id}">
						<button class="btn">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
								/>
							</svg>

							Detail</button
						>
					</a>
				</div>
			</li>
		{/each}
	</ul>

	<Pager {sum} {hasNextPage} {hasPreviousPage} pagePrefix="/admin/hooks/{hookID}/logs/page/" />
</AdminLayout>
