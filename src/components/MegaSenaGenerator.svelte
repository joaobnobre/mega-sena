<script lang="ts">
	let methods: string[] = ["Método Pseudoaleatório", "Método de Entropia Física"];
	let currentIndex: number = 0;
	let generatedNumbers: number[] = [];
	let showHint: boolean = false;

	function prevMethod(): void {
		currentIndex = (currentIndex - 1 + methods.length) % methods.length;
		showHint = false; // Reset hint visibility when changing method
	}

	function nextMethod(): void {
		currentIndex = (currentIndex + 1) % methods.length;
		showHint = false; // Reset hint visibility when changing method
	}

	function toggleHint(): void {
		showHint = !showHint;
	}

	function generateNumbers(): void {
		let method: string = methods[currentIndex];
		generatedNumbers = []; // Reset the array

		if (method === "Método Pseudoaleatório") {
			for (let i = 0; i < 6; i++) {
				generatedNumbers.push(Math.floor(Math.random() * 60) + 1);
			}
		} else if (method === "Método de Entropia Física") {
			let seed: number = new Date().getTime();
			for (let i = 0; i < 6; i++) {
				seed = (seed * 9301 + 49297) % 233280; // Formula to generate numbers using a seed
				let random: number = seed / 233280;
				generatedNumbers.push(Math.floor(random * 60) + 1);
			}
		}
	}
</script>

<div class="wrapper">
	<div class="container">
		<div class="method-selector">
			<button on:click={prevMethod}>Prev</button>
			<div class="method-name" on:click={toggleHint}>{methods[currentIndex]}</div>
			<button on:click={nextMethod}>Next</button>
		</div>

		{#if showHint}
			<div class="hint visible">
				{#if methods[currentIndex] === "Método Pseudoaleatório"}
					Este método utiliza a função Math.random() para gerar números pseudoaleatórios.
				{:else if methods[currentIndex] === "Método de Entropia Física"}
					Este método utiliza uma semente baseada no tempo atual para gerar números aleatórios.
				{/if}
			</div>
		{/if}

		<div class="numbers">
			{#each [0, 1, 2, 3, 4, 5] as index}
				<div class="number">{generatedNumbers[index] || "?"}</div>
			{/each}
		</div>

		<button on:click={generateNumbers}>Gerar Números</button>
	</div>
</div>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap");

	* {
		font-family: "Archivo Narrow", sans-serif;
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		background-color: #f4f2e1;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		text-align: center;
		color: #174149;
	}

	button {
		background-color: #174149;
		color: #f4f2e1;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: darken(#174149, 10%);
		}
	}

	.method-selector {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.method-name {
		cursor: pointer;
		position: relative;

		&:hover {
			text-decoration: underline;
		}
	}

	.hint {
		display: none;
		background-color: rgba(23, 65, 73, 0.8);
		color: #f4f2e1;
		padding: 10px;
		border-radius: 5px;
		position: absolute;
		top: 60px;
		left: 50%;
		transform: translateX(-50%);
		width: 300px;
		text-align: center;

		&.visible {
			display: block;
		}
	}

	.numbers {
		display: flex;
		gap: 10px;

		.number {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid #174149;
			border-radius: 50%;
			font-weight: bold;
		}
	}
</style>
