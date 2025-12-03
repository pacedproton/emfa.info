<script lang="ts">
  import { page } from "$app/stores";

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  const navItems = [
    { label: "Articles", href: "/articles" },
    { label: "Timeline", href: "/timeline" },
    { label: "Compliance", href: "/compliance" },
    { label: "Glossary", href: "/glossary" },
  ];
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
      {#each navItems as item}
        <a
          href={item.href}
          class="nav-link"
          class:active={$page.url.pathname.startsWith(item.href)}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="header-actions">
      <button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
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
    <div class="mobile-menu">
      <nav class="mobile-nav">
        {#each navItems as item}
          <a
            href={item.href}
            class="mobile-nav-link"
            class:active={$page.url.pathname.startsWith(item.href)}
            onclick={() => (isMenuOpen = false)}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>

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
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    color: var(--gray-900);
    font-weight: 700;
    font-size: 1.25rem;
  }

  .logo-icon {
    color: var(--primary-600);
  }

  .highlight {
    color: var(--primary-600);
  }

  .desktop-nav {
    display: none;
    gap: var(--space-8);
  }

  .nav-link {
    text-decoration: none;
    color: var(--gray-600);
    font-weight: 500;
    font-size: 0.9375rem;
    transition: color 0.2s ease;
    position: relative;
  }

  .nav-link:hover {
    color: var(--primary-600);
  }

  .nav-link.active {
    color: var(--primary-700);
  }

  .nav-link.active::after {
    content: "";
    position: absolute;
    bottom: -26px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-600);
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    color: var(--gray-700);
    cursor: pointer;
    padding: var(--space-2);
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border-bottom: 1px solid var(--gray-200);
    padding: var(--space-4);
    box-shadow: var(--shadow-lg);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .mobile-nav-link {
    display: block;
    padding: var(--space-3) var(--space-4);
    text-decoration: none;
    color: var(--gray-700);
    font-weight: 500;
    border-radius: var(--radius-lg);
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    background: var(--gray-50);
    color: var(--primary-700);
  }

  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
    }

    .menu-toggle {
      display: none;
    }
  }
</style>
