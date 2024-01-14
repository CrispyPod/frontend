<script lang="ts">
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import HookItem from '$lib/components/admin-hooks/HookItem.svelte';
	import Pager from '$lib/components/Pager.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import type { Hook } from '$lib/models/hook';
	import { token } from '$lib/stores/tokenStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let data: any;

	let sum = 0;
	let hasNextPage = false;
	let hasPreviousPage = false;

	let hooks: Array<Hook> = [];
	let curPage = data.curPage;
	onMount(async () => {
		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`{
  hookList(pagination:{perPage:25,pageIndex:${curPage}}){
    items{
      id,
      name,
      enabled,
      method,
    },
    totalCount,
    pageInfo{
      hasNextPage,
      hasPreviousPage,
    }
  }
}`
		);

		const resultJson = await result.json();
		hooks = resultJson.data.hookList.items ?? [];
		hasPreviousPage = resultJson.data.hookList.pageInfo.hasPreviousPage ?? false;
		hasNextPage = resultJson.data.hookList.pageInfo.hasNextPage ?? false;
		sum = resultJson.data.hookList.totalCount ?? 0;
	});
</script>

<AdminLayout pageTitle="Hooks">
	<span slot="actions">
		<div class="mt-5 flex lg:ml-4 lg:mt-0">
			<a class="sm:ml-3" href="/admin/hooks/new">
				<button class="btn btn-active btn-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
					New</button
				>
			</a>
		</div>
	</span>

	<ul role="list" class="divide-y divide-gray-100">
		{#each hooks as h, i}
			<HookItem hook={h} />
		{/each}
	</ul>
	<Pager {sum} {hasNextPage} {hasPreviousPage} pagePrefix="/admin/hooks/page/" />
</AdminLayout>
