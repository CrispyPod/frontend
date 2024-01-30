<script lang="ts">
	import { guidGenerator, randomStringGenerator } from '$lib/helpers/randomGenerator';
	import { tick } from 'svelte';
	import WaveSurfer from 'wavesurfer.js';

	let waveID = randomStringGenerator();
	let timeID = randomStringGenerator();
	let durationID = randomStringGenerator();
	let hoverID = randomStringGenerator();

	export let fileUrl: string;
	let playing: boolean = false;
	let wavesurfer: WaveSurfer;

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	// Define the waveform gradient
	const gradient = ctx!.createLinearGradient(0, 0, 0, canvas.height * 1.35);
	gradient.addColorStop(0, '#656666'); // Top color
	gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666'); // Top color
	gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
	gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
	gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1'); // Bottom color
	gradient.addColorStop(1, '#B1B1B1'); // Bottom color

	// Define the progress gradient
	const progressGradient = ctx!.createLinearGradient(0, 0, 0, canvas.height * 1.35);
	progressGradient.addColorStop(0, '#EE772F'); // Top color
	progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926'); // Top color
	progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff'); // White line
	progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff'); // White line
	progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094'); // Bottom color
	progressGradient.addColorStop(1, '#F6B094'); // Bottom color

	async function loadedCallback() {
		await tick();
		// console.log(fileUrl);
		// Create the waveform
		wavesurfer = WaveSurfer.create({
			container: `#${waveID}`,
			waveColor: gradient,
			progressColor: progressGradient,
			barWidth: 2,
			url: fileUrl
		});

		// // Play/pause on click
		// wavesurfer.on('interaction', () => {
		// 	wavesurfer.playPause();
		// });

		wavesurfer.on('play', () => {
			playing = true;
		});

		wavesurfer.on('pause', () => {
			playing = false;
		});

		// Hover effect
		{
			const hover = document.querySelector(`#${hoverID}`) as HTMLElement;
			const waveform = document.querySelector(`#${waveID}`);
			waveform!.addEventListener(
				'pointermove',
				(e) => (hover!.style.width = `${(e as PointerEvent).offsetX}px`)
			);
		}

		// Current time & duration
		{
			const formatTime = (seconds: number) => {
				const minutes = Math.floor(seconds / 60);
				const secondsRemainder = Math.round(seconds) % 60;
				const paddedSeconds = `0${secondsRemainder}`.slice(-2);
				return `${minutes}:${paddedSeconds}`;
			};

			const timeEl = document.querySelector(`#${timeID}`);
			const durationEl = document.querySelector(`#${durationID}`);
			wavesurfer.on('decode', (duration) => (durationEl!.textContent = formatTime(duration)));
			wavesurfer.on('timeupdate', (currentTime) => (timeEl!.textContent = formatTime(currentTime)));
		}
	}

	$: fileUrl && loadedCallback();
</script>

<div>
	{#if playing}
		<button
			class="btn btn-circle btn-outline"
			on:click|preventDefault={() => {
				wavesurfer.pause();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
			</svg>
		</button>
	{:else}
		<button
			class="btn btn-circle btn-outline"
			on:click|preventDefault={() => {
				wavesurfer.play();
			}}
		>
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
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
				/>
			</svg>
		</button>
	{/if}

	<div id={waveID} class="waveform">
		<div id={timeID} class="time">0:00</div>
		<div id={durationID} class="duration">0:00</div>
		<div id={hoverID} class="hovering" />
	</div>
</div>

<style>
	.waveform {
		cursor: pointer;
		position: relative;
	}
	.hovering {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		pointer-events: none;
		height: 100%;
		width: 0;
		mix-blend-mode: overlay;
		background: rgba(255, 255, 255, 0.5);
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	.waveform:hover .hovering {
		opacity: 1;
	}
	.time,
	.duration {
		position: absolute;
		z-index: 11;
		top: 50%;
		margin-top: -1px;
		transform: translateY(-50%);
		font-size: 11px;
		background: rgba(0, 0, 0, 0.75);
		padding: 2px;
		color: #ddd;
	}
	.time {
		left: 0;
	}
	.duration {
		right: 0;
	}
</style>
