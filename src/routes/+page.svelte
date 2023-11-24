<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Card, Label, Input, ButtonGroup, InputAddon, Spinner } from 'flowbite-svelte';
	import { GithubSolid } from 'flowbite-svelte-icons';

	// Bandera para saber si ya cargamos los datos de la API
	let loaded = false;

	// Creamos store para guardar los datos de la API y los convertidores
	const apiData$ = writable({});
	const montoARS$ = writable(0);
	const montoUSD$ = writable(0);

	// Llamamos a la API y guardamos los datos en el store
	onMount(async () => {
		try {
			const response = await fetch('https://dolarapi.com/v1/dolares/blue');
			const data = await response.json();
			apiData$.set(data);
			loaded = true;
		} catch (error) {
			console.error(error);
		}
	});

	// Manejar input de USD
	function handleUSDInput(event) {
		const value = parseFloat(event.target.value);
		if (isNaN(value)) {
			montoARS$.set(null);
		} else {
			const roundedValue = value.toFixed(2);
			montoARS$.set((roundedValue * $apiData$.venta).toFixed(2));
		}
	}

	// Manejar input de ARS
	function handleARSInput(event) {
		const value = parseFloat(event.target.value);
		if (isNaN(value)) {
			montoUSD$.set(null);
		} else {
			const roundedValue = value.toFixed(2);
			montoUSD$.set((roundedValue / $apiData$.venta).toFixed(2));
		}
	}
</script>

<svelte:head>
	<title>🟢🟢 Verdolaga 🟢🟢</title>
	<meta name="description" content="Verdolaga - Convertidor de dolar blue" />
</svelte:head>

<section>
	<div class="flex justify-center">
		{#if loaded}
			<Card>
				<h1 class="font-bold text-primary-500">Verdolaga 🤑</h1>
				<div class="text-center mb-6">
					<small class="text-primary-500 italic">Blue venta: ${$apiData$.venta}</small>
				</div>
				<div class="mb-6">
					<Label for="ars-input" class="block mb-2">Monto en pesos (ARS)</Label>

					<ButtonGroup class="w-full">
						<InputAddon>$</InputAddon>
						<Input
							size="lg"
							id="ars-input"
							placeholder="ARS"
							bind:value={$montoARS$}
							on:input={handleARSInput}
						/>
					</ButtonGroup>
				</div>
				<div class="mb-6">
					<Label for="usd-input" class="block mb-2">Monto en dólares (USD)</Label><ButtonGroup
						class="w-full"
					>
						<InputAddon>$</InputAddon>
						<Input
							size="lg"
							id="usd-input"
							placeholder="USD"
							bind:value={$montoUSD$}
							on:input={handleUSDInput}
						/>
					</ButtonGroup>
				</div>
			</Card>
		{:else}
			<Spinner />
		{/if}
	</div>
	<small class="italic text-primary block text-center mt-6">
		Hecho por <b>Leandro Sosa</b> para la materia <b>Laboratorio de Aplicaciones Web Cliente</b> de
		<b>ISTEA</b>.</small
	>
	<small class="italic text-primary block text-center"
		>Construido con Flowbite, Tailwind & SvelteKit.</small
	>
	<div class="text-center">
		<a class="inline-block" href="https://github.com/leandrososa/verdolaga"><GithubSolid /></a>
	</div>
</section>

<style>
</style>
