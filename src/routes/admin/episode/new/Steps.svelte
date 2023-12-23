<script lang="ts">
	export let curStep: number = 0;
</script>

<ul class="steps">
	<li class="step step-primary">Episode Infomation</li>
	<li class="step {curStep > 0 ? 'step-primary' : ''}">Audio File</li>
	<li class="step {curStep > 1 ? 'step-primary' : ''}">Thumbnail</li>
	<li class="step {curStep > 2 ? 'step-primary' : ''}">Visibility</li>
</ul>
