<script lang="ts">
	import VisibilityProvider from "./providers/VisibilityProvider.svelte";
	import CrosshairMenu from "./components/CrosshairMenu.svelte";
	import { debugData } from "./utils/debugData";

	debugData([
		{
			action: "setVisible",
			data: true,
		},
	]);
</script>

<main>
	<VisibilityProvider>
		<CrosshairMenu />
	</VisibilityProvider>
</main>
