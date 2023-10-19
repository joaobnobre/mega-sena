<script lang="ts">
	let methods: string[] = ["Método Pseudoaleatório", "Método de Entropia Física"];
	let currentIndex: number = 0;
	let generatedNumbers: number[] = [];

	function prevMethod(): void {
		currentIndex = (currentIndex - 1 + methods.length) % methods.length;
	}

	function nextMethod(): void {
		currentIndex = (currentIndex + 1) % methods.length;
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
		console.log("Método utilizado:", method);
		console.log("Números gerados:", generatedNumbers);
	}
</script>

<div class="container">
	<div class="method-selector">
		<button on:click={prevMethod}>Prev</button>
		<div>{methods[currentIndex]}</div>
		<button on:click={nextMethod}>Next</button>
	</div>

	<div class="numbers">
		{#each [0, 1, 2, 3, 4, 5] as index}
			<div class="number">{generatedNumbers[index] || "?"}</div>
		{/each}
	</div>

	<button on:click={generateNumbers}>Gerar Números</button>
</div>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap");

	* {
		font-family: "Archivo Narrow", sans-serif;
	}

	body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #ffe600;
		color: #174149;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.method-selector {
		display: flex;
		align-items: center;
		gap: 10px;
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
