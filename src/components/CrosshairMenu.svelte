<script lang="ts">
    import { crosshairColor, crosshairLength, crosshairThickness, crosshairGap, crosshairOutline, crosshairOutlineThickness, crosshairOutlineAlpha } from "../store/stores";
    import { saveCrosshairSettings, loadCrosshairSettings, exportCrosshair, importCrosshair } from "../utils/crosshairUtils";
    import { mapValue } from "../utils/mapValue";
    import { closeDialog } from "../utils/closeDialog";
    import DynamicInput from "./DynamicInput.svelte";
    import Crosshair from "./Crosshair.svelte";

    let isModalOpen = false;
    let inputCode = "";

    const savedSettings = loadCrosshairSettings();
    if (savedSettings) {
        crosshairColor.set(savedSettings.color);
        crosshairLength.set(savedSettings.length);
        crosshairThickness.set(savedSettings.thickness);
        crosshairGap.set(savedSettings.gap);
        crosshairOutline.set(savedSettings.outline);
        crosshairOutlineThickness.set(savedSettings.outlinethickness);
        crosshairOutlineAlpha.set(savedSettings.outlinealpha);
    }

    $: {
        const currentSettings = {
            color: $crosshairColor,
            length: $crosshairLength,
            thickness: $crosshairThickness,
            gap: $crosshairGap,
            outline: $crosshairOutline,
            outlinethickness: $crosshairOutlineThickness,
            outlinealpha: $crosshairOutlineAlpha,
        };
        saveCrosshairSettings(currentSettings);
    }

    let isOutlineActive = $crosshairOutline;
    $: isOutlineActive = $crosshairOutline;

    function handleConfirm() {
        if (inputCode) {
            const properties = importCrosshair(inputCode);
            crosshairColor.set(properties.color);
            crosshairLength.set(properties.length);
            crosshairThickness.set(properties.thickness);
            crosshairGap.set(properties.gap);
            crosshairOutline.set(properties.outline);
            crosshairOutlineThickness.set(properties.outlinethickness);
            crosshairOutlineAlpha.set(properties.outlinealpha);
            isModalOpen = false;
        }
    }

    function openModal() {
        const properties = {
            color: $crosshairColor,
            length: $crosshairLength,
            thickness: $crosshairThickness,
            gap: $crosshairGap,
            outline: $crosshairOutline,
            outlinethickness: $crosshairOutlineThickness,
            outlinealpha: $crosshairOutlineAlpha
        };
        inputCode = exportCrosshair(properties);
        isModalOpen = true;
    }
</script>

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
    }
</style>

<div class="container">
    <h1>crosshair</h1>
    <div class="preview-wrapper">
        <DynamicInput label="Color" id="color" isColor={true} bind:value={$crosshairColor} />
        <DynamicInput label="Length" id="length" min={1} max={30} step={1} isRange={true} bind:value={$crosshairLength} />
        <DynamicInput label="Thickness" id="thickness" min={1} max={10} step={1} isRange={true} bind:value={$crosshairThickness} />
        <DynamicInput label="Gap" id="gap" min={0} max={10} step={1} isRange={true} bind:value={$crosshairGap} />
        <DynamicInput label="Outline Thickness" id="outlinethickness" min={1} max={10} step={1} isRange={true} bind:value={$crosshairOutlineThickness} disabled={!isOutlineActive} />
        <DynamicInput label="Outline Alpha" id="outlinealpha" min={0} max={255} step={1} isRange={true} bind:value={$crosshairOutlineAlpha} disabled={!isOutlineActive} />
        <DynamicInput label="Outline" id="outline" isCheckbox={true} bind:value={$crosshairOutline} />
        <Crosshair
            color={$crosshairColor}
            length={mapValue($crosshairLength, 1, 20, 1, 30)}
            thickness={mapValue($crosshairThickness, 1, 10, 1, 20)}
            gap={mapValue($crosshairGap, 0, 5, 0, 10)}
            outlinethickness={mapValue($crosshairOutlineThickness, 0, 5, 1, 10)}
            outlinealpha={$crosshairOutlineAlpha}
            outline={$crosshairOutline}
        />
    </div>
    <button on:click={() => { closeDialog(); }}>Close popup</button>
    <button on:click={openModal}>Import/Export Crosshair</button>

    {#if isModalOpen}
    <div class="modal">
        <div class="modal-content">
            <input bind:value={inputCode} />
            <button on:click={handleConfirm}>Confirmar</button>
            <button on:click={() => { navigator.clipboard.writeText(inputCode); }}>Copiar</button>
        </div>
    </div>
    {/if}
</div>
