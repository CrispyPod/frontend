<script lang="ts">
	// import { page } from '$app/stores';
	// let siteName: string;
	// if ($page.data.siteConfig == null) {
	// 	siteName = $page.data.siteName;
	// } else {
	// 	siteName = $page.data.siteConfig.siteName;
	// }
</script>

<div class="w-full flex justify-center items-center">
	<div class="container">
		<div class="navbar">
			<div class="flex-1">
				<a class="btn btn-ghost normal-case text-xl" href="/">{"Site"}</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal">
					<li><a href="/episode">Episodes</a></li>

					<li><a href="/about">About</a></li>
					<li><a href="/rss">RSS</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
