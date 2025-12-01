<script lang="ts">
  import { chapters, type Chapter, type Article } from '$lib/data/emfa';
  import { fly, slide, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let activeChapter = $state(0);
  let expandedArticles = $state<Set<string>>(new Set());

  function selectChapter(index: number) {
    activeChapter = index;
    expandedArticles = new Set();
  }

  function toggleArticle(articleId: string) {
    const newSet = new Set(expandedArticles);
    if (newSet.has(articleId)) {
      newSet.delete(articleId);
    } else {
      newSet.add(articleId);
    }
    expandedArticles = newSet;
  }

  function isExpanded(articleId: string): boolean {
    return expandedArticles.has(articleId);
  }
</script>

<section id="articles" class="section section-alt">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Legal Framework</span>
      <h2 class="section-title">Articles & Provisions</h2>
      <p class="section-subtitle">
        Comprehensive breakdown of all 26 articles across 5 chapters of the European Media Freedom Act
      </p>
    </div>

    <div class="chapters-nav">
      {#each chapters as chapter, i}
        <button
          class="chapter-tab"
          class:active={activeChapter === i}
          onclick={() => selectChapter(i)}
        >
          <span class="chapter-num">Chapter {chapter.number}</span>
          <span class="chapter-title">{chapter.title}</span>
        </button>
      {/each}
    </div>

    <div class="chapter-content">
      {#key activeChapter}
        <div class="chapter-header" in:fly={{ y: 20, duration: 400, easing: quintOut }}>
          <div class="chapter-badge">Chapter {chapters[activeChapter].number}</div>
          <h3 class="chapter-name">{chapters[activeChapter].title}</h3>
          <p class="chapter-desc">{chapters[activeChapter].description}</p>
        </div>

        <div class="articles-list">
          {#each chapters[activeChapter].articles as article, i}
            <div
              class="article-card"
              class:critical={article.isCritical}
              class:expanded={isExpanded(article.id)}
              in:fly={{ y: 30, duration: 400, delay: i * 100, easing: quintOut }}
            >
              <button
                class="article-header"
                onclick={() => toggleArticle(article.id)}
                aria-expanded={isExpanded(article.id)}
              >
                <div class="article-info">
                  {#if article.isCritical}
                    <span class="critical-badge">Critical</span>
                  {/if}
                  <span class="article-number">{article.number}</span>
                  <span class="article-title">{article.title}</span>
                </div>
                <div class="article-toggle">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class:rotated={isExpanded(article.id)}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              {#if isExpanded(article.id)}
                <div class="article-body" transition:slide={{ duration: 300, easing: quintOut }}>
                  <div class="provisions">
                    <h4>Key Provisions</h4>
                    <ul>
                      {#each article.provisions as provision, j}
                        <li in:fly={{ x: -20, duration: 300, delay: j * 50 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                          <span>{provision}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>

                  {#if article.analysis}
                    <div class="analysis" in:fly={{ y: 20, duration: 400, delay: 200 }}>
                      <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                        Legal Analysis
                      </h4>
                      <p>{article.analysis}</p>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/key}
    </div>
  </div>
</section>

<style>
  .section-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .section-label {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: var(--primary-100);
    color: var(--primary-700);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-4);
  }

  .section-title {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4vw, 2.75rem);
    margin-bottom: var(--space-4);
  }

  .section-subtitle {
    color: var(--gray-600);
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.125rem;
  }

  .chapters-nav {
    display: flex;
    gap: var(--space-2);
    overflow-x: auto;
    padding-bottom: var(--space-4);
    margin-bottom: var(--space-8);
    scrollbar-width: none;
  }

  .chapters-nav::-webkit-scrollbar {
    display: none;
  }

  .chapter-tab {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-4) var(--space-5);
    background: white;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-lg);
    white-space: nowrap;
    transition: all 0.3s var(--ease-out);
    min-width: 160px;
  }

  .chapter-tab:hover {
    border-color: var(--primary-300);
    background: var(--primary-50);
  }

  .chapter-tab.active {
    border-color: var(--primary-600);
    background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
    color: white;
  }

  .chapter-num {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.7;
    margin-bottom: var(--space-1);
  }

  .chapter-title {
    font-weight: 600;
    font-size: 0.9375rem;
  }

  .chapter-content {
    background: var(--gray-50);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    border: 1px solid var(--gray-200);
  }

  .chapter-header {
    text-align: center;
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--gray-200);
  }

  .chapter-badge {
    display: inline-block;
    padding: var(--space-2) var(--space-4);
    background: linear-gradient(135deg, var(--eu-blue), var(--eu-blue-dark));
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-3);
  }

  .chapter-name {
    font-family: var(--font-serif);
    font-size: 1.75rem;
    margin-bottom: var(--space-2);
  }

  .chapter-desc {
    color: var(--gray-600);
    max-width: 700px;
    margin: 0 auto;
  }

  .articles-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .article-card {
    background: white;
    border-radius: var(--radius-xl);
    border: 1px solid var(--gray-200);
    overflow: hidden;
    transition: all 0.3s var(--ease-out);
  }

  .article-card:hover {
    box-shadow: var(--shadow-md);
  }

  .article-card.critical {
    border-color: var(--primary-300);
    background: linear-gradient(135deg, white 0%, var(--primary-50) 100%);
  }

  .article-card.expanded {
    box-shadow: var(--shadow-lg);
  }

  .article-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-5) var(--space-6);
    text-align: left;
    transition: background 0.2s ease;
  }

  .article-header:hover {
    background: var(--gray-50);
  }

  .article-info {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .critical-badge {
    padding: var(--space-1) var(--space-2);
    background: linear-gradient(135deg, var(--error), #dc2626);
    color: white;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: var(--radius-sm);
  }

  .article-number {
    font-weight: 700;
    color: var(--primary-600);
    font-size: 0.9375rem;
  }

  .article-title {
    font-weight: 600;
    color: var(--gray-900);
  }

  .article-toggle {
    color: var(--gray-400);
    transition: color 0.2s ease;
  }

  .article-header:hover .article-toggle {
    color: var(--primary-600);
  }

  .article-toggle svg {
    transition: transform 0.3s var(--ease-out);
  }

  .article-toggle svg.rotated {
    transform: rotate(180deg);
  }

  .article-body {
    padding: 0 var(--space-6) var(--space-6);
    border-top: 1px solid var(--gray-100);
  }

  .provisions {
    padding-top: var(--space-5);
  }

  .provisions h4,
  .analysis h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray-700);
    margin-bottom: var(--space-3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .provisions ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    list-style: none;
  }

  .provisions li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    color: var(--gray-700);
    line-height: 1.5;
  }

  .provisions li svg {
    flex-shrink: 0;
    color: var(--success);
    margin-top: 2px;
  }

  .analysis {
    margin-top: var(--space-5);
    padding: var(--space-5);
    background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--primary-600);
  }

  .analysis h4 {
    color: var(--primary-700);
  }

  .analysis h4 svg {
    color: var(--primary-600);
  }

  .analysis p {
    color: var(--gray-700);
    line-height: 1.7;
    font-size: 0.9375rem;
  }

  @media (max-width: 768px) {
    .chapter-content {
      padding: var(--space-4);
    }

    .article-header {
      padding: var(--space-4);
    }

    .article-body {
      padding: 0 var(--space-4) var(--space-4);
    }

    .article-info {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }
  }
</style>
