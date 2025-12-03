<script lang="ts">
  import { definitions } from "$lib/data/emfa";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let searchTerm = $state("");

  let filteredDefinitions = $derived(
    searchTerm
      ? definitions.filter(
          (d) =>
            d.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.definition.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : definitions,
  );
</script>

<svelte:head>
  <title>Glossary - EMFA.info</title>
  <meta
    name="description"
    content="Key definitions and terms from the European Media Freedom Act."
  />
</svelte:head>

<div class="page-container">
  <header class="page-header">
    <h1>Glossary</h1>
    <p class="subtitle">Key definitions and terminology defined in Article 2</p>

    <div class="search-container">
      <input
        type="text"
        placeholder="Search terms..."
        bind:value={searchTerm}
      />
    </div>
  </header>

  <div class="definitions-grid">
    {#each filteredDefinitions as def, i (def.term)}
      <div
        class="definition-card"
        in:fly={{ y: 20, duration: 400, delay: i * 50, easing: quintOut }}
      >
        <div class="card-header">
          <h2>{def.term}</h2>
          <span class="source-badge">{def.source}</span>
        </div>
        <p>{def.definition}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .page-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  h1 {
    font-family: var(--font-serif);
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-bottom: var(--space-4);
    color: var(--gray-900);
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--gray-600);
    margin-bottom: var(--space-8);
  }

  .search-container {
    max-width: 500px;
    margin: 0 auto;
  }

  input {
    width: 100%;
    padding: var(--space-4);
    font-size: 1.125rem;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-full);
    text-align: center;
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 4px var(--primary-100);
  }

  .definitions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-6);
  }

  .definition-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    transition: all 0.3s ease;
  }

  .definition-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-300);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-4);
    gap: var(--space-4);
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-700);
    line-height: 1.3;
  }

  .source-badge {
    font-size: 0.75rem;
    color: var(--gray-500);
    background: var(--gray-100);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
  }

  p {
    color: var(--gray-700);
    line-height: 1.6;
  }
</style>
