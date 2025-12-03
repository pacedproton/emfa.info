<script lang="ts">
  import { onMount } from "svelte";
  import { keyStats } from "$lib/data/emfa";
  import { fly, fade, scale } from "svelte/transition";
  import { quintOut, elasticOut } from "svelte/easing";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<section class="hero">
  <div class="hero-bg">
    <div class="hero-gradient"></div>
    <div class="hero-pattern"></div>
    <div class="hero-orb orb-1"></div>
    <div class="hero-orb orb-2"></div>
  </div>

  <div class="container hero-content">
    {#if mounted}
      <div
        class="hero-text"
        in:fly={{ y: 40, duration: 800, delay: 100, easing: quintOut }}
      >
        <div
          class="hero-badge"
          in:scale={{ duration: 500, delay: 200, easing: elasticOut }}
        >
          <span class="badge-icon">⚖</span>
          <span>Official EU Regulation</span>
        </div>

        <h1
          class="hero-title"
          in:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}
        >
          European Media<br />
          <span class="gradient-text">Freedom Act</span>
        </h1>

        <p
          class="hero-subtitle"
          in:fly={{ y: 20, duration: 700, delay: 400, easing: quintOut }}
        >
          Regulation (EU) 2024/1083 of the European Parliament and of the
          Council
        </p>

        <p
          class="hero-description"
          in:fly={{ y: 20, duration: 700, delay: 500, easing: quintOut }}
        >
          The first comprehensive EU-wide legal framework establishing common
          safeguards for media freedom, editorial independence, and journalist
          protection across all Member States.
        </p>

        <div
          class="hero-meta"
          in:fly={{ y: 20, duration: 700, delay: 600, easing: quintOut }}
        >
          <div class="meta-item">
            <span class="meta-label">Entry into Force</span>
            <span class="meta-value">7 May 2024</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">Full Application</span>
            <span class="meta-value highlight">8 August 2025</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">Legal Basis</span>
            <span class="meta-value">Art. 114 TFEU</span>
          </div>
        </div>

        <div
          class="hero-actions"
          in:fly={{ y: 20, duration: 700, delay: 700, easing: quintOut }}
        >
          <a href="/articles" class="btn btn-primary">
            <span>Explore Legal Framework</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="/compliance" class="btn btn-secondary">
            Compliance Checker
          </a>
        </div>
      </div>

      <div
        class="hero-card-wrapper"
        in:fly={{ x: 40, duration: 900, delay: 400, easing: quintOut }}
      >
        <div class="hero-card">
          <div class="card-header">
            <span class="card-icon">📋</span>
            <span>Quick Reference</span>
          </div>
          <ul class="quick-stats">
            {#each Object.entries(keyStats) as [key, value], i}
              <li
                in:scale={{
                  duration: 400,
                  delay: 600 + i * 100,
                  easing: elasticOut,
                }}
              >
                <span class="stat-number">{value}</span>
                <span class="stat-label"
                  >{key.charAt(0).toUpperCase() + key.slice(1)}</span
                >
              </li>
            {/each}
          </ul>
          <div class="card-footer">
            <a
              href="https://eur-lex.europa.eu/eli/reg/2024/1083/oj/eng"
              target="_blank"
              rel="noopener"
              class="official-link"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Official EUR-Lex Text</span>
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="hero-scroll">
    <a href="#overview" aria-label="Scroll to overview">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: var(--space-16) 0 var(--space-20);
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  .hero-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      var(--gray-50) 0%,
      white 50%,
      var(--primary-50) 100%
    );
  }

  .hero-pattern {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23003399' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float 8s ease-in-out infinite;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, var(--primary-200), var(--primary-300));
    top: -100px;
    right: -100px;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, var(--eu-gold), #fde68a);
    bottom: -50px;
    left: -50px;
    animation-delay: -4s;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: var(--space-12);
    align-items: center;
    position: relative;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
    border: 1px solid var(--primary-200);
    color: var(--primary-700);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-6);
  }

  .badge-icon {
    font-size: 1.125rem;
  }

  .hero-title {
    font-family: var(--font-serif);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: var(--space-4);
    color: var(--gray-900);
  }

  .hero-subtitle {
    font-size: 1.125rem;
    color: var(--primary-600);
    font-weight: 500;
    margin-bottom: var(--space-4);
  }

  .hero-description {
    font-size: 1.125rem;
    color: var(--gray-600);
    max-width: 600px;
    margin-bottom: var(--space-8);
    line-height: 1.7;
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-5) var(--space-6);
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--gray-100);
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .meta-label {
    font-size: 0.75rem;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .meta-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--gray-900);
  }

  .meta-value.highlight {
    color: var(--primary-600);
  }

  .meta-divider {
    width: 1px;
    height: 40px;
    background: var(--gray-200);
  }

  .hero-actions {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .hero-card-wrapper {
    position: relative;
  }

  .hero-card {
    background: white;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-2xl);
    overflow: hidden;
    border: 1px solid var(--gray-100);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-6);
    background: linear-gradient(135deg, var(--eu-blue), var(--eu-blue-dark));
    color: white;
    font-weight: 600;
  }

  .card-icon {
    font-size: 1.25rem;
  }

  .quick-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--gray-100);
    list-style: none;
  }

  .quick-stats li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
    background: white;
    text-align: center;
    transition: background 0.3s ease;
  }

  .quick-stats li:hover {
    background: var(--primary-50);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--primary-600);
    line-height: 1;
    margin-bottom: var(--space-2);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--gray-500);
    font-weight: 500;
    text-transform: capitalize;
  }

  .card-footer {
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--gray-100);
    background: var(--gray-50);
  }

  .official-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--primary-600);
    font-weight: 500;
    font-size: 0.875rem;
    transition: gap 0.3s ease;
  }

  .official-link:hover {
    gap: var(--space-3);
  }

  .hero-scroll {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
  }

  .hero-scroll a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 2px solid var(--gray-300);
    border-radius: 50%;
    color: var(--gray-400);
    transition: all 0.3s var(--ease-out);
    animation: bounce 2s infinite;
  }

  .hero-scroll a:hover {
    border-color: var(--primary-600);
    color: var(--primary-600);
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 1024px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero-description {
      margin-left: auto;
      margin-right: auto;
    }

    .hero-meta {
      justify-content: center;
    }

    .hero-actions {
      justify-content: center;
    }

    .hero-card-wrapper {
      max-width: 400px;
      margin: 0 auto;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: var(--space-10) 0 var(--space-16);
    }

    .hero-meta {
      flex-direction: column;
      gap: var(--space-4);
      align-items: stretch;
      text-align: center;
    }

    .meta-divider {
      display: none;
    }

    .hero-actions {
      flex-direction: column;
    }

    .hero-card-wrapper {
      display: none;
    }
  }
</style>
