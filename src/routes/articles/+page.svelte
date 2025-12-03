<script lang="ts">
  import { chapters } from '$lib/data/emfa';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let searchTerm = $state('');

  // Flatten articles for search
  let allArticles = $derived(chapters.flatMap(c => c.articles.map(a => ({ ...a, chapter: c }))));
  
  let filteredChapters = $derived(searchTerm 
    ? chapters.map(c => ({
        ...c,
        articles: c.articles.filter(a => 
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          a.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.provisions.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })).filter(c => c.articles.length > 0)
    : chapters
  );
</script>

<svelte:head>
  <title>Articles - EMFA.info</title>
  <meta name="description" content="Browse all articles of the European Media Freedom Act." />
</svelte:head>

<div class="page-container">
  <header class="page-header">
    <h1>Articles & Provisions</h1>
    <p class="subtitle">Explore the full text and analysis of the European Media Freedom Act</p>
    
    <div class="search-container">
      <div class="search-input-wrapper">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Search articles..." 
          bind:value={searchTerm}
        />
      </div>
    </div>
  </header>

  <div class="chapters-list">
    {#each filteredChapters as chapter (chapter.number)}
      <section class="chapter-section" in:fly={{ y: 20, duration: 400, easing: quintOut }}>
        <div class="chapter-header">
          <span class="chapter-badge">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
        </div>

        <div class="articles-grid">
          {#each chapter.articles as article}
            <a href="/articles/{article.id}" class="article-card" class:critical={article.isCritical}>
              <div class="article-content">
                <div class="article-meta">
                  <span class="article-number">{article.number}</span>
                  {#if article.isCritical}
                    <span class="critical-badge">Critical</span>
                  {/if}
                </div>
                <h3>{article.title}</h3>
                <ul class="provisions-preview">
                  {#each article.provisions.slice(0, 2) as provision}
                    <li>{provision}</li>
                  {/each}
                  {#if article.provisions.length > 2}
                    <li class="more">+{article.provisions.length - 2} more provisions</li>
                  {/if}
                </ul>
              </div>
              <div class="article-footer">
                <span>Read Analysis</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  .page-container {
    max-width: 1200px;
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
    max-width: 600px;
    margin: 0 auto;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input-wrapper svg {
    position: absolute;
    left: var(--space-4);
    color: var(--gray-400);
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
    font-size: 1.125rem;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-full);
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 4px var(--primary-100);
  }

  .chapter-section {
    margin-bottom: var(--space-16);
  }

  .chapter-header {
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--gray-200);
  }

  .chapter-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: var(--primary-100);
    color: var(--primary-700);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-3);
  }

  .chapter-header h2 {
    font-family: var(--font-serif);
    font-size: 2rem;
    margin-bottom: var(--space-2);
  }

  .chapter-header p {
    color: var(--gray-600);
    font-size: 1.125rem;
    max-width: 800px;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-6);
  }

  .article-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  .article-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-300);
  }

  .article-card.critical {
    background: linear-gradient(135deg, white 0%, var(--primary-50) 100%);
    border-color: var(--primary-200);
  }

  .article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-3);
  }

  .article-number {
    font-weight: 700;
    color: var(--primary-600);
    font-size: 0.875rem;
  }

  .critical-badge {
    padding: 2px 8px;
    background: var(--error);
    color: white;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: var(--radius-sm);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--space-4);
    line-height: 1.4;
  }

  .provisions-preview {
    list-style: none;
    margin-bottom: var(--space-6);
  }

  .provisions-preview li {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: var(--space-2);
    padding-left: var(--space-3);
    border-left: 2px solid var(--gray-200);
    line-height: 1.5;
  }

  .provisions-preview li.more {
    border-left: none;
    padding-left: 0;
    color: var(--gray-400);
    font-style: italic;
  }

  .article-footer {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--primary-600);
  }

  .article-footer svg {
    transition: transform 0.2s ease;
  }

  .article-card:hover .article-footer svg {
    transform: translateX(4px);
  }
</style>
