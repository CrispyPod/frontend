<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminSetupLayout from '$lib/components/admin-setup/AdminSetupLayout.svelte';
	import ChangePassword from '$lib/components/admin-setup/ChangePassword.svelte';
	import ChangeSiteSetting from '$lib/components/admin-setup/ChangeSiteSetting.svelte';
	import Finish from '$lib/components/admin-setup/Finish.svelte';
	import Welcome from '$lib/components/admin-setup/Welcome.svelte';
	import { graphqlRequest } from '$lib/graphqlRequest';
	import { token } from '$lib/stores/tokenStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	/*
TODO:
1. add change password component.
2. add change site settings component.
*/
	let curStep = 0;

	let curStepComponent = Welcome;

	$: if (curStep) {
		switch (curStep) {
			default:
			case 0:
				curStepComponent = Welcome;
				break;
			case 1:
				curStepComponent = ChangePassword;
				break;
			case 2:
				curStepComponent = ChangeSiteSetting;
				break;
			case 3:
				curStepComponent = Finish;
				break;
		}
	}

	function handleNext() {
		curStep += 1;
		if (curStep > 3) {
			goto('/admin');
		}
	}

	onMount(async () => {
		const tokenS = get(token);
		const result = await graphqlRequest(
			tokenS,
			`{siteConfig{
          siteName,
          siteUrl,
          siteDescription,
          setupComplete,
        }
}`
		);
		const jsonResp = await result.json();
		if (jsonResp.data.setupComplete) {
			goto('/admin');
		}
	});
</script>

<AdminSetupLayout pageTitle={'Setup'}>
	<div class="h-full">
		<svelte:component this={curStepComponent} {handleNext} />
	</div>
</AdminSetupLayout>
