<script lang="ts">
  import { pillars } from '$lib/data/emfa';
  import { fly, scale } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let sectionEl: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="overview" class="section section-alt" bind:this={sectionEl}>
  <div class="container">
    {#if visible}
      <div class="section-header" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
        <span class="section-label">Core Framework</span>
        <h2 class="section-title">Four Pillars of Media Freedom</h2>
        <p class="section-subtitle">
          The EMFA establishes four fundamental pillars to protect and promote media freedom across the European Union
        </p>
      </div>

      <div class="pillars-grid">
        {#each pillars as pillar, i}
          <a
            href={pillar.link}
            class="pillar-card"
            in:fly={{ y: 40, duration: 600, delay: i * 100 + 200, easing: quintOut }}
          >
            <div class="pillar-icon" in:scale={{ duration: 400, delay: i * 100 + 400, easing: elasticOut }}>
              {pillar.icon}
            </div>
            <h3 class="pillar-title">{pillar.title}</h3>
            <p class="pillar-description">{pillar.description}</p>
            <div class="pillar-link">
              <span>Learn more</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        {/each}
      </div>

      <div class="info-cards" in:fly={{ y: 30, duration: 600, delay: 600, easing: quintOut }}>
        <div class="info-card">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h4>Legal Basis</h4>
          <p>Article 114 TFEU (internal market harmonization). The regulation establishes minimum standards while allowing Member States to maintain higher protections.</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h4>Geographic Scope</h4>
          <p>Applies to all 27 EU Member States. Also covers non-EU providers directing services to EU audiences, following GDPR's extraterritorial approach.</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h4>Enforcement</h4>
          <p>National regulatory authorities are primarily responsible. The European Board for Media Services coordinates cross-border enforcement and provides guidance.</p>
        </div>
      </div>
    {/if}
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

  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
    margin-bottom: var(--space-12);
  }

  .pillar-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    text-align: center;
    border: 1px solid var(--gray-200);
    transition: all 0.4s var(--ease-out);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pillar-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-300);
  }

  .pillar-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--primary-100), var(--primary-200));
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin-bottom: var(--space-5);
    transition: all 0.3s var(--ease-out);
  }

  .pillar-card:hover .pillar-icon {
    background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
    transform: scale(1.1);
  }

  .pillar-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: var(--space-3);
    color: var(--gray-900);
  }

  .pillar-description {
    color: var(--gray-600);
    font-size: 0.9375rem;
    line-height: 1.6;
    flex: 1;
  }

  .pillar-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-5);
    color: var(--primary-600);
    font-weight: 600;
    font-size: 0.875rem;
    transition: gap 0.3s var(--ease-out);
  }

  .pillar-card:hover .pillar-link {
    gap: var(--space-3);
  }

  .info-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  .info-card {
    background: linear-gradient(135deg, var(--gray-50), white);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    border: 1px solid var(--gray-200);
    transition: all 0.3s var(--ease-out);
  }

  .info-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--primary-200);
  }

  .info-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--eu-blue), var(--eu-blue-dark));
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: var(--space-4);
  }

  .info-card h4 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: var(--space-2);
    color: var(--gray-900);
  }

  .info-card p {
    color: var(--gray-600);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .pillars-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .pillars-grid {
      grid-template-columns: 1fr;
    }

    .info-cards {
      grid-template-columns: 1fr;
    }

    .pillar-card {
      padding: var(--space-6);
    }
  }
</style>
