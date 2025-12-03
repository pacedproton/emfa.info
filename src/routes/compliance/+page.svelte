<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  const checklists = [
    {
      role: "Media Service Providers",
      icon: "📺",
      items: [
        "Disclose beneficial ownership information",
        "Publish contact details and editorial policies",
        "Ensure transparency of state advertising revenue",
        "Adopt measures to guarantee editorial independence",
      ],
    },
    {
      role: "Member States",
      icon: "🏛️",
      items: [
        "Establish national regulatory authority",
        "Ensure independent funding for public service media",
        "Create national database of media ownership",
        "Appoint representative to the European Board",
      ],
    },
    {
      role: "VLOPs",
      icon: "🌐",
      items: [
        "Implement functionality for media content declarations",
        "Establish priority channels for media complaints",
        "Update terms of service regarding media content",
        "Publish annual transparency reports",
      ],
    },
  ];
</script>

<svelte:head>
  <title>Compliance Guide - EMFA.info</title>
  <meta
    name="description"
    content="Compliance checklists for the European Media Freedom Act."
  />
</svelte:head>

<div class="page-container">
  <header class="page-header">
    <h1>Compliance Guide</h1>
    <p class="subtitle">
      Practical steps for stakeholders to ensure alignment with the new
      regulation
    </p>
  </header>

  <div class="grid">
    {#each checklists as list, i}
      <div
        class="card"
        in:fly={{ y: 20, duration: 400, delay: i * 100, easing: quintOut }}
      >
        <div class="card-header">
          <span class="icon">{list.icon}</span>
          <h2>{list.role}</h2>
        </div>
        <ul class="checklist">
          {#each list.items as item}
            <li>
              <div class="check-box"></div>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <section class="resources-section">
    <h2>Official Resources</h2>
    <div class="resources-grid">
      <a
        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1083"
        target="_blank"
        class="resource-card"
      >
        <h3>Official Journal Text</h3>
        <p>Full legal text of Regulation (EU) 2024/1083</p>
        <span class="link-text">Read PDF →</span>
      </a>
      <a
        href="https://digital-strategy.ec.europa.eu/en/policies/media-freedom-act"
        target="_blank"
        class="resource-card"
      >
        <h3>Commission Policy Page</h3>
        <p>Factsheets, press releases, and Q&A</p>
        <span class="link-text">Visit Site →</span>
      </a>
    </div>
  </section>
</div>

<style>
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-16);
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
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
    margin-bottom: var(--space-16);
  }

  .card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-200);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--gray-100);
  }

  .icon {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray-900);
  }

  .checklist {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .checklist li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    color: var(--gray-700);
    line-height: 1.5;
  }

  .check-box {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gray-300);
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .resources-section {
    background: var(--gray-50);
    border-radius: var(--radius-2xl);
    padding: var(--space-12);
  }

  .resources-section h2 {
    text-align: center;
    margin-bottom: var(--space-8);
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-6);
  }

  .resource-card {
    background: white;
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  .resource-card:hover {
    background: var(--primary-50);
  }

  .resource-card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--space-2);
    color: var(--primary-700);
  }

  .resource-card p {
    color: var(--gray-600);
    font-size: 0.875rem;
    margin-bottom: var(--space-4);
  }

  .link-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--primary-600);
  }
</style>
