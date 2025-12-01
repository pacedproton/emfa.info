<script lang="ts">
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  const navLinks = [
    { href: '#overview', label: 'Overview' },
    { href: '#articles', label: 'Articles' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#compliance', label: 'Compliance' }
  ];

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<div class="banner">
  <div class="container banner-content">
    <span class="eu-stars">★★★★★★★★★★★★</span>
    <span>Independent Information Resource on EU Regulation 2024/1083</span>
  </div>
</div>

<header class="header" class:scrolled>
  <div class="container header-content">
    <a href="/" class="logo">
      <div class="logo-emblem">
        <span>EMFA</span>
      </div>
      <div class="logo-text">
        <span class="logo-title">European Media Freedom Act</span>
        <span class="logo-subtitle">Regulation (EU) 2024/1083</span>
      </div>
    </a>

    <nav class="nav" class:open={mobileMenuOpen}>
      <ul class="nav-list">
        {#each navLinks as link, i}
          <li style="--delay: {i * 50}ms">
            <a href={link.href} class="nav-link" onclick={() => mobileMenuOpen = false}>
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <button
      class="mobile-toggle"
      class:open={mobileMenuOpen}
      onclick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<style>
  .banner {
    background: linear-gradient(135deg, var(--eu-blue), var(--eu-blue-dark));
    color: white;
    padding: var(--space-2) 0;
    font-size: 0.875rem;
  }

  .banner-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    flex-wrap: wrap;
    text-align: center;
  }

  .eu-stars {
    color: var(--eu-gold);
    letter-spacing: 2px;
    font-size: 0.75rem;
  }

  .header {
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    z-index: 100;
    transition: all 0.3s var(--ease-out);
  }

  .header.scrolled {
    border-bottom-color: var(--gray-200);
    box-shadow: var(--shadow-md);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    gap: var(--space-6);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    color: inherit;
  }

  .logo-emblem {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--eu-blue), var(--eu-blue-dark));
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    transition: transform 0.3s var(--spring);
  }

  .logo:hover .logo-emblem {
    transform: scale(1.05);
  }

  .logo-emblem span {
    color: var(--eu-gold);
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  .logo-text {
    display: flex;
    flex-direction: column;
  }

  .logo-title {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--gray-900);
    line-height: 1.2;
  }

  .logo-subtitle {
    font-size: 0.6875rem;
    color: var(--gray-500);
    font-weight: 500;
  }

  .nav-list {
    display: flex;
    list-style: none;
    gap: var(--space-1);
  }

  .nav-link {
    display: block;
    padding: var(--space-2) var(--space-4);
    color: var(--gray-700);
    font-weight: 500;
    font-size: 0.9375rem;
    border-radius: var(--radius);
    transition: all 0.2s var(--ease-out);
    position: relative;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary-600);
    transition: all 0.3s var(--ease-out);
    transform: translateX(-50%);
  }

  .nav-link:hover {
    color: var(--primary-600);
    background: var(--primary-50);
  }

  .nav-link:hover::after {
    width: calc(100% - var(--space-8));
  }

  .mobile-toggle {
    display: none;
    width: 44px;
    height: 44px;
    padding: var(--space-2);
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    z-index: 101;
  }

  .mobile-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--gray-700);
    border-radius: 2px;
    transition: all 0.3s var(--ease-out);
    transform-origin: center;
  }

  .mobile-toggle.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-toggle.open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .mobile-toggle.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  @media (max-width: 768px) {
    .mobile-toggle {
      display: flex;
    }

    .logo-text {
      display: none;
    }

    .nav {
      position: fixed;
      top: 0;
      right: 0;
      width: 280px;
      height: 100vh;
      background: white;
      box-shadow: var(--shadow-2xl);
      transform: translateX(100%);
      transition: transform 0.4s var(--ease-out);
      padding: var(--space-20) var(--space-6);
      z-index: 100;
    }

    .nav.open {
      transform: translateX(0);
    }

    .nav-list {
      flex-direction: column;
      gap: var(--space-2);
    }

    .nav-list li {
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.3s var(--ease-out);
      transition-delay: var(--delay);
    }

    .nav.open .nav-list li {
      opacity: 1;
      transform: translateX(0);
    }

    .nav-link {
      padding: var(--space-3) var(--space-4);
      font-size: 1.125rem;
    }
  }
</style>
