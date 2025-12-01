// EMFA Data - European Media Freedom Act content

export interface Article {
  id: string;
  number: string;
  title: string;
  isCritical?: boolean;
  provisions: string[];
  analysis?: string;
}

export interface Chapter {
  number: string;
  title: string;
  description: string;
  articles: Article[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'future';
}

export interface Definition {
  term: string;
  definition: string;
  source: string;
}

export const chapters: Chapter[] = [
  {
    number: 'I',
    title: 'General Provisions',
    description: 'Establishes the foundational scope, objectives, and definitions of the regulation.',
    articles: [
      {
        id: 'art-1',
        number: 'Article 1',
        title: 'Subject Matter and Scope',
        provisions: [
          'Establishes common framework for media services in the internal market',
          'Applies to media service providers established in the Union',
          'Covers providers established outside EU but targeting EU audiences',
          'Sets rules for protection of natural persons using media services'
        ],
        analysis: 'The regulation employs a dual-pronged jurisdictional approach. Primary jurisdiction is based on establishment within the Union. Secondary jurisdiction captures non-EU providers "directing activities" toward Union audiences—mirroring the approach in the DSA and GDPR.'
      },
      {
        id: 'art-2',
        number: 'Article 2',
        title: 'Definitions',
        provisions: [
          "'media service' — Service providing programmes or press publications under editorial responsibility",
          "'media service provider' — Person with editorial responsibility for content choice",
          "'editorial responsibility' — Effective control over content selection and organization",
          "'spyware' — Products designed to exploit vulnerabilities for covert surveillance"
        ],
        analysis: 'The definition of "editorial responsibility" is central to EMFA\'s scope. The requirement for "effective control" means aggregators and platforms generally fall outside—unless they exercise actual editorial judgment.'
      },
      {
        id: 'art-3',
        number: 'Article 3',
        title: "Recipients' Rights",
        provisions: [
          'Right to receive a plurality of media services',
          'Right to access information about media ownership',
          'Right to transparent information about editorial policies',
          'Framework for protecting minors while ensuring access'
        ],
        analysis: 'Article 3 creates subjective rights for media recipients—a significant departure from traditional media regulation which focused primarily on provider obligations. These rights are directly enforceable before national courts.'
      }
    ]
  },
  {
    number: 'II',
    title: 'Rights & Duties',
    description: 'The substantive heart of the EMFA. Contains the critical protections for editorial independence, source protection, and safeguards against surveillance.',
    articles: [
      {
        id: 'art-4',
        number: 'Article 4',
        title: 'Safeguards for Editorial Independence',
        isCritical: true,
        provisions: [
          'State Non-Interference: Member States shall not interfere in editorial policies',
          'Source Protection: Effective protection of journalistic sources and communications',
          'Spyware Prohibition: Deployment against journalists prohibited except with judicial authorization for national security',
          'Right to be informed after surveillance has occurred',
          'Right to judicial review of surveillance decisions'
        ],
        analysis: 'These provisions directly respond to concerns about governmental influence and spyware scandals. The "family members" extension addresses tactics used to pressure journalists indirectly. The national security exception requires case-by-case judicial authorization—no blanket permissions.'
      },
      {
        id: 'art-5',
        number: 'Article 5',
        title: 'Safeguards for Independent Functioning of Public Service Media',
        provisions: [
          'Transparent appointment procedures for directors based on objective criteria',
          'Sufficient term length to ensure actual independence',
          'Adequate and stable funding determined in advance',
          'Right to judicial review of dismissal decisions'
        ],
        analysis: 'These provisions directly respond to concerns about governmental influence over public broadcasters. The requirement for "objective criteria" in appointments aims to prevent political patronage.'
      },
      {
        id: 'art-6',
        number: 'Article 6',
        title: 'Duties of Media Service Providers',
        provisions: [
          'Ownership Disclosure: Beneficial owners and significant shareholders',
          'Financial Transparency: State advertising received, public funding sources',
          'Editorial Information: Contact details, editorial policies, complaint mechanisms',
          'Accessibility: Information must be easily accessible and regularly updated'
        ]
      },
      {
        id: 'art-7',
        number: 'Article 7',
        title: 'Safeguards in Individual Editorial Decisions',
        provisions: [
          'Internal procedures protecting editorial staff from owner/shareholder interference',
          'Editorial charters or equivalent mechanisms',
          'Whistleblower protection for journalists reporting interference'
        ]
      },
      {
        id: 'art-8',
        number: 'Article 8',
        title: 'Right to Customization',
        provisions: [
          'Recipients have right to easily change default settings of devices',
          'Applies to smart TVs and connected devices',
          'Applies to operating system default media apps',
          'Applies to algorithmic recommendation systems'
        ],
        analysis: 'This provision applies 36 months after entry into force (May 2027), giving device manufacturers time to implement necessary changes.'
      }
    ]
  },
  {
    number: 'III',
    title: 'The Board',
    description: 'Establishes the institutional framework for EU-level coordination, replacing ERGA with an enhanced European Board for Media Services.',
    articles: [
      {
        id: 'art-9-16',
        number: 'Articles 9-16',
        title: 'European Board for Media Services',
        provisions: [
          'Replaces ERGA with enhanced legal status and powers',
          'One representative per Member State from national regulatory authority',
          'Chair and Vice-Chair elected for 1-year term (renewable once)',
          'Advisory role to Commission on EMFA implementation',
          'Coordination of cross-border enforcement',
          'Guidelines development for regulatory cooperation',
          'Dispute resolution between Member States'
        ]
      }
    ]
  },
  {
    number: 'IV',
    title: 'Market Framework',
    description: 'Addresses market-related provisions including platform obligations, media concentrations, audience measurement, and state advertising transparency.',
    articles: [
      {
        id: 'art-17',
        number: 'Article 17',
        title: 'Provision of Media Services on Very Large Online Platforms',
        isCritical: true,
        provisions: [
          'Priority Complaint Handling: VLOPs must process complaints from media providers with priority',
          'Pre-Suspension Notice: Statement of reasons before restricting media content',
          'Meaningful Dialogue: Good faith engagement with affected media providers',
          'Annual Transparency Reporting: Reports on restrictions applied to media content'
        ],
        analysis: 'Article 17 creates a lex specialis for media content within the DSA framework. Affected platforms include those designated as VLOPs under DSA (>45M monthly active EU users): Meta, YouTube, TikTok, X, LinkedIn, and others.'
      },
      {
        id: 'art-18-21',
        number: 'Articles 18-21',
        title: 'Media Concentrations Assessment',
        provisions: [
          'National assessment requirements for media market concentrations',
          'Impact on media pluralism must be evaluated',
          'Safeguards for editorial independence considered',
          'Board can issue opinions on cross-border concentrations',
          'National authorities must give "utmost account" to Board opinions'
        ]
      },
      {
        id: 'art-22',
        number: 'Article 22',
        title: 'National Databases and Ownership Information',
        provisions: [
          'Member States must establish national databases',
          'Legal name and contact details of providers',
          'Beneficial ownership structure disclosure',
          'State funding and advertising received',
          'Information must be publicly accessible'
        ]
      },
      {
        id: 'art-23',
        number: 'Article 23',
        title: 'Audience Measurement',
        provisions: [
          'Methodologies must be transparent and verifiable',
          'Non-discriminatory practices required',
          'Compliance with industry standards',
          'VLOPs must provide methodology information to media providers upon request'
        ]
      },
      {
        id: 'art-24',
        number: 'Article 24',
        title: 'State Advertising Allocation',
        provisions: [
          'Transparent, objective, non-discriminatory allocation criteria',
          'Annual publication of expenditure per media provider',
          'Allocation based on reach and cost-effectiveness, not editorial stance'
        ],
        analysis: 'State advertising has been used as a tool for media capture in several Member States. By requiring transparent, criteria-based allocation, EMFA limits governments\' ability to reward favorable coverage or punish critical reporting.'
      }
    ]
  },
  {
    number: 'V',
    title: 'Final Provisions',
    description: 'Contains procedural provisions regarding monitoring, evaluation, amendments to existing legislation, and entry into force.',
    articles: [
      {
        id: 'art-25',
        number: 'Article 25',
        title: 'Monitoring and Evaluation',
        provisions: [
          'Commission to evaluate EMFA implementation 4 years after application',
          'Assessment of effects on media freedom and pluralism',
          'Review of Board\'s functioning and effectiveness',
          'Consideration of whether amendments are necessary'
        ]
      },
      {
        id: 'art-26',
        number: 'Article 26',
        title: 'Entry into Force and Application',
        provisions: [
          '7 May 2024: Entry into force',
          '7 May 2025: Regulatory cooperation provisions apply (12 months)',
          '8 August 2025: General application (15 months)',
          'May 2027: Right to customization applies (36 months)'
        ]
      }
    ]
  }
];

export const timeline: TimelineEvent[] = [
  {
    date: '11 April 2024',
    title: 'Adoption',
    description: 'Regulation (EU) 2024/1083 adopted by European Parliament and Council',
    status: 'completed'
  },
  {
    date: '7 May 2024',
    title: 'Entry into Force',
    description: 'EMFA published in Official Journal; enters into force. Board provisions become effective.',
    status: 'completed'
  },
  {
    date: '7 May 2025',
    title: 'Regulatory Cooperation',
    description: 'Provisions on regulatory cooperation between national media authorities apply (12 months)',
    status: 'upcoming'
  },
  {
    date: '8 August 2025',
    title: 'General Application',
    description: 'Full application of EMFA across all Member States. Editorial independence, source protection, platform obligations come into effect.',
    status: 'upcoming'
  },
  {
    date: 'May 2027',
    title: 'Customization Right',
    description: 'Right to customization (Article 8) applies. Device manufacturers must enable user control over default media settings.',
    status: 'future'
  },
  {
    date: 'August 2029',
    title: 'First Review',
    description: 'Commission evaluates EMFA implementation and considers amendments (4 years after general application)',
    status: 'future'
  }
];

export const definitions: Definition[] = [
  {
    term: 'Media Service',
    definition: 'A service where the principal purpose is the provision to the general public of programmes or press publications for information, entertainment or education, under editorial responsibility.',
    source: 'Article 2(1) EMFA'
  },
  {
    term: 'Media Service Provider',
    definition: 'A natural or legal person whose professional activity is the provision of a media service and who has editorial responsibility for the choice of content.',
    source: 'Article 2(2) EMFA'
  },
  {
    term: 'Editorial Responsibility',
    definition: 'Effective control both over the selection of content and over its organisation, either in a chronological schedule or a catalogue.',
    source: 'Article 2(3) EMFA'
  },
  {
    term: 'Spyware',
    definition: 'Any product with digital elements specifically designed to exploit vulnerabilities in other products for the purpose of enabling covert surveillance.',
    source: 'Article 2(8) EMFA'
  },
  {
    term: 'State Advertising',
    definition: 'Promotion or self-promotion activities undertaken by or on behalf of public authorities, including national, regional, or local governments.',
    source: 'Article 2(7) EMFA'
  },
  {
    term: 'Audience Measurement',
    definition: 'Activity of collecting, interpreting or processing data about the number and characteristics of users of media services.',
    source: 'Article 2(6) EMFA'
  }
];

export const keyStats = {
  articles: 26,
  recitals: 56,
  memberStates: 27,
  chapters: 5
};

export const pillars = [
  {
    icon: '✓',
    title: 'Editorial Independence',
    description: 'Binding safeguards against political and commercial interference in editorial decisions. Neither state bodies nor regulators may influence content.',
    link: '#art-4'
  },
  {
    icon: '🔒',
    title: 'Source Protection',
    description: 'Comprehensive protection for journalists and their sources against surveillance, with strict limitations on spyware deployment.',
    link: '#art-4'
  },
  {
    icon: '👁',
    title: 'Transparency',
    description: 'Mandatory disclosure of media ownership structures, state advertising allocations, and audience measurement methodologies.',
    link: '#art-6'
  },
  {
    icon: '🌐',
    title: 'Platform Accountability',
    description: 'Special obligations for very large online platforms regarding media content moderation and dialogue requirements.',
    link: '#art-17'
  }
];
