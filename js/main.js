/**
 * EMFA.info - European Media Freedom Act Information Site
 * Interactive JavaScript Components
 */

(function() {
    'use strict';

    // ============================================
    // Configuration & Data
    // ============================================

    const DEFINITIONS = [
        {
            term: "Media Service",
            definition: "A service as defined by Articles 56 and 57 TFEU, where the principal purpose is the provision to the general public of programmes or press publications for information, entertainment or education, under editorial responsibility of a media service provider.",
            source: "Article 2(1) EMFA"
        },
        {
            term: "Media Service Provider",
            definition: "A natural or legal person whose professional activity is the provision of a media service and who has editorial responsibility for the choice of content of the media service and determines the manner in which it is organized.",
            source: "Article 2(2) EMFA"
        },
        {
            term: "Editorial Responsibility",
            definition: "Effective control both over the selection of the programmes or the content of press publications and over their organisation, either in a chronological schedule or a catalogue, for the purpose of the provision of a media service.",
            source: "Article 2(3) EMFA"
        },
        {
            term: "Editorial Decision",
            definition: "A decision taken on a regular basis for the purpose of exercising editorial responsibility and linked to the day-to-day operation of the media service provider.",
            source: "Article 2(4) EMFA"
        },
        {
            term: "Public Service Media Provider",
            definition: "A media service provider which is entrusted with a public service remit under national law or which receives public funding for fulfilling such remit, established by law, or by administrative act, of a Member State.",
            source: "Article 2(5) EMFA"
        },
        {
            term: "Audience Measurement",
            definition: "The activity of collecting, interpreting or otherwise processing data about the number and characteristics of users of media services for the purposes of decisions regarding advertising allocation, prices or the related planning, production or distribution of content.",
            source: "Article 2(6) EMFA"
        },
        {
            term: "State Advertising",
            definition: "The placement, publication or dissemination, against payment or for any other consideration, of promotional or self-promotional messages by, for or on behalf of a wide range of public authorities or state-owned entities.",
            source: "Article 2(7) EMFA"
        },
        {
            term: "Spyware",
            definition: "Any product with digital elements that has been specifically designed to exploit vulnerabilities in other products for the purpose of enabling covert surveillance of natural or legal persons.",
            source: "Article 2(8) EMFA"
        },
        {
            term: "Very Large Online Platform",
            definition: "An online platform which has a number of average monthly active recipients of the service in the Union equal to or higher than 45 million, as designated pursuant to the Digital Services Act.",
            source: "Article 3 DSA (referenced in EMFA)"
        },
        {
            term: "Media Pluralism",
            definition: "The diversity and plurality of media, including public service media, commercial media and community media, ensuring that citizens have access to a variety of information sources and opinions.",
            source: "Recital 1 EMFA"
        },
        {
            term: "Journalistic Source",
            definition: "Any person who provides information to a journalist, editor, or media service provider in confidence, including whistleblowers and other confidential contacts used in the exercise of journalistic activities.",
            source: "Derived from Article 4 EMFA"
        },
        {
            term: "National Regulatory Authority",
            definition: "The body or bodies designated by Member States to carry out regulatory functions related to media services, which must be legally distinct from the government and functionally independent.",
            source: "Article 2 AVMSD (referenced in EMFA)"
        }
    ];

    const SEARCH_INDEX = [
        { title: "Article 1 - Subject Matter and Scope", section: "art-1", excerpt: "Establishes the scope of EMFA and determines which entities are covered..." },
        { title: "Article 2 - Definitions", section: "art-2", excerpt: "Key definitions including media service, editorial responsibility, spyware..." },
        { title: "Article 3 - Recipients' Rights", section: "art-3", excerpt: "Rights of media service recipients including access to plurality..." },
        { title: "Article 4 - Editorial Independence", section: "art-4", excerpt: "Safeguards for editorial freedom, source protection, anti-surveillance..." },
        { title: "Article 5 - Public Service Media", section: "art-5", excerpt: "Governance requirements for public broadcasters..." },
        { title: "Article 6 - Transparency Duties", section: "art-6", excerpt: "Ownership disclosure, financial transparency requirements..." },
        { title: "Article 17 - Platform Obligations", section: "art-17", excerpt: "VLOP obligations for media content, dialogue requirements..." },
        { title: "Article 23 - Audience Measurement", section: "art-23", excerpt: "Transparency requirements for measurement providers..." },
        { title: "Article 24 - State Advertising", section: "art-24", excerpt: "Non-discriminatory allocation, public reporting..." },
        { title: "Editorial Independence", section: "art-4", excerpt: "Protection against state interference in editorial decisions..." },
        { title: "Source Protection", section: "art-4", excerpt: "Safeguards for journalistic sources and communications..." },
        { title: "Spyware Prohibition", section: "art-4", excerpt: "Restrictions on surveillance software against journalists..." },
        { title: "European Board for Media Services", section: "art-9", excerpt: "Establishment and structure of the regulatory board..." },
        { title: "Media Concentrations", section: "art-18-21", excerpt: "Assessment requirements for media market concentrations..." }
    ];

    const COMPLIANCE_PROFILES = {
        'media-provider': {
            title: 'Media Service Provider',
            obligations: [
                { applies: true, title: 'Ownership Transparency', desc: 'Disclose beneficial owners and significant shareholders (Art. 6)' },
                { applies: true, title: 'Editorial Information', desc: 'Publish editorial policies and complaint mechanisms (Art. 6)' },
                { applies: true, title: 'State Advertising Disclosure', desc: 'Report state advertising received (Art. 24)' },
                { applies: true, title: 'Editorial Safeguards', desc: 'Establish internal protections for editorial independence (Art. 7)' },
                { applies: false, title: 'Platform Dialogue', desc: 'Article 17 obligations apply to platforms, not providers' }
            ]
        },
        'platform': {
            title: 'Online Platform',
            obligations: [
                { applies: 'vlop-only', title: 'Priority Complaint Handling', desc: 'Process media provider complaints with priority (Art. 17)' },
                { applies: 'vlop-only', title: 'Pre-Suspension Notice', desc: 'Notify media providers before content restrictions (Art. 17)' },
                { applies: 'vlop-only', title: 'Dialogue Requirement', desc: 'Engage in meaningful dialogue with media providers (Art. 17)' },
                { applies: 'vlop-only', title: 'Annual Reporting', desc: 'Publish annual transparency reports on media content (Art. 17)' },
                { applies: false, title: 'Editorial Independence', desc: 'These obligations apply to media providers' }
            ]
        },
        'public-service': {
            title: 'Public Service Media',
            obligations: [
                { applies: true, title: 'Governance Standards', desc: 'Transparent appointment procedures for directors (Art. 5)' },
                { applies: true, title: 'Term Protection', desc: 'Ensure adequate term length for leadership (Art. 5)' },
                { applies: true, title: 'Funding Transparency', desc: 'Stable, advance-determined funding procedures (Art. 5)' },
                { applies: true, title: 'Ownership Transparency', desc: 'All Article 6 obligations apply' },
                { applies: true, title: 'Editorial Independence', desc: 'All Article 4 protections and Article 7 requirements apply' }
            ]
        },
        'measurement': {
            title: 'Audience Measurement Provider',
            obligations: [
                { applies: true, title: 'Methodology Transparency', desc: 'Ensure transparent and verifiable methodologies (Art. 23)' },
                { applies: true, title: 'Non-Discrimination', desc: 'Apply non-discriminatory practices (Art. 23)' },
                { applies: true, title: 'Industry Standards', desc: 'Comply with recognized industry standards (Art. 23)' },
                { applies: false, title: 'Editorial Obligations', desc: 'Editorial provisions apply to media providers' },
                { applies: false, title: 'Platform Obligations', desc: 'Article 17 applies to VLOPs' }
            ]
        },
        'device': {
            title: 'Device/Interface Manufacturer',
            obligations: [
                { applies: true, title: 'Customization Right', desc: 'Enable users to change default media settings (Art. 8) - from May 2027' },
                { applies: false, title: 'Editorial Obligations', desc: 'These apply to media service providers' },
                { applies: false, title: 'Ownership Transparency', desc: 'These apply to media service providers' },
                { applies: false, title: 'Platform Obligations', desc: 'Article 17 applies specifically to VLOPs' }
            ]
        }
    };

    // ============================================
    // Utility Functions
    // ============================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function formatCountdown(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);
        const diff = target - now;

        if (diff <= 0) return 'Now in effect';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} remaining`;
        }
        return `${days} day${days > 1 ? 's' : ''} remaining`;
    }

    // ============================================
    // Header & Navigation
    // ============================================

    function initHeader() {
        const header = document.querySelector('.header');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');

        function updateActiveLink() {
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', debounce(updateActiveLink, 50));
        updateActiveLink();
    }

    // ============================================
    // Search Modal
    // ============================================

    function initSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchModal = document.getElementById('search-modal');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        const searchClose = document.querySelector('.search-close');

        if (!searchModal) return;

        function openSearch() {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 100);
        }

        function closeSearch() {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
            searchResults.innerHTML = '';
        }

        function performSearch(query) {
            if (!query || query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const lowerQuery = query.toLowerCase();
            const matches = SEARCH_INDEX.filter(item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.excerpt.toLowerCase().includes(lowerQuery)
            );

            if (matches.length === 0) {
                searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
                return;
            }

            searchResults.innerHTML = matches.map(item => `
                <a href="#${item.section}" class="search-result-item" data-section="${item.section}">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-excerpt">${item.excerpt}</div>
                </a>
            `).join('');

            // Add click handlers
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    closeSearch();
                });
            });
        }

        searchToggle.addEventListener('click', openSearch);
        searchClose.addEventListener('click', closeSearch);

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearch();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                closeSearch();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (searchModal.classList.contains('active')) {
                    closeSearch();
                } else {
                    openSearch();
                }
            }
        });

        searchInput.addEventListener('input', debounce((e) => {
            performSearch(e.target.value);
        }, 200));
    }

    // ============================================
    // Chapter Tabs
    // ============================================

    function initChapterTabs() {
        const tabs = document.querySelectorAll('.chapter-tab');
        const panels = document.querySelectorAll('.chapter-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('aria-controls');

                // Update tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Update panels
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.setAttribute('hidden', '');
                });

                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.removeAttribute('hidden');
                }
            });
        });
    }

    // ============================================
    // Article Accordion
    // ============================================

    function initArticleAccordion() {
        const articleHeaders = document.querySelectorAll('.article-header');

        articleHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const article = header.closest('.article-item');
                const isExpanded = header.getAttribute('aria-expanded') === 'true';

                // Close all other articles in same accordion
                const accordion = article.closest('.articles-accordion');
                if (accordion) {
                    accordion.querySelectorAll('.article-item').forEach(item => {
                        if (item !== article) {
                            item.classList.remove('expanded');
                            item.querySelector('.article-header').setAttribute('aria-expanded', 'false');
                        }
                    });
                }

                // Toggle current article
                article.classList.toggle('expanded', !isExpanded);
                header.setAttribute('aria-expanded', !isExpanded);
            });
        });
    }

    // ============================================
    // FAQ Accordion
    // ============================================

    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';

                // Close all other FAQs
                faqItems.forEach(faq => {
                    if (faq !== item) {
                        faq.classList.remove('expanded');
                        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current
                item.classList.toggle('expanded', !isExpanded);
                question.setAttribute('aria-expanded', !isExpanded);
            });
        });
    }

    // ============================================
    // Timeline Countdown
    // ============================================

    function initTimeline() {
        const countdowns = document.querySelectorAll('.event-countdown');

        function updateCountdowns() {
            countdowns.forEach(countdown => {
                const targetDate = countdown.dataset.target;
                if (targetDate) {
                    countdown.textContent = formatCountdown(targetDate);
                }
            });
        }

        updateCountdowns();
        // Update every hour
        setInterval(updateCountdowns, 3600000);
    }

    // ============================================
    // Compliance Wizard
    // ============================================

    function initComplianceWizard() {
        const wizard = document.querySelector('.compliance-wizard');
        if (!wizard) return;

        const steps = wizard.querySelectorAll('.wizard-step');
        const progressDots = wizard.querySelectorAll('.progress-dot');
        const prevBtn = wizard.querySelector('.wizard-prev');
        const nextBtn = wizard.querySelector('.wizard-next');
        const resultsContainer = document.getElementById('compliance-results');

        let currentStep = 1;
        let selections = {
            entityType: null,
            jurisdiction: null,
            scale: null
        };

        function updateProgress() {
            progressDots.forEach((dot, index) => {
                dot.classList.remove('active', 'completed');
                if (index + 1 === currentStep) {
                    dot.classList.add('active');
                } else if (index + 1 < currentStep) {
                    dot.classList.add('completed');
                }
            });

            prevBtn.disabled = currentStep === 1;

            // Determine if next should be enabled
            const currentStepEl = wizard.querySelector(`[data-step="${currentStep}"]`);
            const selectedOption = currentStepEl.querySelector('.option-card.selected');
            nextBtn.disabled = !selectedOption;

            nextBtn.textContent = currentStep === 3 ? 'View Results' : 'Next →';
        }

        function showStep(stepNum) {
            steps.forEach(step => {
                step.classList.remove('active');
                if (step.dataset.step == stepNum || step.dataset.step === 'results' && stepNum === 'results') {
                    step.classList.add('active');
                }
            });
            currentStep = stepNum;
            updateProgress();
        }

        function generateResults() {
            const profile = COMPLIANCE_PROFILES[selections.entityType];
            if (!profile) return;

            let applicableNote = '';
            if (selections.jurisdiction === 'no-connection') {
                resultsContainer.innerHTML = `
                    <div class="results-header">
                        <div class="results-icon">🌍</div>
                        <div class="results-summary">
                            <h4>Limited EMFA Application</h4>
                            <p>Based on your selections, EMFA obligations may not directly apply to your organization.</p>
                        </div>
                    </div>
                    <div class="analysis-box">
                        <p><strong>However:</strong> If you later begin targeting EU audiences or establish EU presence, EMFA obligations would apply. Monitor your EU engagement metrics.</p>
                    </div>
                `;
                return;
            }

            const isVLOP = selections.scale === 'vlop';

            const obligationsHtml = profile.obligations.map(ob => {
                let applies = ob.applies;
                let statusClass = 'applies';
                let statusIcon = '!';

                if (applies === 'vlop-only') {
                    applies = isVLOP;
                    if (!isVLOP) {
                        statusClass = 'not-applies';
                        statusIcon = '−';
                    }
                }

                if (applies === true) {
                    statusClass = 'applies';
                    statusIcon = '!';
                } else if (applies === false) {
                    statusClass = 'not-applies';
                    statusIcon = '✓';
                }

                return `
                    <div class="obligation-result">
                        <div class="obligation-status ${statusClass}">${statusIcon}</div>
                        <div class="obligation-info">
                            <h5>${ob.title}</h5>
                            <p>${ob.desc}${applies === 'vlop-only' && !isVLOP ? ' (VLOP threshold not met)' : ''}</p>
                        </div>
                    </div>
                `;
            }).join('');

            resultsContainer.innerHTML = `
                <div class="results-header">
                    <div class="results-icon">📋</div>
                    <div class="results-summary">
                        <h4>${profile.title} Compliance Profile</h4>
                        <p>Based on your selections, here are your EMFA obligations:</p>
                    </div>
                </div>
                <div class="results-obligations">
                    ${obligationsHtml}
                </div>
                <div class="analysis-box" style="margin-top: var(--spacing-6);">
                    <p><strong>Key Dates:</strong> Most provisions apply from 8 August 2025. The customization right (Art. 8) applies from May 2027.</p>
                    <p>This assessment is for guidance only. Consult qualified legal counsel for formal compliance advice.</p>
                </div>
            `;
        }

        // Option selection
        wizard.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const step = card.closest('.wizard-step');
                step.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const value = card.dataset.value;
                const stepNum = parseInt(step.dataset.step);

                if (stepNum === 1) selections.entityType = value;
                if (stepNum === 2) selections.jurisdiction = value;
                if (stepNum === 3) selections.scale = value;

                nextBtn.disabled = false;
            });
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentStep < 3) {
                showStep(currentStep + 1);
            } else if (currentStep === 3) {
                generateResults();
                showStep('results');
            }
        });

        updateProgress();
    }

    // ============================================
    // Definitions
    // ============================================

    function initDefinitions() {
        const definitionsList = document.getElementById('definitions-list');
        const searchInput = document.getElementById('definition-search');

        if (!definitionsList) return;

        function renderDefinitions(filter = '') {
            const filtered = DEFINITIONS.filter(def =>
                def.term.toLowerCase().includes(filter.toLowerCase()) ||
                def.definition.toLowerCase().includes(filter.toLowerCase())
            );

            definitionsList.innerHTML = filtered.map(def => `
                <div class="definition-card">
                    <h4>'${def.term}'</h4>
                    <p>${def.definition}</p>
                    <div class="definition-source">${def.source}</div>
                </div>
            `).join('');
        }

        renderDefinitions();

        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                renderDefinitions(e.target.value);
            }, 200));
        }
    }

    // ============================================
    // Subscribe Form
    // ============================================

    function initSubscribeForm() {
        const form = document.getElementById('subscribe-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;

            // Show success message
            form.innerHTML = `
                <div style="color: var(--success); font-weight: 500;">
                    ✓ Thank you for subscribing! We'll keep you updated.
                </div>
            `;
        });
    }

    // ============================================
    // Smooth Scroll
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL without scroll jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ============================================
    // Animation on Scroll
    // ============================================

    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.highlight-card, .timeline-event, .resource-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Keyboard Navigation
    // ============================================

    function initKeyboardNav() {
        // Focus visible styles
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // Add keyboard nav styles
    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        body:not(.keyboard-nav) *:focus {
            outline: none;
        }
        body.keyboard-nav *:focus {
            outline: 3px solid var(--primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(keyboardStyle);

    // ============================================
    // Print Functionality
    // ============================================

    function initPrint() {
        // Expand all articles before printing
        window.addEventListener('beforeprint', () => {
            document.querySelectorAll('.article-item').forEach(item => {
                item.classList.add('expanded');
                item.querySelector('.article-header').setAttribute('aria-expanded', 'true');
            });
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.add('expanded');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
            });
        });
    }

    // ============================================
    // Initialize All
    // ============================================

    function init() {
        initHeader();
        initSearch();
        initChapterTabs();
        initArticleAccordion();
        initFAQ();
        initTimeline();
        initComplianceWizard();
        initDefinitions();
        initSubscribeForm();
        initSmoothScroll();
        initScrollAnimations();
        initKeyboardNav();
        initPrint();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
