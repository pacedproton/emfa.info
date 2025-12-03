<script lang="ts">
  import { fade } from "svelte/transition";

  export let data;

  $: ({ article, chapter } = data);
</script>

<svelte:head>
  <title>{article ? `${article.title} - EMFA.info` : "Article Not Found"}</title
  >
</svelte:head>

{#if article && chapter}
  <div class="article-container" in:fade>
    <nav class="breadcrumb">
      <a href="/articles">Articles</a>
      <span class="separator">/</span>
      <span class="current">Chapter {chapter.number}</span>
    </nav>

    <header class="article-header">
      <div class="meta">
        <span class="article-number">{article.number}</span>
        {#if article.isCritical}
          <span class="critical-badge">Critical Provision</span>
        {/if}
      </div>
      <h1>{article.title}</h1>
    </header>

    <div class="content-grid">
      <div class="main-content">
        <section class="section provisions-section">
          <h2>Key Provisions</h2>
          <ul class="provisions-list">
            {#each article.provisions as provision}
              <li>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>{provision}</span>
              </li>
            {/each}
          </ul>
        </section>

        {#if article.fullText}
          <section class="section full-text-section">
            <h2>Legal Text</h2>
            <div class="legal-text">
              {@html article.fullText}
            </div>
          </section>
        {:else}
          <section class="section placeholder-section">
            <div class="placeholder-content">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                ></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <h3>Full Legal Text Coming Soon</h3>
              <p>
                We are currently digitizing the full legal text of the
                regulation.
              </p>
              <a
                href="https://eur-lex.europa.eu/eli/reg/2024/1083/oj"
                target="_blank"
                rel="noopener noreferrer"
                class="external-link"
              >
                View on EUR-Lex
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </section>
        {/if}
      </div>

      <aside class="sidebar">
        {#if article.analysis}
          <div class="analysis-card">
            <div class="card-header">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <h3>Legal Analysis</h3>
            </div>
            <div class="card-content">
              <p>{article.analysis}</p>
            </div>
          </div>
        {/if}

        <div class="navigation-card">
          <h3>In this Chapter</h3>
          <ul class="chapter-nav">
            {#each chapter.articles as a}
              <li>
                <a href="/articles/{a.id}" class:active={a.id === article.id}>
                  <span class="nav-number">{a.number}</span>
                  <span class="nav-title">{a.title}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </aside>
    </div>
  </div>
{:else}
  <div class="error-container">
    <h1>Article Not Found</h1>
    <p>The requested article could not be found.</p>
    <a href="/articles" class="btn">Return to Articles</a>
  </div>
{/if}

<style>
  .article-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-8);
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .breadcrumb a {
    color: var(--gray-600);
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb a:hover {
    color: var(--primary-600);
  }

  .article-header {
    margin-bottom: var(--space-12);
    padding-bottom: var(--space-8);
    border-bottom: 1px solid var(--gray-200);
  }

  .meta {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .article-number {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-600);
  }

  .critical-badge {
    padding: var(--space-1) var(--space-3);
    background: var(--error);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: var(--radius-full);
  }

  h1 {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--gray-900);
    line-height: 1.2;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: var(--space-12);
  }

  @media (max-width: 900px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  .section {
    margin-bottom: var(--space-12);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--space-6);
    color: var(--gray-900);
  }

  .provisions-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .provisions-list li {
    display: flex;
    gap: var(--space-4);
    padding: var(--space-4);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-200);
  }

  .provisions-list svg {
    flex-shrink: 0;
    color: var(--success);
  }

  .provisions-list span {
    line-height: 1.6;
    color: var(--gray-700);
  }

  .placeholder-section {
    background: var(--gray-50);
    border: 2px dashed var(--gray-300);
    border-radius: var(--radius-xl);
    padding: var(--space-12);
    text-align: center;
  }

  .placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    color: var(--gray-600);
  }

  .external-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--primary-600);
    font-weight: 600;
    text-decoration: none;
  }

  .external-link:hover {
    text-decoration: underline;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .analysis-card {
    background: linear-gradient(135deg, var(--primary-50), white);
    border: 1px solid var(--primary-200);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-5);
    background: var(--primary-100);
    color: var(--primary-800);
  }

  .card-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  .card-content {
    padding: var(--space-5);
    color: var(--gray-700);
    line-height: 1.6;
  }

  .navigation-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }

  .navigation-card h3 {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--gray-500);
    margin-bottom: var(--space-4);
  }

  .chapter-nav {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .chapter-nav a {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    text-decoration: none;
    color: var(--gray-600);
    transition: all 0.2s;
  }

  .chapter-nav a:hover {
    background: var(--gray-50);
    color: var(--primary-600);
  }

  .chapter-nav a.active {
    background: var(--primary-50);
    color: var(--primary-700);
    font-weight: 600;
  }

  .nav-number {
    font-size: 0.75rem;
    color: var(--gray-400);
    min-width: 60px;
  }

  .chapter-nav a.active .nav-number {
    color: var(--primary-500);
  }
</style>
