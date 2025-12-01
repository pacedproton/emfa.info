<script lang="ts">
  import { fly, scale, fade } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  interface Question {
    id: string;
    question: string;
    options: { label: string; value: string; next?: string }[];
  }

  const questions: Question[] = [
    {
      id: 'q1',
      question: 'What type of entity are you assessing?',
      options: [
        { label: 'Media Service Provider', value: 'msp', next: 'q2' },
        { label: 'Very Large Online Platform (VLOP)', value: 'vlop', next: 'q3' },
        { label: 'Public Service Media', value: 'psm', next: 'q4' },
        { label: 'National Regulatory Authority', value: 'nra', next: 'q5' }
      ]
    },
    {
      id: 'q2',
      question: 'Is your organization established in an EU Member State?',
      options: [
        { label: 'Yes, established in the EU', value: 'eu', next: 'q2a' },
        { label: 'No, but services target EU audiences', value: 'non-eu', next: 'q2a' },
        { label: 'No, and we do not target EU audiences', value: 'outside' }
      ]
    },
    {
      id: 'q2a',
      question: 'Do you exercise editorial responsibility over your content?',
      options: [
        { label: 'Yes, we select and organize content', value: 'yes', next: 'result-msp' },
        { label: 'No, we aggregate without editorial control', value: 'no' }
      ]
    },
    {
      id: 'q3',
      question: 'Does your platform have more than 45 million monthly active EU users?',
      options: [
        { label: 'Yes, over 45 million users', value: 'yes', next: 'result-vlop' },
        { label: 'No, under 45 million users', value: 'no' }
      ]
    },
    {
      id: 'q4',
      question: 'Is your public service media funded by the state?',
      options: [
        { label: 'Yes, primarily state-funded', value: 'yes', next: 'result-psm' },
        { label: 'Mixed funding model', value: 'mixed', next: 'result-psm' },
        { label: 'No, primarily commercially funded', value: 'no', next: 'q2' }
      ]
    },
    {
      id: 'q5',
      question: 'What is your primary regulatory function?',
      options: [
        { label: 'Media content regulation', value: 'content', next: 'result-nra' },
        { label: 'Telecommunications', value: 'telecom', next: 'result-nra' },
        { label: 'Competition/Market regulation', value: 'competition' }
      ]
    }
  ];

  interface Result {
    id: string;
    title: string;
    status: 'subject' | 'partial' | 'exempt';
    summary: string;
    obligations: string[];
    articles: string[];
  }

  const results: Result[] = [
    {
      id: 'result-msp',
      title: 'Media Service Provider',
      status: 'subject',
      summary: 'Your organization is subject to EMFA as a media service provider. Key obligations apply from August 2025.',
      obligations: [
        'Disclose ownership structure and beneficial owners (Article 6)',
        'Provide information on state advertising received (Article 6)',
        'Implement editorial independence safeguards (Article 7)',
        'Make editorial policies accessible to the public'
      ],
      articles: ['Article 4', 'Article 6', 'Article 7', 'Article 22']
    },
    {
      id: 'result-vlop',
      title: 'Very Large Online Platform',
      status: 'subject',
      summary: 'Your platform has specific obligations under Article 17 regarding media content moderation.',
      obligations: [
        'Priority complaint handling for media providers (Article 17)',
        'Pre-suspension notice with statement of reasons',
        'Good faith dialogue with affected media providers',
        'Annual transparency reporting on media content restrictions'
      ],
      articles: ['Article 17', 'Article 23']
    },
    {
      id: 'result-psm',
      title: 'Public Service Media',
      status: 'subject',
      summary: 'Enhanced protections apply to ensure your editorial and functional independence.',
      obligations: [
        'Transparent and objective appointment procedures for directors',
        'Adequate and stable funding determined in advance',
        'Protection from arbitrary dismissal of leadership',
        'Editorial independence from governmental interference'
      ],
      articles: ['Article 5', 'Article 4']
    },
    {
      id: 'result-nra',
      title: 'National Regulatory Authority',
      status: 'subject',
      summary: 'Your authority plays a key role in EMFA implementation and enforcement.',
      obligations: [
        'Participate in the European Board for Media Services',
        'Enforce transparency obligations',
        'Assess media market concentrations',
        'Coordinate with authorities in other Member States'
      ],
      articles: ['Articles 9-16', 'Article 18-21', 'Article 22']
    }
  ];

  let currentQuestion = $state<string | null>(null);
  let answers = $state<Record<string, string>>({});
  let result = $state<Result | null>(null);
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

  function startWizard() {
    currentQuestion = 'q1';
    answers = {};
    result = null;
  }

  function selectOption(questionId: string, option: { label: string; value: string; next?: string }) {
    answers = { ...answers, [questionId]: option.value };

    if (option.next?.startsWith('result-')) {
      result = results.find(r => r.id === option.next) || null;
      currentQuestion = null;
    } else if (option.next) {
      currentQuestion = option.next;
    } else {
      result = {
        id: 'exempt',
        title: 'Potentially Outside Scope',
        status: 'exempt',
        summary: 'Based on your answers, EMFA may not directly apply to your organization. However, we recommend consulting legal counsel for a definitive assessment.',
        obligations: [
          'Monitor developments as EMFA implementation evolves',
          'Consider voluntary compliance with transparency standards',
          'Stay informed about national transposition measures'
        ],
        articles: ['Article 1 (Scope)', 'Article 2 (Definitions)']
      };
      currentQuestion = null;
    }
  }

  function resetWizard() {
    currentQuestion = null;
    answers = {};
    result = null;
  }

  function getCurrentQuestion(): Question | undefined {
    return questions.find(q => q.id === currentQuestion);
  }

  function getProgress(): number {
    const answered = Object.keys(answers).length;
    return Math.min((answered / 3) * 100, 100);
  }
</script>

<section id="compliance" class="section section-alt" bind:this={sectionEl}>
  <div class="container">
    {#if visible}
      <div class="section-header" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
        <span class="section-label">Self-Assessment</span>
        <h2 class="section-title">Compliance Checker</h2>
        <p class="section-subtitle">
          Determine your organization's obligations under the European Media Freedom Act
        </p>
      </div>

      <div class="wizard-container" in:fly={{ y: 40, duration: 600, delay: 200, easing: quintOut }}>
        {#if !currentQuestion && !result}
          <div class="wizard-start">
            <div class="wizard-icon" in:scale={{ duration: 500, easing: elasticOut }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h3>EMFA Compliance Assessment</h3>
            <p>
              Answer a few questions to understand which EMFA obligations may apply to your organization.
              This tool provides general guidance only and does not constitute legal advice.
            </p>
            <button class="btn btn-primary" onclick={startWizard}>
              <span>Start Assessment</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        {:else if currentQuestion}
          {@const question = getCurrentQuestion()}
          {#if question}
            <div class="wizard-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: {getProgress()}%"></div>
              </div>
              <span class="progress-text">Question {Object.keys(answers).length + 1}</span>
            </div>

            {#key currentQuestion}
              <div class="wizard-question" in:fly={{ x: 50, duration: 400, easing: quintOut }}>
                <h3>{question.question}</h3>
                <div class="options-grid">
                  {#each question.options as option, i}
                    <button
                      class="option-button"
                      onclick={() => selectOption(question.id, option)}
                      in:fly={{ y: 20, duration: 300, delay: i * 100, easing: quintOut }}
                    >
                      <span class="option-indicator">{String.fromCharCode(65 + i)}</span>
                      <span class="option-label">{option.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  {/each}
                </div>
              </div>
            {/key}

            <button class="back-link" onclick={resetWizard}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Start over
            </button>
          {/if}
        {:else if result}
          <div class="wizard-result" in:scale={{ duration: 500, easing: quintOut }}>
            <div class="result-header" class:subject={result.status === 'subject'} class:exempt={result.status === 'exempt'}>
              <div class="result-icon">
                {#if result.status === 'subject'}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                {:else}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                {/if}
              </div>
              <div class="result-title">
                <span class="result-label">{result.status === 'subject' ? 'Subject to EMFA' : 'Review Recommended'}</span>
                <h3>{result.title}</h3>
              </div>
            </div>

            <p class="result-summary">{result.summary}</p>

            <div class="result-obligations">
              <h4>Key Obligations & Considerations</h4>
              <ul>
                {#each result.obligations as obligation, i}
                  <li in:fly={{ x: -20, duration: 300, delay: i * 100 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span>{obligation}</span>
                  </li>
                {/each}
              </ul>
            </div>

            <div class="result-articles">
              <h4>Relevant Articles</h4>
              <div class="articles-tags">
                {#each result.articles as article}
                  <a href="#articles" class="article-tag">{article}</a>
                {/each}
              </div>
            </div>

            <div class="result-actions">
              <button class="btn btn-secondary" onclick={resetWizard}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Start New Assessment
              </button>
              <a href="#articles" class="btn btn-primary">
                <span>View Full Legal Framework</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        {/if}
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

  .wizard-container {
    max-width: 700px;
    margin: 0 auto;
    background: white;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-xl);
    padding: var(--space-10);
    border: 1px solid var(--gray-200);
  }

  .wizard-start {
    text-align: center;
  }

  .wizard-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-100), var(--primary-200));
    border-radius: var(--radius-2xl);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-6);
    color: var(--primary-600);
  }

  .wizard-start h3 {
    font-size: 1.5rem;
    margin-bottom: var(--space-4);
  }

  .wizard-start p {
    color: var(--gray-600);
    margin-bottom: var(--space-6);
    line-height: 1.7;
  }

  .wizard-progress {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .progress-bar {
    flex: 1;
    height: 6px;
    background: var(--gray-200);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
    transition: width 0.5s var(--ease-out);
    border-radius: 3px;
  }

  .progress-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray-500);
    white-space: nowrap;
  }

  .wizard-question h3 {
    font-size: 1.25rem;
    margin-bottom: var(--space-6);
    text-align: center;
  }

  .options-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .option-button {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    width: 100%;
    padding: var(--space-4) var(--space-5);
    background: var(--gray-50);
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-lg);
    text-align: left;
    transition: all 0.3s var(--ease-out);
  }

  .option-button:hover {
    background: var(--primary-50);
    border-color: var(--primary-400);
    transform: translateX(4px);
  }

  .option-indicator {
    width: 32px;
    height: 32px;
    background: white;
    border: 2px solid var(--gray-300);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
    color: var(--gray-600);
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .option-button:hover .option-indicator {
    background: var(--primary-600);
    border-color: var(--primary-600);
    color: white;
  }

  .option-label {
    flex: 1;
    font-weight: 500;
    color: var(--gray-800);
  }

  .option-button svg {
    color: var(--gray-400);
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s ease;
  }

  .option-button:hover svg {
    opacity: 1;
    transform: translateX(0);
    color: var(--primary-600);
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-6);
    color: var(--gray-500);
    font-size: 0.875rem;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--primary-600);
  }

  .wizard-result {
    text-align: center;
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    padding: var(--space-6);
    border-radius: var(--radius-xl);
    margin-bottom: var(--space-6);
  }

  .result-header.subject {
    background: linear-gradient(135deg, var(--success-light), #a7f3d0);
  }

  .result-header.exempt {
    background: linear-gradient(135deg, var(--warning-light), #fde68a);
  }

  .result-icon {
    width: 56px;
    height: 56px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .result-header.subject .result-icon {
    color: var(--success);
  }

  .result-header.exempt .result-icon {
    color: var(--warning);
  }

  .result-title {
    text-align: left;
  }

  .result-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .result-header.subject .result-label {
    color: #047857;
  }

  .result-header.exempt .result-label {
    color: #b45309;
  }

  .result-title h3 {
    font-size: 1.25rem;
    color: var(--gray-900);
    margin-top: var(--space-1);
  }

  .result-summary {
    color: var(--gray-600);
    line-height: 1.7;
    margin-bottom: var(--space-6);
    text-align: left;
  }

  .result-obligations {
    text-align: left;
    padding: var(--space-5);
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-6);
  }

  .result-obligations h4,
  .result-articles h4 {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--gray-700);
    margin-bottom: var(--space-4);
  }

  .result-obligations ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .result-obligations li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    color: var(--gray-700);
    font-size: 0.9375rem;
  }

  .result-obligations li svg {
    flex-shrink: 0;
    color: var(--success);
    margin-top: 2px;
  }

  .result-articles {
    text-align: left;
    margin-bottom: var(--space-8);
  }

  .articles-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .article-tag {
    padding: var(--space-2) var(--space-3);
    background: var(--primary-100);
    color: var(--primary-700);
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: var(--radius);
    transition: all 0.2s ease;
  }

  .article-tag:hover {
    background: var(--primary-600);
    color: white;
  }

  .result-actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .wizard-container {
      padding: var(--space-6);
    }

    .result-header {
      flex-direction: column;
      text-align: center;
    }

    .result-title {
      text-align: center;
    }

    .result-actions {
      flex-direction: column;
    }
  }
</style>
