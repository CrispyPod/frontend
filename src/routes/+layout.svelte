<script>
	import '../app.css';
	// import { onMount } from 'svelte';
	// import { page } from '$app/stores';
	// import { get } from 'svelte/store';
	// import { token } from '$lib/stores/tokenStore';
	// import { graphqlRequest } from '$lib/graphqlRequest';

	// onMount(async () => {
	// 	// check if token in localStorage is valid
	// 	let tokenS = get(token);
	// 	if ($page.url.pathname != '/admin/signin' && tokenS != null) {
	// 		let result = await graphqlRequest(
	// 			tokenS,
	// 			`query{me{id,userName}}`
	// 		);
	// 		let jsonResp = await result.json();
	// 		if (jsonResp.data.me == null) {
	// 			token.set(null);
	// 		}
	// 	}
	// });
</script>

<slot />
