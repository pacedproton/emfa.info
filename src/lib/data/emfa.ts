// EMFA Data - European Media Freedom Act content
// Based on Regulation (EU) 2024/1083

export interface Article {
  id: string;
  number: string;
  title: string;
  isCritical?: boolean;
  provisions: string[];
  analysis?: string;
  fullText?: string;
  recitals?: string[];
  tags?: string[];
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
        fullText: `<p>1. This Regulation lays down common rules for the proper functioning of the internal market for media services and establishes the European Board for Media Services, while safeguarding the independence and pluralism of media services.</p>
<p>2. This Regulation does not affect rules laid down by: (a) Directive 2000/31/EC; (b) Directive (EU) 2019/790; (c) Regulation (EU) 2019/1150; (d) Regulation (EU) 2022/2065; (e) Regulation (EU) 2022/1925; (f) Regulation (EU) 2024/900; (g) Regulation (EU) 2016/679.</p>
<p>3. This Regulation does not affect the possibility for Member States to adopt more detailed or stricter rules in the fields covered by Chapter II, Chapter III, Section 5, and Article 25, provided that those rules ensure a higher level of protection for media pluralism or editorial independence in accordance with this Regulation and comply with Union law.</p>`,
        analysis: 'The regulation employs a dual-pronged jurisdictional approach. Primary jurisdiction is based on establishment within the Union. Secondary jurisdiction captures non-EU providers "directing activities" toward Union audiences.'
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
        fullText: `<p>For the purposes of this Regulation, the following definitions apply:</p>
<p>(1) 'media service' means a service as defined by Articles 56 and 57 TFEU, where the principal purpose of the service or a dissociable section thereof consists in providing programmes or press publications, under the editorial responsibility of a media service provider, to the general public, by any means, in order to inform, entertain or educate;</p>
<p>(2) 'media service provider' means a natural or legal person whose professional activity is to provide a media service and who has editorial responsibility for the choice of the content of the media service and determines the manner in which it is organised;</p>
<p>(3) 'public service media provider' means a media service provider which is entrusted with a public service remit under national law and receives national public funding for the fulfilment of such a remit;</p>
<p>(8) 'editorial responsibility' means the exercise of effective control both over the selection of programmes or press publications and over their organisation, for the purposes of the provision of a media service, regardless of the existence of liability under national law for the service provided;</p>
<p>(16) 'spyware' means any product with digital elements specifically designed to exploit vulnerabilities in other products for the purpose of enabling covert surveillance...</p>`
      }
    ]
  },
  {
    number: 'II',
    title: 'Rights & Duties',
    description: 'Fundamental rights of recipients and providers, and duties of media service providers.',
    articles: [
      {
        id: 'art-3',
        number: 'Article 3',
        title: "Rights of Recipients of Media Services",
        provisions: [
          'Right to receive a plurality of media services',
          'Right to access information about media ownership',
          'Right to transparent information about editorial policies'
        ],
        fullText: `<p>Member States shall respect the right of recipients of media services to have access to a plurality of editorially independent media content and ensure that framework conditions are in place in line with this Regulation to safeguard that right, to the benefit of free and democratic discourse.</p>`
      },
      {
        id: 'art-4',
        number: 'Article 4',
        title: 'Rights of Media Service Providers',
        isCritical: true,
        provisions: [
          'State Non-Interference: Member States shall not interfere in editorial policies',
          'Source Protection: Effective protection of journalistic sources and communications',
          'Spyware Prohibition: Deployment against journalists prohibited except with judicial authorization for national security',
          'Right to be informed after surveillance has occurred',
          'Right to judicial review of surveillance decisions'
        ],
        fullText: `<p>1. Media service providers shall have the right to exercise their economic activities in the internal market without restrictions other than those allowed pursuant to Union law.</p>
<p>2. Member States shall respect the effective editorial freedom and independence of media service providers in the exercise of their professional activities. Member States, including their national regulatory authorities and bodies, shall not interfere in or try to influence the editorial policies and editorial decisions of media service providers.</p>
<p>3. Member States shall ensure that journalistic sources and confidential communications are effectively protected. Member States shall not take any of the following measures:</p>
<ul>
  <li>(a) oblige media service providers or their editorial staff to disclose information related to or capable of identifying journalistic sources or confidential communications...</li>
  <li>(b) detain, sanction, intercept or inspect media service providers or their editorial staff...</li>
  <li>(c) deploy intrusive surveillance software on any material, digital device, machine or tool used by media service providers...</li>
</ul>
<p>4. Paragraph 3 shall not affect the right of Member States to take such measures where they are justified by an overriding requirement in the public interest...</p>
<p>5. Member States shall ensure that media service providers... have a right to effective judicial protection...</p>`,
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
        fullText: `<p>1. Member States shall ensure that public service media providers are editorially and functionally independent and provide in an impartial manner a plurality of information and opinions to their audiences, in accordance with their public service remit as defined at national level in line with Protocol No 29.</p>
<p>2. Member States shall ensure that the procedures for the appointment and the dismissal of the head of management or the members of the management board of public service media providers aim to guarantee the independence of public service media providers...</p>
<p>3. Member States shall ensure that funding procedures for public service media providers are based on transparent, objective and non-discriminatory criteria laid down in advance...</p>`
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
        ],
        fullText: `<p>1. Media service providers shall make easily and directly accessible to the recipients of their services up-to-date information on:</p>
<ul>
  <li>(a) their legal name or names and contact details;</li>
  <li>(b) the name or names of their direct or indirect owner or owners...</li>
  <li>(c) the name or names of their beneficial owner or owners...</li>
  <li>(d) the total annual amount of public funds for state advertising allocated to them...</li>
</ul>
<p>2. Member States shall entrust national regulatory authorities or bodies... with the development of national media ownership databases...</p>
<p>3. Without prejudice to national constitutional law... media service providers providing news and current affairs content shall take measures... with a view to guaranteeing the independence of editorial decisions.</p>`
      }
    ]
  },
  {
    number: 'III',
    title: 'Regulatory Framework',
    description: 'Establishes the European Board for Media Services and cooperation mechanisms.',
    articles: [
      {
        id: 'art-7',
        number: 'Article 7',
        title: 'National Regulatory Authorities',
        provisions: [
          'Member States must ensure independence of national regulators',
          'Adequate financial and human resources',
          'Powers to request information'
        ],
        fullText: `<p>1. The national regulatory authorities or bodies shall ensure... that this Chapter is applied.</p>
<p>2. The national regulatory authorities or bodies shall be subject to the requirements set out in Article 30 of Directive 2010/13/EU...</p>
<p>3. Member States shall ensure that the national regulatory authorities or bodies have adequate financial, human and technical resources to carry out their tasks under this Regulation.</p>
<p>4. Where needed for carrying out their tasks... Member States shall ensure that the national regulatory authorities or bodies are empowered to request... information and data...</p>`
      },
      {
        id: 'art-8',
        number: 'Article 8',
        title: 'European Board for Media Services',
        provisions: [
          'Replaces ERGA with enhanced legal status and powers',
          'Composed of representatives of national regulatory authorities'
        ],
        fullText: `<p>1. The European Board for Media Services (the 'Board') is hereby established.</p>
<p>2. The Board shall replace and succeed the European Regulators Group for Audiovisual Media Services (ERGA) established by Article 30b of Directive 2010/13/EU.</p>`
      },
      {
        id: 'art-9',
        number: 'Article 9',
        title: 'Independence of the Board',
        provisions: [
          'Board acts in full independence',
          'Neither seeks nor takes instructions from any government'
        ],
        fullText: `<p>The Board shall act in full independence when performing its tasks or exercising its powers. In particular, the Board shall, in the performance of its tasks or the exercise of its powers, neither seek nor take instructions from any government, institution, person or body. This shall not affect the competences of the Commission or the national regulatory authorities or bodies in accordance with this Regulation.</p>`
      },
      {
        id: 'art-10',
        number: 'Article 10',
        title: 'Structure of the Board',
        provisions: [
          'Composed of representatives of national regulatory authorities',
          'One vote per member',
          'Elects Chair and Vice-Chair'
        ],
        fullText: `<p>1. The Board shall be composed of representatives of national regulatory authorities or bodies.</p>
<p>2. Each member of the Board shall have one vote.</p>
<p>3. The Board shall take decisions by a two-thirds majority of its members with voting rights.</p>
<p>5. The Board shall elect a Chair and a Vice-Chair from amongst its members...</p>
<p>6. The Commission shall designate a representative to the Board... without voting rights...</p>`
      },
      {
        id: 'art-13',
        number: 'Article 13',
        title: 'Tasks of the Board',
        provisions: [
          'Advises Commission',
          'Promotes cooperation between regulators',
          'Issues opinions on media concentrations and non-EU media'
        ],
        fullText: `<p>1. Without prejudice to the powers granted to the Commission by the Treaties, the Board shall advise and support the Commission on matters related to media services within the Board's competence and promote the consistent and effective application of this Chapter and the implementation of Directive 2010/13/EU throughout the Union.</p>
<p>The Board shall therefore: (a) provide technical expertise... (b) promote cooperation... (d) draw up opinions... (g) monitor the implementation... (m) draw up guidelines...</p>`
      },
      {
        id: 'art-17',
        number: 'Article 17',
        title: 'Coordination of Measures (Non-EU Media)',
        provisions: [
          'Coordination of measures against non-EU media presenting security risks',
          'Board to issue opinions on appropriate measures'
        ],
        fullText: `<p>1. Without prejudice to Article 3 of Directive 2010/13/EU, the Board shall, at the request of the national regulatory authorities or bodies from at least two Member States, coordinate relevant measures... related to the dissemination of or access to media services originating from outside the Union... where... such media services prejudice or present a serious and grave risk of prejudice to public security.</p>
<p>2. The Board, in consultation with the Commission, may issue opinions on appropriate measures...</p>
<p>4. The Board... shall develop a set of criteria for the use of national regulatory authorities...</p>`
      }
    ]
  },
  {
    number: 'III-4',
    title: 'Digital Environment',
    description: 'Provisions regarding very large online platforms and device customization.',
    articles: [
      {
        id: 'art-18',
        number: 'Article 18',
        title: 'Content on Very Large Online Platforms',
        isCritical: true,
        provisions: [
          'Functionality for media providers to declare independence',
          'Priority handling of complaints/restrictions',
          'Requirement for meaningful dialogue before suspension',
          'Annual reporting on media content moderation'
        ],
        fullText: `<p>1. Providers of very large online platforms shall provide a functionality allowing recipients of their services to:</p>
<ul>
  <li>(a) declare that they are media service providers;</li>
  <li>(b) declare that they comply with Article 6(1);</li>
  <li>(c) declare that they are editorially independent...</li>
  <li>(d) declare that they are subject to regulatory requirements...</li>
</ul>
<p>2. Providers of very large online platforms shall ensure that the information declared under paragraph 1... is made publicly available...</p>`,
        analysis: 'Article 18 creates a "media privilege" on VLOPs. Platforms cannot arbitrarily remove media content without prior notice and dialogue, provided the media outlet has self-declared its status and independence.'
      },
      {
        id: 'art-20',
        number: 'Article 20',
        title: 'Right to Customise Media Offering',
        provisions: [
          'Users right to change default settings on devices/interfaces',
          'Manufacturers must enable easy configuration changes',
          'Visual identity of media providers must be clearly visible'
        ],
        fullText: `<p>1. Users shall have a right to easily change the configuration, including default settings, of any device or user interface controlling or managing access to and the use of media services...</p>
<p>2. When placing devices and user interfaces... on the market, manufacturers... shall ensure that such devices... include a functionality enabling users to freely and easily change at any time their configuration...</p>
<p>3. Manufacturers... shall ensure that the visual identity of media service providers... is consistently and clearly visible to the users.</p>`,
        analysis: 'This "must-carry" style provision ensures that device manufacturers (e.g., Smart TV OS providers) cannot lock users into their own ecosystems or hide third-party media apps.'
      }
    ]
  },
  {
    number: 'III-5',
    title: 'Market Measures',
    description: 'Assessment of media market concentrations and audience measurement.',
    articles: [
      {
        id: 'art-21',
        number: 'Article 21',
        title: 'National Measures Affecting Media',
        provisions: [
          'Measures affecting media pluralism must be justified and proportionate',
          'Right to effective remedy before a court'
        ],
        fullText: `<p>1. Member States shall respect the effective editorial freedom and independence of media service providers...</p>
<p>2. Member States shall ensure that any measures adopted by national public authorities that are liable to affect media pluralism or editorial independence... are justified, proportionate and non-discriminatory...</p>
<p>4. National measures affecting media service providers... shall comply with Union law...</p>`
      },
      {
        id: 'art-22',
        number: 'Article 22',
        title: 'Assessment of Media Market Concentrations',
        provisions: [
          'Member States must assess impact of concentrations on pluralism',
          'Rules must be transparent, objective, and proportionate'
        ],
        fullText: `<p>1. Member States shall lay down, in national law, substantive and procedural rules which allow for an assessment of media market concentrations that could have a significant impact on media pluralism and editorial independence...</p>
<p>2. In an assessment... the following elements shall be taken into account: (a) the expected impact... on media pluralism... (b) the expected impact... on editorial independence...</p>
<p>4. Where a media market concentration is likely to affect the functioning of the internal market... the national regulatory authority... shall consult the Board...</p>`
      },
      {
        id: 'art-23',
        number: 'Article 23',
        title: 'Opinions on Media Market Concentrations',
        provisions: [
          'Board can issue opinions on concentrations affecting internal market',
          'National authorities must provide reasoned justification if not following opinion'
        ],
        fullText: `<p>1. The Board may... issue opinions on national measures related to media market concentrations...</p>
<p>2. Where the Commission finds that a media market concentration is likely to affect the functioning of the internal market... it may request the Board to issue an opinion.</p>
<p>4. Where a national regulatory authority or body does not follow the opinion of the Board... it shall provide the Board and the Commission with a reasoned justification...</p>`
      },
      {
        id: 'art-24',
        number: 'Article 24',
        title: 'Audience Measurement',
        provisions: [
          'Methodologies must be transparent, impartial, and verifiable',
          'Providers of measurement systems must provide information on methodology',
          'Non-discriminatory access to data'
        ],
        fullText: `<p>1. Member States shall ensure that media service providers, advertisers and media agencies have access to transparent, objective, proportionate and non-discriminatory audience measurement systems.</p>
<p>2. Providers of audience measurement systems shall ensure that their systems are transparent, objective, proportionate and non-discriminatory, in particular with regard to their methodologies, data collection and processing, and presentation of results.</p>`
      },
      {
        id: 'art-25',
        number: 'Article 25',
        title: 'State Advertising',
        provisions: [
          'Transparent, objective, non-discriminatory allocation criteria',
          'Public disclosure of advertising expenditure',
          'Prohibition of allocation to influence editorial content'
        ],
        fullText: `<p>1. Member States shall ensure that any public funds for state advertising and supply or service contracts allocated to media service providers are awarded through transparent, objective, proportionate and non-discriminatory procedures.</p>
<p>2. Member States shall ensure that national public authorities... publish, at least once a year, information about such allocation...</p>`
      }
    ]
  },
  {
    number: 'IV',
    title: 'Final Provisions',
    description: 'Monitoring, evaluation, and entry into force.',
    articles: [
      {
        id: 'art-26',
        number: 'Article 26',
        title: 'Monitoring',
        provisions: [
          'Commission to monitor internal market for media services',
          'Independent study every 2 years'
        ],
        fullText: `<p>1. The Board shall carry out a regular monitoring exercise on developments in the internal market for media services, including on trends concerning media pluralism and editorial independence in the Member States.</p>
<p>3. On the basis of the monitoring exercise, the Board shall publish a report on media pluralism and editorial independence in the Union every two years...</p>`
      },
      {
        id: 'art-29',
        number: 'Article 29',
        title: 'Entry into Force',
        provisions: [
          'Enters into force 20 days after publication',
          'Applies from 8 August 2025',
          'Art 7-12 (Board) apply from 2 February 2025',
          'Art 20 (Customisation) applies from 8 May 2027'
        ],
        fullText: `<p>1. This Regulation shall enter into force on the twentieth day following that of its publication in the Official Journal of the European Union.</p>
<p>2. This Regulation shall apply from 8 August 2025. However: (a) Article 3 shall apply from 8 November 2024; (b) Article 4(1) and (2), Article 6(3) and Articles 7 to 13 and 28 shall apply from 8 February 2025; (c) Articles 14 to 17 shall apply from 8 May 2025; (d) Article 20 shall apply from 8 May 2027.</p>`
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
    description: 'EMFA published in Official Journal; enters into force.',
    status: 'completed'
  },
  {
    date: '2 February 2025',
    title: 'Board Establishment',
    description: 'Provisions regarding the European Board for Media Services (Arts 7-12) apply.',
    status: 'completed'
  },
  {
    date: '8 August 2025',
    title: 'General Application',
    description: 'Full application of EMFA across all Member States (except Art 20).',
    status: 'completed'
  },
  {
    date: '8 May 2027',
    title: 'Customization Right',
    description: 'Article 20 (Right to Customisation) applies 36 months after entry into force.',
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
    source: 'Article 2(16) EMFA'
  },
  {
    term: 'State Advertising',
    definition: 'Promotion or self-promotion activities undertaken by or on behalf of public authorities, including national, regional, or local governments.',
    source: 'Article 2(15) EMFA'
  },
  {
    term: 'Audience Measurement',
    definition: 'Activity of collecting, interpreting or processing data about the number and characteristics of users of media services.',
    source: 'Article 2(14) EMFA'
  }
];

export const keyStats = {
  articles: 29,
  recitals: 56,
  memberStates: 27,
  chapters: 4
};

export const pillars = [
  {
    icon: '✓',
    title: 'Editorial Independence',
    description: 'Binding safeguards against political and commercial interference in editorial decisions. Neither state bodies nor regulators may influence content.',
    link: '/articles/art-4'
  },
  {
    icon: '🔒',
    title: 'Source Protection',
    description: 'Comprehensive protection for journalists and their sources against surveillance, with strict limitations on spyware deployment.',
    link: '/articles/art-4'
  },
  {
    icon: '👁',
    title: 'Transparency',
    description: 'Mandatory disclosure of media ownership structures, state advertising allocations, and audience measurement methodologies.',
    link: '/articles/art-6'
  },
  {
    icon: '🌐',
    title: 'Platform Accountability',
    description: 'Special obligations for very large online platforms regarding media content moderation and dialogue requirements.',
    link: '/articles/art-18'
  }
];
