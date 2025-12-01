<script lang="ts">
  import { timeline } from '$lib/data/emfa';
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let timelineEl: HTMLElement;

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

    observer.observe(timelineEl);
    return () => observer.disconnect();
  });
</script>

<section id="timeline" class="section" bind:this={timelineEl}>
  <div class="container">
    <div class="section-header">
      <span class="section-label">Implementation Schedule</span>
      <h2 class="section-title">Key Dates & Milestones</h2>
      <p class="section-subtitle">
        Track the phased implementation of the European Media Freedom Act from adoption to full application
      </p>
    </div>

    <div class="timeline-wrapper">
      <div class="timeline-line"></div>

      {#if visible}
        <div class="timeline-events">
          {#each timeline as event, i}
            <div
              class="timeline-event"
              class:completed={event.status === 'completed'}
              class:upcoming={event.status === 'upcoming'}
              class:future={event.status === 'future'}
              in:fly={{ y: 50, duration: 600, delay: i * 150, easing: quintOut }}
            >
              <div class="event-marker" in:scale={{ duration: 400, delay: i * 150 + 200 }}>
                {#if event.status === 'completed'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                {:else if event.status === 'upcoming'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                {:else}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                {/if}
              </div>

              <div class="event-content">
                <div class="event-date">
                  <span class="date-text">{event.date}</span>
                  <span class="status-badge">{event.status === 'completed' ? 'Completed' : event.status === 'upcoming' ? 'Upcoming' : 'Future'}</span>
                </div>
                <h3 class="event-title">{event.title}</h3>
                <p class="event-description">{event.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .section-header {
    text-align: center;
    margin-bottom: var(--space-16);
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

  .timeline-wrapper {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .timeline-line {
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      var(--success) 0%,
      var(--success) 33%,
      var(--warning) 33%,
      var(--warning) 66%,
      var(--gray-300) 66%,
      var(--gray-300) 100%
    );
    border-radius: 3px;
  }

  .timeline-events {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .timeline-event {
    display: flex;
    gap: var(--space-6);
    position: relative;
  }

  .event-marker {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    transition: transform 0.3s var(--ease-out);
  }

  .timeline-event:hover .event-marker {
    transform: scale(1.1);
  }

  .timeline-event.completed .event-marker {
    background: linear-gradient(135deg, var(--success), #059669);
    color: white;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
  }

  .timeline-event.upcoming .event-marker {
    background: linear-gradient(135deg, var(--warning), #d97706);
    color: white;
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
    animation: pulse-marker 2s infinite;
  }

  .timeline-event.future .event-marker {
    background: white;
    border: 3px solid var(--gray-300);
    color: var(--gray-400);
  }

  @keyframes pulse-marker {
    0%, 100% {
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
    }
    50% {
      box-shadow: 0 4px 24px rgba(245, 158, 11, 0.6);
    }
  }

  .event-content {
    flex: 1;
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    box-shadow: var(--shadow);
    border: 1px solid var(--gray-200);
    transition: all 0.3s var(--ease-out);
  }

  .timeline-event:hover .event-content {
    box-shadow: var(--shadow-lg);
    transform: translateX(4px);
  }

  .timeline-event.completed .event-content {
    border-left: 4px solid var(--success);
  }

  .timeline-event.upcoming .event-content {
    border-left: 4px solid var(--warning);
    background: linear-gradient(135deg, white 0%, var(--warning-light) 100%);
  }

  .timeline-event.future .event-content {
    border-left: 4px solid var(--gray-300);
    opacity: 0.8;
  }

  .event-date {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  .date-text {
    font-weight: 600;
    color: var(--gray-600);
    font-size: 0.875rem;
  }

  .status-badge {
    padding: var(--space-1) var(--space-2);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-radius: var(--radius-sm);
  }

  .timeline-event.completed .status-badge {
    background: var(--success-light);
    color: #047857;
  }

  .timeline-event.upcoming .status-badge {
    background: var(--warning-light);
    color: #b45309;
  }

  .timeline-event.future .status-badge {
    background: var(--gray-100);
    color: var(--gray-600);
  }

  .event-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--gray-900);
    margin-bottom: var(--space-2);
  }

  .event-description {
    color: var(--gray-600);
    line-height: 1.6;
  }

  @media (max-width: 640px) {
    .timeline-line {
      left: 16px;
    }

    .event-marker {
      width: 36px;
      height: 36px;
    }

    .event-marker svg {
      width: 16px;
      height: 16px;
    }

    .timeline-event {
      gap: var(--space-4);
    }

    .event-content {
      padding: var(--space-4);
    }
  }
</style>
