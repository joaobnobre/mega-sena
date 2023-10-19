<script lang="ts">
	export let label: string;
	export let id: string;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
	export let value: any;
	export let isCheckbox: boolean = false;
	export let isColor: boolean = false;
	export let isRange: boolean = false;
	export let disabled: boolean = false;

	const validateValue = () => {
		value = Math.max(min, Math.min(max, value));
	};

	function preventHashDeletion(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement;

		// Verifica se o Backspace foi pressionado e se o cursor está na posição 1 (após o #)
		if (event.key === "Backspace" && target.selectionStart === 1) {
			event.preventDefault();
		}
	}

	function ensureHashOnInput(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.value.startsWith("#")) {
			target.value = "#" + target.value;
		}
	}
</script>

<div>
	<label for={id}>{label}:</label>
	{#if isCheckbox}
		<input type="checkbox" {id} name={id} bind:checked={value} />
	{:else if isColor}
		<input type="color" {id} name={id} bind:value />
		<input type="text" id="{id}Text" name="{id}Text" {value} on:input={ensureHashOnInput} on:keydown={preventHashDeletion} pattern="#[0-9A-Fa-f]{6}" />
	{:else if isRange}
		<input type="range" {id} name={id} {min} {max} {step} bind:value {disabled} />
		<input type="number" id="{id}Text" name="{id}Text" bind:value on:input={validateValue} {disabled} />
	{/if}
</div>
