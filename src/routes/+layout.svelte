<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>EMFA.info - European Media Freedom Act</title>
	<meta name="description" content="Comprehensive information resource on the European Media Freedom Act (EU Regulation 2024/1083). Explore articles, timeline, and compliance requirements." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23003399' width='100' height='100' rx='20'/%3E%3Ctext x='50' y='65' font-family='system-ui' font-size='40' font-weight='bold' fill='%23FFD700' text-anchor='middle'%3EEMFA%3C/text%3E%3C/svg%3E" />
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />
