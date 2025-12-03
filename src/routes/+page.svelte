<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import Overview from "$lib/components/Overview.svelte";
</script>

<Hero />
<Overview />

<section class="section">
  <div class="container">
    <div class="features-grid">
      <a href="/articles" class="feature-card">
        <div class="icon">📚</div>
        <h3>Articles & Provisions</h3>
        <p>Explore the full text and analysis of all 26 articles.</p>
        <span class="link">Browse Articles →</span>
      </a>

      <a href="/timeline" class="feature-card">
        <div class="icon">📅</div>
        <h3>Implementation Timeline</h3>
        <p>Track key dates and milestones for compliance.</p>
        <span class="link">View Timeline →</span>
      </a>

      <a href="/compliance" class="feature-card">
        <div class="icon">✓</div>
        <h3>Compliance Guide</h3>
        <p>Checklists for media providers, states, and platforms.</p>
        <span class="link">Check Compliance →</span>
      </a>

      <a href="/glossary" class="feature-card">
        <div class="icon">📖</div>
        <h3>Glossary</h3>
        <p>Definitions of key legal terms and concepts.</p>
        <span class="link">View Glossary →</span>
      </a>
    </div>
  </div>
</section>

<style>
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-12);
    margin-bottom: var(--space-12);
  }

  .feature-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-200);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-4);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--space-2);
    color: var(--gray-900);
  }

  p {
    color: var(--gray-600);
    margin-bottom: var(--space-6);
    line-height: 1.5;
    flex-grow: 1;
  }

  .link {
    font-weight: 600;
    color: var(--primary-600);
    font-size: 0.9375rem;
  }
</style>
