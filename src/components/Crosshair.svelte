<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from "svelte";
	import p5 from "p5";

	export let color = "";
	export let length = 0;
	export let thickness = 0;
	export let gap = 0;
	export let outline = false;
	export let outlinethickness = 0;
	export let outlinealpha = 0;

	let p: p5;
	let canvas: p5.Renderer | null = null;

	function setup(p5Instance: p5) {
		p = p5Instance;

		if (canvas) {
			canvas.remove();
		}

		canvas = p.createCanvas(400, 400);
		drawCrosshair();
	}

	export function drawCrosshair() {
		p.clear(0, 0, 0, 0);
		p.strokeCap(p.SQUARE);

		if (outline) {
			p.stroke(`rgba(0, 0, 0, ${outlinealpha / 255})`);
			p.strokeWeight(thickness + 2 * outlinethickness);
			drawLines(true);
		}

		p.stroke(color);
		p.strokeWeight(thickness);
		drawLines();
	}

	function drawLines(isOutline = false) {
		const offset = isOutline ? outlinethickness : 0;

		p.line(p.width / 2, p.height / 2 - length - gap / 2 - offset, p.width / 2, p.height / 2 - gap / 2 + offset);
		p.line(p.width / 2, p.height / 2 + gap / 2 - offset, p.width / 2, p.height / 2 + length + gap / 2 + offset);
		p.line(p.width / 2 - length - gap / 2 - offset, p.height / 2, p.width / 2 - gap / 2 + offset, p.height / 2);
		p.line(p.width / 2 + gap / 2 - offset, p.height / 2, p.width / 2 + length + gap / 2 + offset, p.height / 2);
	}

	onMount(() => {
		if (p) {
			p.remove();
		}
		p = new p5(setup);
	});

	onDestroy(() => {
		if (p) {
			p.remove();
		}
	});

	afterUpdate(drawCrosshair);
</script>

<style>
</style>
	