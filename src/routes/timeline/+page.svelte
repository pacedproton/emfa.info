<script lang="ts">
  import { timeline } from "$lib/data/emfa";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<svelte:head>
  <title>Implementation Timeline - EMFA.info</title>
  <meta
    name="description"
    content="Track the implementation schedule of the European Media Freedom Act."
  />
</svelte:head>

<div class="page-container">
  <header class="page-header">
    <h1>Implementation Timeline</h1>
    <p class="subtitle">
      Key dates and milestones for the application of the regulation
    </p>
  </header>

  <div class="timeline-container">
    {#each timeline as event, i}
      <div
        class="timeline-item"
        class:completed={event.status === "completed"}
        in:fly={{ y: 20, duration: 400, delay: i * 100, easing: quintOut }}
      >
        <div class="timeline-marker">
          <div class="marker-dot">
            {#if event.status === "completed"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            {/if}
          </div>
          <div class="marker-line"></div>
        </div>

        <div class="timeline-content">
          <div class="date-badge" class:future={event.status !== "completed"}>
            {event.date}
          </div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .page-container {
    max-width: 800px;
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

  .timeline-container {
    position: relative;
    padding-left: var(--space-4);
  }

  .timeline-item {
    display: flex;
    gap: var(--space-8);
    padding-bottom: var(--space-12);
    position: relative;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-item:last-child .marker-line {
    display: none;
  }

  .timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 40px;
  }

  .marker-dot {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 4px solid var(--gray-200);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .timeline-item.completed .marker-dot {
    background: var(--success);
    border-color: var(--success);
    color: white;
  }

  .marker-line {
    width: 4px;
    flex-grow: 1;
    background: var(--gray-200);
    margin-top: -4px;
    margin-bottom: -4px;
    z-index: 1;
  }

  .timeline-item.completed .marker-line {
    background: var(--success);
  }

  .timeline-content {
    padding-top: var(--space-2);
  }

  .date-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: var(--success-light);
    color: var(--success-dark);
    font-weight: 700;
    font-size: 0.875rem;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .date-badge.future {
    background: var(--primary-100);
    color: var(--primary-700);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--space-2);
    color: var(--gray-900);
  }

  p {
    color: var(--gray-600);
    line-height: 1.6;
    font-size: 1.125rem;
  }
</style>
