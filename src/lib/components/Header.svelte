<script lang="ts">
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";
  import Search from "./Search.svelte";

  let isMenuOpen = false;
  let isSearchOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function openSearch() {
    isSearchOpen = true;
  }

  $: activeRoute = $page.url.pathname;
</script>

<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <div class="logo-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <span class="logo-text">EMFA<span class="highlight">.info</span></span>
    </a>

    <nav class="desktop-nav">
      <a href="/articles" class:active={activeRoute.startsWith("/articles")}
        >Articles</a
      >
      <a href="/timeline" class:active={activeRoute === "/timeline"}>Timeline</a
      >
      <a href="/compliance" class:active={activeRoute === "/compliance"}
        >Compliance</a
      >
      <a href="/glossary" class:active={activeRoute === "/glossary"}>Glossary</a
      >
    </nav>

    <div class="header-actions">
      <button class="search-trigger" on:click={openSearch}>
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
        <span class="search-placeholder">Search...</span>
        <span class="search-shortcut">⌘K</span>
      </button>

      <a
        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1083"
        target="_blank"
        class="btn-outline"
      >
        Official Text ↗
      </a>

      <button
        class="mobile-menu-btn"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          {#if isMenuOpen}
            <path d="M18 6L6 18M6 6l12 12" />
          {:else}
            <path d="M3 12h18M3 6h18M3 18h18" />
          {/if}
        </svg>
      </button>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="mobile-menu" transition:slide>
      <nav>
        <a href="/articles" on:click={toggleMenu}>Articles</a>
        <a href="/timeline" on:click={toggleMenu}>Timeline</a>
        <a href="/compliance" on:click={toggleMenu}>Compliance</a>
        <a href="/glossary" on:click={toggleMenu}>Glossary</a>
      </nav>
    </div>
  {/if}
</header>

<Search bind:isOpen={isSearchOpen} on:close={() => (isSearchOpen = false)} />

<svelte:window
  on:keydown={(e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openSearch();
    }
  }}
/>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--gray-200);
  }

  .header-inner {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--gray-900);
  }

  .logo-icon {
    color: var(--primary-600);
    display: flex;
    align-items: center;
  }

  .highlight {
    color: var(--primary-600);
  }

  .desktop-nav {
    display: none;
    gap: 2rem;
  }

  .desktop-nav a {
    text-decoration: none;
    color: var(--gray-600);
    font-weight: 500;
    transition: color 0.2s;
    font-size: 0.95rem;
  }

  .desktop-nav a:hover,
  .desktop-nav a.active {
    color: var(--primary-600);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .search-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gray-100);
    border: 1px solid var(--gray-200);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    color: var(--gray-600);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .search-trigger:hover {
    border-color: var(--primary-600);
    color: var(--primary-600);
    background: white;
  }

  .search-shortcut {
    font-size: 0.75rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
  }

  .btn-outline {
    display: none;
    text-decoration: none;
    color: var(--gray-700);
    border: 1px solid var(--gray-200);
    padding: 0.4rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .btn-outline:hover {
    background: var(--gray-50);
    border-color: var(--gray-400);
    color: var(--gray-900);
  }

  .mobile-menu-btn {
    background: none;
    border: none;
    color: var(--gray-700);
    cursor: pointer;
    padding: 0.5rem;
  }

  .mobile-menu {
    border-top: 1px solid var(--gray-200);
    background: white;
  }

  .mobile-menu nav {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .mobile-menu a {
    padding: 0.75rem 0;
    text-decoration: none;
    color: var(--gray-600);
    border-bottom: 1px solid var(--gray-100);
  }

  .mobile-menu a:last-child {
    border-bottom: none;
  }

  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
    }

    .mobile-menu-btn {
      display: none;
    }

    .btn-outline {
      display: block;
    }
  }

  @media (max-width: 640px) {
    .search-placeholder,
    .search-shortcut {
      display: none;
    }

    .search-trigger {
      padding: 0.5rem;
    }
  }
</style>
