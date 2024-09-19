<script lang="ts">
	import { goto } from '$app/navigation';
	import { Pagination, type LinkType, PaginationItem } from 'flowbite-svelte';

	export let totalRows: number;
	export let isFirstPage: boolean;
	export let isLastPage: boolean;
	export let pageIndex: number;
	export let pageSize: number;
	export let pagePrefix: string = '';

	// $: activeUrl = $page.url.searchParams.get('page');
	let pagedIndices: number[] = [pageIndex];

	const totalPage = Math.floor(totalRows / pageSize) + (totalRows % pageSize > 0 ? 1 : 0);

	for (let index = 0; index < 3; index++) {
		const prev = pagedIndices[0] - 1;
		if (prev > 0) {
			pagedIndices = [prev, ...pagedIndices];
		}
		const next = pagedIndices[pagedIndices.length - 1] + 1;
		if (next <= totalPage) {
			pagedIndices = [...pagedIndices, next];
		}
	}

	let pages: Array<LinkType> = [];
	pagedIndices.forEach((v) => {
		pages.push({
			name: `${v}`,
			href: `${pagePrefix}/page/${v}`
		});
	});

	const previous = () => {
		// alert('Previous btn clicked. Make a call to your server to fetch data.');
		!isFirstPage && goto(`${pagePrefix}/page/${pageIndex - 1}`);
	};
	const next = () => {
		// alert('Next btn clicked. Make a call to your server to fetch data.');
		!isLastPage && goto(`${pagePrefix}/page/${pageIndex + 1}`);
	};
</script>

<Pagination {pages} large on:previous={previous} on:next={next}></Pagination>
