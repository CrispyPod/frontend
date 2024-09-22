<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminPagination from '$lib/components/AdminPagination.svelte';
	import { pb, COLLECTION_STAITC_DEPLOY_LOG } from '$lib/pb-integrate/pb_client';
	import type { ListResult, RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';

	let fetchedList: ListResult<RecordModel>;

	let curPage = 0;
	let sum = 0;
	let hasNextPage = false;
	let hasPreviousPage = false;

	function getAllLogs(pageIndex: number) {
		if (curPage == pageIndex) return;
		curPage = pageIndex;
		pb
			.collection(COLLECTION_STAITC_DEPLOY_LOG)
			.getList(curPage, 25, { sort: '-created' })
			.then((v) => {
				sum = v.totalItems;
				hasNextPage = curPage > v.totalPages;
				hasPreviousPage = curPage < 1;
				fetchedList = v;
			});
	}

	onMount(() => {
		getAllLogs(1);
	});

	async function triggerDeploy() {
		let headers: Record<string, any> = {
			'Content-Type': 'application/json',
			Authorization: pb.authStore.token
		};
		const result = await fetch('/admin/static-deploy', {
			method: 'POST',
			headers: headers
		});

		const data = await result.json();
		console.log(data.id);
		if (Object.hasOwn(data, 'id')) {
			goto(`/admin/static-deploy/detail?d=${data.id}`);
		}
	}

	function handleNewDeploy() {
		pb
			.collection(COLLECTION_STAITC_DEPLOY_LOG)
			.getFirstListItem(`status='started' || status='building' || status='deploying'`)
			.then((v) => {
				console.log(v);
			})
			.catch((e) => {
				if (e.status == 404) {
					triggerDeploy();
				}
			});
	}
</script>

<!-- <AdminLayout pageTitle="Static Deploy">
	<span slot="actions"> -->
<button class="btn btn-active btn-primary" on:click={handleNewDeploy}>New Deploy</button>
<!-- </span> -->

{#if fetchedList != null}<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>Start at</th>
					<th>End at</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each fetchedList.items as l}
					<tr>
						<th>{l.created.split('.')[0]}</th>
						<th
							>{l.status == 'finished' || l.status == 'failed' ? l.updated.split('.')[0] : '--'}</th
						>
						<td>{l.status}</td>
						<td>
							<a href={`/admin/static-deploy/detail?d=${l.id}`}>
								<button class="btn btn-link">View detail</button>
							</a>
						</td>
					</tr>
				{/each}
				<!-- <tr>
						<th>3</th>
						<td>Brice Swyre</td>
						<td>Tax Accountant</td>
						<td>Red</td>
					</tr> -->
			</tbody>
		</table>
	</div>
{/if}

{#if fetchedList != null && fetchedList.totalPages > 1}
	<AdminPagination
		{sum}
		{hasNextPage}
		{hasPreviousPage}
		handlePageClick={(pageIndex) => {
			getAllLogs(pageIndex);
		}}
	/>
{/if}
<!-- </AdminLayout> -->
