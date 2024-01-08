<script lang="ts">
	export let errBorder: boolean = false;
	export let type = 'password';
	export let placeHolder = 'Type Here';
	export let id: string = '';

	let passwordVisible: boolean = false;
	$: if (passwordVisible) {
		type = 'text';
	} else {
		type = 'password';
	}

	export let valueUpdated: (v: string) => any;
</script>

<label class="form-control w-full max-w-xs">
	<slot name="top" />
	<div class="flex flex-row items-center">
		<input
			{type}
			on:input={(v) => valueUpdated(v.target.value /*Don't know how to make the error go away*/)}
			placeholder={placeHolder}
			class:input-error={errBorder}
			class="input input-bordered w-full max-w-xs"
			{id}
			name={id}
			required
		/>
		<button class="btn btn-square ml-4">
			<label class="swap">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" bind:checked={passwordVisible} />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-8 h-8 swap-on"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-8 h-8 swap-off"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
					/>
				</svg>
			</label>
		</button>
	</div>

	<slot name="bottom" />
</label>
