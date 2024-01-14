<script lang="ts">
	import { goto } from '$app/navigation';
	import HookEdit from '$lib/components/admin-hooks/HookEdit.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import { Hook } from '$lib/models/hook';
	import { token } from '$lib/stores/tokenStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let data: any;

	let hookData: Hook = {
		id: null,
		name: '',
		trigger: 0,
		enabled: true,
		webURL: '',
		method: 'GET',
		headers: null,
		appendBody: null,
		createTime: null,
		modifyTime: null
	};
	let errMsg: string = '';

	onMount(() => {
		console.log(data.id);
	});

	async function handleSave(hd: Hook) {
		// 		let tokenS = get(token);
		// 		let result = await graphqlRequest(
		// 			tokenS,
		// 			`mutation{
		//   createHook(input:{name:"${hookData.name}",trigger:${hookData.trigger},webURL:"${hookData.webURL}",method:"${hookData.method}"}){id}}`
		// 		);
		// 		let jsonResp = await result.json();
		// 		if (jsonResp.data != null) {
		// 			goto(`/admin/hooks/${jsonResp.data.createHook.id}`);
		// 		} else {
		// 			errMsg = jsonResp.errors[0].message;
		// 		}
	}
</script>

<HookEdit pageTitle="Edit Hook" {hookData} {handleSave} {errMsg} />
