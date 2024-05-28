<script lang="ts">
	import { page } from '$app/stores';
	let siteName: string;
	siteName = $page.data.siteConfig.site_name;

</script>

<div class="w-full flex justify-center items-center">
	<div class="container">
		<div class="navbar">
			<div class="flex-1">
				<a class="btn btn-ghost normal-case text-xl" href="/">{siteName}</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal">
					<li><a href="/episode/page/1">Episodes</a></li>

					<li><a href="/about">About</a></li>
					<li><a href="/rss.xml">RSS</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
