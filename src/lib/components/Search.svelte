<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    chapters,
    definitions,
    type Article,
    type Definition,
  } from "$lib/data/emfa";

  export let isOpen = false;

  const dispatch = createEventDispatcher();
  let query = "";
  let inputElement: HTMLInputElement;

  // Flatten articles for easier searching
  const allArticles = chapters.flatMap((c) => c.articles);

  interface SearchResult {
    type: "article" | "definition";
    title: string;
    subtitle?: string;
    link: string;
    matchContext?: string;
  }

  let results: SearchResult[] = [];

  $: if (isOpen && inputElement) {
    setTimeout(() => inputElement.focus(), 100);
  }

  $: {
    if (!query.trim()) {
      results = [];
    } else {
      const q = query.toLowerCase();
      const articleResults: SearchResult[] = allArticles
        .filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.number.toLowerCase().includes(q) ||
            a.provisions.some((p) => p.toLowerCase().includes(q)) ||
            (a.analysis && a.analysis.toLowerCase().includes(q)) ||
            (a.fullText && a.fullText.toLowerCase().includes(q)),
        )
        .map((a) => ({
          type: "article",
          title: `${a.number}: ${a.title}`,
          subtitle: "Article",
          link: `/articles/${a.id}`,
        }));

      const definitionResults: SearchResult[] = definitions
        .filter(
          (d) =>
            d.term.toLowerCase().includes(q) ||
            d.definition.toLowerCase().includes(q),
        )
        .map((d) => ({
          type: "definition",
          title: d.term,
          subtitle: "Definition",
          link: "/glossary", // Ideally link to specific definition if possible, or just glossary
        }));

      results = [...articleResults, ...definitionResults];
    }
  }

  function close() {
    dispatch("close");
    query = "";
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  function navigate(link: string) {
    goto(link);
    close();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div
    class="modal-backdrop"
    on:click={close}
    transition:fade={{ duration: 200 }}
  >
    <div
      class="modal-content"
      on:click|stopPropagation
      transition:fly={{ y: -20, duration: 300 }}
    >
      <div class="search-header">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          bind:this={inputElement}
          bind:value={query}
          type="text"
          placeholder="Search articles, definitions..."
          class="search-input"
        />
        <button class="close-btn" on:click={close}>Esc</button>
      </div>

      {#if results.length > 0}
        <div class="results-list">
          {#each results as result}
            <button class="result-item" on:click={() => navigate(result.link)}>
              <div class="result-icon">
                {#if result.type === "article"}
                  📄
                {:else}
                  📖
                {/if}
              </div>
              <div class="result-info">
                <div class="result-title">{result.title}</div>
                <div class="result-subtitle">{result.subtitle}</div>
              </div>
              <div class="result-arrow">→</div>
            </button>
          {/each}
        </div>
      {:else if query}
        <div class="no-results">
          No results found for "{query}"
        </div>
      {/if}

      {#if !query}
        <div class="search-hint">
          Try searching for "Article 4", "Spyware", or "Independence"
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 10vh;
  }

  .modal-content {
    width: 100%;
    max-width: 600px;
    background: var(--bg-card);
    border-radius: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    border: 1px solid var(--border-color);
    margin: 0 1rem;
  }

  .search-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    gap: 0.75rem;
  }

  .search-input {
    flex: 1;
    background: none;
    border: none;
    font-size: 1.1rem;
    color: var(--text-primary);
    outline: none;
  }

  .close-btn {
    padding: 0.25rem 0.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .results-list {
    max-height: 60vh;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .result-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
    gap: 1rem;
  }

  .result-item:hover {
    background: var(--bg-secondary);
  }

  .result-icon {
    font-size: 1.2rem;
  }

  .result-info {
    flex: 1;
  }

  .result-title {
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.95rem;
  }

  .result-subtitle {
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-top: 0.1rem;
  }

  .result-arrow {
    color: var(--text-secondary);
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.2s;
  }

  .result-item:hover .result-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .no-results,
  .search-hint {
    padding: 2rem;
    text-align: center;
    color: var(--text-secondary);
  }
</style>
