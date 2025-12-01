<script lang="ts">
  import { definitions } from '$lib/data/emfa';
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <div class="logo-emblem">
            <span>EMFA</span>
          </div>
          <div class="logo-text">
            <span class="logo-title">European Media Freedom Act</span>
            <span class="logo-subtitle">Information Resource</span>
          </div>
        </div>
        <p class="footer-description">
          Independent educational resource providing comprehensive information about EU Regulation 2024/1083
          (European Media Freedom Act). This site is not affiliated with the European Union or any governmental body.
        </p>
        <div class="footer-disclaimer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>This site provides information for educational purposes only and does not constitute legal advice.</span>
        </div>
      </div>

      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#articles">Articles</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#compliance">Compliance</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Official Resources</h4>
        <ul>
          <li>
            <a href="https://eur-lex.europa.eu/eli/reg/2024/1083/oj/eng" target="_blank" rel="noopener">
              EUR-Lex Official Text
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://digital-strategy.ec.europa.eu/en/policies/european-media-freedom-act" target="_blank" rel="noopener">
              EC Digital Strategy
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://audiovisual-observatory.coe.int/" target="_blank" rel="noopener">
              European Audiovisual Observatory
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Key Definitions</h4>
        <ul class="definitions-list">
          {#each definitions.slice(0, 4) as def}
            <li>
              <strong>{def.term}</strong>
              <span class="def-source">{def.source}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-eu">
        <span class="eu-stars">★★★★★★★★★★★★</span>
        <span>Regulation (EU) 2024/1083 of the European Parliament and of the Council</span>
      </div>
      <p class="copyright">
        Content based on publicly available EU legislation. Last updated: May 2024.
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: linear-gradient(180deg, var(--gray-900) 0%, var(--gray-950) 100%);
    color: var(--gray-300);
    padding: var(--space-16) 0 var(--space-8);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--space-12);
    margin-bottom: var(--space-12);
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .logo-emblem {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--eu-blue), var(--eu-blue-dark));
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
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
    color: white;
    line-height: 1.2;
  }

  .logo-subtitle {
    font-size: 0.75rem;
    color: var(--gray-500);
    font-weight: 500;
  }

  .footer-description {
    color: var(--gray-400);
    font-size: 0.9375rem;
    line-height: 1.7;
  }

  .footer-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius);
    font-size: 0.8125rem;
    color: var(--gray-500);
    border-left: 3px solid var(--warning);
  }

  .footer-disclaimer svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--warning);
  }

  .footer-section h4 {
    color: white;
    font-weight: 600;
    font-size: 0.9375rem;
    margin-bottom: var(--space-4);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .footer-section ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .footer-section a {
    color: var(--gray-400);
    font-size: 0.9375rem;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    transition: color 0.2s ease;
  }

  .footer-section a:hover {
    color: var(--eu-gold);
  }

  .definitions-list li {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .definitions-list strong {
    color: var(--gray-300);
    font-size: 0.875rem;
  }

  .def-source {
    font-size: 0.75rem;
    color: var(--gray-500);
  }

  .footer-bottom {
    padding-top: var(--space-8);
    border-top: 1px solid var(--gray-800);
    text-align: center;
  }

  .footer-eu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
  }

  .eu-stars {
    color: var(--eu-gold);
    letter-spacing: 2px;
    font-size: 0.75rem;
  }

  .footer-eu span:last-child {
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .copyright {
    color: var(--gray-600);
    font-size: 0.8125rem;
  }

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
    }

    .footer-brand {
      grid-column: span 2;
    }
  }

  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .footer-brand {
      grid-column: span 1;
    }

    .footer-eu {
      flex-direction: column;
      gap: var(--space-2);
    }
  }
</style>
