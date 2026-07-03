// src/projects.ts
// SOURCE OF TRUTH — every field below (except the 3 flagged "NEEDS COPY" entries)
// was pulled directly from the live Wix subpages on 2026-07-02.
// Merge this with any entries you already have for Power Bagels, Bronco Buckle
// Company, and Dream Xanadu — those aren't on Wix so they aren't included here.

export type Category =
  | 'Social Media'
  | 'Web Design'
  | 'Advertising'
  | 'Branding'
  | 'Illustration'
  | 'Graphic Design';

export type FilterTag = Category | 'All';

export interface Stat {
  value: string;
  label: string;
}

export interface Socials {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  tags: Category[];
  coverImg: string;
  coverVideo?: string;
  galleryImgs: string[];
  externalUrl?: string;
  externalUrlLabel?: string;
  externalUrlSecondary?: string;
  externalUrlSecondaryLabel?: string;
  socials?: Socials;
  problem: string;
  solution: string;
  stats: Stat[];
  needsCopy?: boolean; // true = placeholder, still needs real case-study text from Xan
  directLink?: boolean; // true = card click goes straight to externalUrl/socials.instagram,
                        // skips the /portfolio/:slug case-study page entirely
}

// Global footer / nav socials (from Wix header, confirmed on every page)
export const SOCIALS = {
  instagram: 'https://www.instagram.com/graphix.xan',
  linkedin: 'https://www.linkedin.com/in/xan-orchid/',
  upwork:
    'https://www.upwork.com/freelancers/~01b1742c39720ba911?s=1017484851352698959&p=1664027421637550080',
};

// Filter bar categories \u2014 PortfolioPage.tsx should import this
export const ALL_TAGS: FilterTag[] = [
  'All',
  'Social Media',
  'Web Design',
  'Advertising',
  'Branding',
  'Illustration',
  'Graphic Design',
];

export const PROJECTS: Project[] = [
  {
    slug: 'diamond-vitality-center',
    title: 'Diamond Vitality Center',
    subtitle: 'Radiating Wellness Through Social Media',
    category: 'Social Media',
    tags: ['Social Media', 'Web Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_2a57c72c4ae94d0d963dc25206bc3976~mv2.png',
      'https://static.wixstatic.com/media/b80b05_f1372dc549bb4dc8985e4f71886d82b6~mv2.png',
      'https://static.wixstatic.com/media/b80b05_783628700c654c6daf6a5fe9a72126fa~mv2.png',
    ],
    externalUrl: 'http://www.diamondvitalitycenter.com',
    externalUrlLabel: 'Visit Website',
    socials: {
      instagram: 'https://www.instagram.com/diamondvitalitycenter.com',
      facebook: 'https://www.facebook.com/profile.php?id=61557415139566',
      linkedin: 'https://www.linkedin.com/company/diamondvitalitycenter',
    },
    problem:
      'Diamond Vitality Center had issues with Brand Awareness, CRM Management, Memberships, and Client Acquisition.',
    solution:
      'Oversaw development of brand identity and marketing material redesign to enhance brand cohesion and support sales efforts. Built out their rebranded website. Led development and execution of a new membership model focused on a tiered pricing strategy. Managed content creation and social media campaigns across Meta, LinkedIn, and outbound email campaigns.',
    stats: [
      { value: '35%', label: 'INCREASE IN WEBSITE TRAFFIC' },
      { value: '80%', label: 'BOOST IN SOCIAL MEDIA FOLLOWERS' },
      { value: '15%', label: 'UPLIFT IN SERVICE SALES' },
    ],
  },
  {
    slug: 'dandelion-wild-school',
    title: 'Wild Child Nosara',
    subtitle: 'Rewilding education and enrollment',
    category: 'Web Design',
    tags: ['Web Design', 'Social Media'],
    coverVideo: '/src/assets/wildchild.mp4',
    coverImg:
      'https://static.wixstatic.com/media/b80b05_2d46d1e24b8044509f73cbf72783d968~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_a83f083de1764ec8ac1d53c1c790a8ec~mv2.png',
      'https://static.wixstatic.com/media/b80b05_1f45b6ed23194fe3aa1563e33d6a6b78~mv2.png',
      'https://static.wixstatic.com/media/b80b05_bf618fe1d4664000937f4598993055ab~mv2.png',
    ],
    externalUrl: 'https://www.wildchildnosara.com',
    externalUrlLabel: 'Visit Website',
    externalUrlSecondary: 'https://wildchild-registration.vercel.app',
    externalUrlSecondaryLabel: 'Registration App',
    socials: {
      instagram: 'https://www.instagram.com/wildchild.nosara.com',
      facebook:
        'https://www.facebook.com/p/Dandelion-Wildschooling-100086173344496/',
    },
    problem:
      'Wild Child was managing enrollment through multiple disconnected tools and manual processes, while their website and marketing channels weren\u2019t effectively communicating programs or converting interested families into registrations.',
    solution:
      'Redesigned and managed the website, built a custom enrollment platform, and created a cohesive marketing strategy across Instagram, Facebook, WhatsApp, and print materials \u2014 including reels, carousels, flyers, and promotional campaigns that streamlined enrollment and increased visibility for programs and events.',
    stats: [
      { value: '182%', label: 'INCREASE IN WEBSITE TRAFFIC' },
      { value: '47%', label: 'BOOST IN SOCIAL MEDIA FOLLOWERS' },
    ],
  },
  {
    slug: 'seekr',
    title: 'Seekr',
    subtitle: 'Seeking Brand Awareness & Client Acquisition',
    category: 'Advertising',
    tags: ['Advertising'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_53bc842d10af4edcb95a456d1b2084f9~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_b8f7acc76ce8408d98b1d18ca91ffd28~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_ad56c5d9fe0a4ba8a923e6cd92dd761e~mv2.jpg',
    ],
    problem: 'Seekr needed advertisements for their new advertisement campaign.',
    solution:
      'Generated a series of advertisements used for Google and Meta ads. Found the correct niche target audience and implemented an A/B testing strategy.',
    stats: [],
  },
  {
    slug: 'simple',
    title: 'Simple',
    subtitle: 'Seeking Brand Awareness & Client Acquisition',
    category: 'Advertising',
    tags: ['Advertising'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_4364238f7fee4f5ca2800fa5000f192f~mv2.png',
      'https://static.wixstatic.com/media/b80b05_e3bd61f15a7e4a0ea02a7d123a11a3dd~mv2.png',
      'https://static.wixstatic.com/media/b80b05_3e5248cf7a1f4b49906aee99616220c3f003.jpg',
      'https://static.wixstatic.com/media/b80b05_ecb0068d690242ff92ef39b12ee93587~mv2.png',
      'https://static.wixstatic.com/media/b80b05_7c57d5596b0c4b86b7b39d6cc83500b3~mv2.png',
      'https://static.wixstatic.com/media/b80b05_13dda89c28614e66b4efeb05c449cb72~mv2.png',
      'https://static.wixstatic.com/media/b80b05_6d752b01c3a74545b1aa3f2086487c23~mv2.png',
      'https://static.wixstatic.com/media/b80b05_8a188baba34640079ad8ecf51c479c56~mv2.png',
      'https://static.wixstatic.com/media/b80b05_58f27a5b6e1d486fb0d8dd9f857df195~mv2.png',
      'https://static.wixstatic.com/media/b80b05_bce7fb62ebc44f709dfa3bdff4ba3a1f~mv2.png',
      'https://static.wixstatic.com/media/b80b05_e4474acd9f874cca9922533568ed2a46~mv2.png',
      'https://static.wixstatic.com/media/b80b05_cf546082a1384cf8ac05425695ec9b03~mv2.png',
      'https://static.wixstatic.com/media/b80b05_55c327eae79542159100557de42f01cb~mv2.png',
      'https://static.wixstatic.com/media/b80b05_546bf95ca3d9437fb3ee0c068055e6a1~mv2.png',
      'https://static.wixstatic.com/media/b80b05_a345f36613f04cf7afd8b2c7810b33e7~mv2.png',
      'https://static.wixstatic.com/media/b80b05_9cff04485bd74b44a458f2db045b86e0~mv2.png',
    ],
    problem: 'Simple needed advertisements for their new advertisement campaign.',
    solution:
      'Generated a series of advertisements used for Google and Meta ads. Found the correct niche target audience and implemented an A/B testing strategy.',
    stats: [],
  },
  {
    slug: 'abrago',
    title: 'Abrago',
    subtitle: 'One-stop study abroad organizational platform',
    category: 'Web Design',
    tags: ['Web Design', 'Branding'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_31f81f20641044fdb25dd65dfa2634bc~mv2.png',
      'https://static.wixstatic.com/media/b80b05_8192da9bd09e4ec99b81ec1c9facf49d~mv2.png',
      'https://static.wixstatic.com/media/b80b05_5cd52e7897cc40c9b25f9e45f27298d3~mv2.png',
      'https://static.wixstatic.com/media/b80b05_ea06c83ba33d4a7cbb169223d5f4e14a~mv2.png',
      'https://static.wixstatic.com/media/b80b05_f0e512e7b8704a93b559c726b976d59d~mv2.png',
      'https://static.wixstatic.com/media/b80b05_0d43da6fc8964dfda16ed2c1376362ae~mv2.png',
      'https://static.wixstatic.com/media/b80b05_2a5702e78e5c44ceb8e9bb477d116ac0~mv2.png',
      'https://static.wixstatic.com/media/b80b05_acf6481ea0b444b08c05998788312134~mv2.png',
      'https://static.wixstatic.com/media/b80b05_4eb334309b1840969929a4eb681998c4~mv2.png',
      'https://static.wixstatic.com/media/b80b05_aa8e58d5a02b4f87a75ae65a40cb2981~mv2.png',
    ],
    problem:
      'Study abroad students lacked a single organizational platform to manage forms, safety information, and communication with their programs.',
    solution:
      "Abrago is a one-stop organizational platform \u2014 in app and website form \u2014 that simplifies and enhances the study abroad experience with a seamless communication channel, a comprehensive checklist of required forms and documents, critical safety information based on the student's location, and responsive customer service. Programs and universities also get a customizable backend to upload information for each program. NVC Finalist. Role: Team Leader as CEO & Founder \u2014 UI/UX Design, Brand Design, Business Development & Strategy.",
    stats: [],
  },
  {
    slug: 'art-portfolio',
    title: 'Artwork',
    subtitle: 'Illustration Portfolio',
    category: 'Illustration',
    tags: ['Illustration'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_34d4126bc2bc43cdbcdfd2d524a891ba~mv2.png',
      'https://static.wixstatic.com/media/b80b05_9e6e06a636f843b7b9f9e28824fe07be~mv2.png',
      'https://static.wixstatic.com/media/b80b05_246e960c78b349179cebe18124b3e1fc~mv2.png',
      'https://static.wixstatic.com/media/b80b05_daddd97e003e40bb8085bb650e73ef7a~mv2.png',
      'https://static.wixstatic.com/media/b80b05_3e863cdd413b40c4a160234d718455f7~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_137ddd4883ed45f8987d5a753cdd1880~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_2910493670c8444598b1deb9749bbea6~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_76a17ec6fb8e458db4112a5be2484d63~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_315da049f8e8453c8e8f05da8000c644~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_28b31bf77b804460a8fdbe1686681b67~mv2.jpeg',
      'https://static.wixstatic.com/media/b80b05_1e6f65d90fa4464fa347794f7110647b~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_2d08ff789a1b4efba62ce55a8c073747~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_538df9962846433c9ef00ad850321225~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_cb2b0387de464444b071f36a051e4a8c~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_8a2a6ced36814b1b8fa90ae663b194da~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_c8dd41b6bf2f4fc39361e38b60574009~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_fe43e9bdca784fbda616c31c45aa219a~mv2.jpeg',
    ],
    problem: '',
    solution: 'Original illustration and digital art portfolio.',
    stats: [],
  },
  {
    slug: 'one-local',
    title: 'One Local',
    subtitle: 'Connecting the community through healing.',
    category: 'Social Media',
    tags: ['Social Media', 'Web Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_8d0c7425fb594793ac17bdb2da0d3ea5~mv2.png',
      'https://static.wixstatic.com/media/b80b05_743bc8cb77fb40d5b00403baca53a571~mv2.png',
      'https://static.wixstatic.com/media/b80b05_85e5f6d3819e41e8ac9e96cb51143b3e~mv2.png',
    ],
    externalUrl: 'https://www.oneboulder.one',
    externalUrlLabel: 'Visit Website',
    problem: 'Lacked brand awareness and fluidity.',
    solution:
      "Rebranded the company and applied it to a visually appealing and flowing website. Developed a comprehensive social media strategy focused on creating engaging content that highlighted ONE Local's community.",
    stats: [],
  },
  {
    slug: 'goddess-activations',
    title: 'Goddess Activations',
    subtitle: 'To help empower women & tap into their true potential.',
    category: 'Social Media',
    tags: ['Social Media'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_29894a6300ed44f792876a17aac9591b~mv2.png',
      'https://static.wixstatic.com/media/b80b05_a1f3ee75414349f891947eea59401e28~mv2.png',
      'https://static.wixstatic.com/media/b80b05_35aa97e41171433aa674f02ffa5b39a7~mv2.png',
    ],
    problem: 'Did not have any sort of social media presence or branding.',
    solution:
      'Developed a visually stunning social media campaign that showcased the content and brand in a grid-like manner. Planned to expand content to help women reclaim their power across the globe.',
    stats: [{ value: '100%', label: 'BOOST IN SOCIAL MEDIA REACH' }],
  },
  {
    slug: 'flyers',
    title: 'Flyers',
    subtitle: 'Flyer & Print Collection',
    category: 'Graphic Design',
    tags: ['Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_e33f787deb7f4b26be020a92a2cd45e0~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_e07ca4a65f614c70a427b2410b86a5db~mv2.png',
      'https://static.wixstatic.com/media/b80b05_51174a903a48491e8ac6a697269224ee~mv2.png',
      'https://static.wixstatic.com/media/b80b05_8f916fe0280c4539a779a67beca71ee9~mv2.png',
      'https://static.wixstatic.com/media/b80b05_dc9c9c5ff3114a38a0b87f5687910028~mv2.png',
      'https://static.wixstatic.com/media/b80b05_6cfe5fb13acc4927b88ae5cbac6b8ea5~mv2.png',
      'https://static.wixstatic.com/media/b80b05_49b437b3e5904d618d6949816aa063da~mv2.jpeg',
      'https://static.wixstatic.com/media/b80b05_95c84ec3e4284742a62b40cb0b7efd19~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_e92de8566bb1419382342aad77d346d5~mv2.png',
      'https://static.wixstatic.com/media/b80b05_2d9b651f7d30465b9b798f8e258f7a55~mv2.png',
      'https://static.wixstatic.com/media/b80b05_e1cc843e642f45d0a1a6c9f4fefae796~mv2.png',
      'https://static.wixstatic.com/media/b80b05_6a3f452970a64833a5f80c6d34e9410f~mv2.png',
      'https://static.wixstatic.com/media/b80b05_d9f11b37406142fcba62dd657a917559~mv2.png',
      'https://static.wixstatic.com/media/b80b05_6165c55b144f4de0b0f118f619fd03ff~mv2.png',
      'https://static.wixstatic.com/media/b80b05_cbc49cc019cd4082ba2a4e8d6475e47b~mv2.png',
      'https://static.wixstatic.com/media/b80b05_4b308253c518405c977f698c79d46f2e~mv2.png',
      'https://static.wixstatic.com/media/b80b05_d3dbd00d9e9144759c7e609fbb0a5e02~mv2.png',
      'https://static.wixstatic.com/media/b80b05_eb2ab40f6dc84b66af39223a2e039b4a~mv2.png',
      'https://static.wixstatic.com/media/b80b05_f3fd68aaa3234e07b7f56b4f9fceff3c~mv2.png',
      'https://static.wixstatic.com/media/b80b05_936099953cec4bc8ac32487b7c172b76~mv2.png',
      'https://static.wixstatic.com/media/b80b05_1c86604338484e23aa66331774fc7efd~mv2.png',
      'https://static.wixstatic.com/media/b80b05_858c048b9d844b2eb11a4836ecce6718~mv2.png',
      'https://static.wixstatic.com/media/b80b05_153e805f2553469a8530bb006f8d08e1~mv2.png',
      'https://static.wixstatic.com/media/b80b05_c7c6c206560246c0a825ce3b3d8658b0~mv2.png',
      'https://static.wixstatic.com/media/b80b05_75bdcf5dc4634b609123f4f6928e0e4f~mv2.png',
    ],
    problem: '',
    solution: 'A collection of flyer and print design work.',
    stats: [],
  },
  {
    slug: 'hypnositea',
    title: 'Hypnositea',
    subtitle: 'Hypnose your day.',
    category: 'Branding',
    tags: ['Branding', 'Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_67dcfddefe4e4fde9956ff50e119e4bf~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_c4286fedc22f41d8b4434a08066723e0~mv2.png',
      'https://static.wixstatic.com/media/b80b05_a4847b069b1b44889aea824d7308a487~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_7fd685ef3c95419f8de05bd2ad77033e~mv2.png',
      'https://static.wixstatic.com/media/b80b05_4b0a2aaeeac74cbf958247214ad48587~mv2.jpg',
      'https://static.wixstatic.com/media/b80b05_12c65e5ea60249af9e6e855e462d5be0~mv2.jpg',
    ],
    problem: '',
    solution:
      'Herbal blend meant for smoking or steeping \u2014 designed to help decrease tobacco cravings by providing a healthy alternative that supports mood or sleep. Brand identity and packaging design.',
    stats: [],
  },
  {
    slug: 'astro-trips',
    title: 'Astro Trips',
    subtitle: 'Minted NFT Project',
    category: 'Illustration',
    tags: ['Illustration', 'Branding', 'Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_3a8ce749f3f94b6095afdda33d89170f~mv2.png',
      'https://static.wixstatic.com/media/b80b05_0d1669c54f454f9b9094e12ca547e920~mv2.png',
      'https://static.wixstatic.com/media/b80b05_935822d35c0a4fe29a39d3492b6ff88f~mv2.png',
      'https://static.wixstatic.com/media/b80b05_08f6a6f9b70b43078f4c4b1e3ee0f848~mv2.png',
    ],
    problem: '',
    solution:
      "Astro travels across galaxies and you'd be amazed by what they see. Their \"trips\" are composed of psychedelic art that transposes the real world \u2014 customizable based on the collector's own previous psychedelic trips.",
    stats: [],
  },
  {
    slug: 'gogal',
    title: 'GoGal',
    subtitle: 'The pocketknife app for women.',
    category: 'Web Design',
    tags: ['Web Design', 'Branding'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_b8c2e22cb7b940a88d892fbb33f7f87f~mv2.png',
      'https://static.wixstatic.com/media/b80b05_983ad59c036942d0b437e8de9e255080~mv2.png',
      'https://static.wixstatic.com/media/b80b05_b48a401b04e747809bdd648c90969b05~mv2.png',
      'https://static.wixstatic.com/media/b80b05_23e1ee663baa49c09461be6501f58b67f000.jpg',
    ],
    problem: '',
    solution:
      'Women-only, invite-only safety platform that connects mutual friends of friends for comfort and support while traveling or in your home town. Role: Team Leader as CEO & Founder \u2014 UI/UX Design, Brand Design, Business Development & Strategy.',
    stats: [],
  },

  {
    slug: 'power-bagels',
    title: 'Power Bagels',
    subtitle: 'Brand identity & content creation for a high-energy bagel concept',
    category: 'Branding',
    tags: ['Branding'],
    coverVideo: '/src/assets/powerbagels.mp4',
    coverImg: '', // TODO: add a still/screenshot to src/assets/ for the portfolio grid thumbnail — the video only shows on the full case-study page
    galleryImgs: [],
    externalUrl: 'https://www.powerbagels.com',
    externalUrlLabel: 'Visit Website',
    problem:
      'Power Bagels needed a bold brand identity and content that stood out on social media and in-store \u2014 confident, fun, and immediately recognizable.',
    solution:
      'Built a high-energy brand and produced video content that captured the playful personality of the concept, driving engagement and brand awareness.',
    stats: [],
  },
  {
    slug: 'xanadu',
    title: 'Dream Xanadu',
    subtitle: 'Full brand & web design for a network for awakening places',
    category: 'Web Design',
    tags: ['Web Design', 'Branding'],
    coverImg: '/assets/xanadu-hero.png', // handled by the xanaduHero import in ProjectDetail.tsx
    galleryImgs: [],
    externalUrl: 'https://dreamxanadu.com',
    externalUrlLabel: 'Visit Website',
    directLink: true,
    problem:
      'Xanadu needed a complete brand identity and digital presence that conveyed trust, beauty, and mystery \u2014 a network unlike anything else.',
    solution:
      'Designed the full visual identity and website for Dream Xanadu \u2014 logo, color system, and a rich immersive web experience that brings the network to life.',
    stats: [],
  },

  {
    slug: 'bronco-buckle-company',
    title: 'Bronco Buckle Company',
    subtitle: 'Hand-crafted sterling silver belt buckles, Dallas, TX',
    category: 'Web Design',
    tags: ['Web Design'],
    coverImg: 'https://www.broncobuckles.com/bblogo.png',
    galleryImgs: [],
    externalUrl: 'https://www.broncobuckles.com/',
    externalUrlLabel: 'Visit Website',
    problem: '', // NEEDS COPY \u2014 what was the challenge for Bronco Buckle?
    solution: '', // NEEDS COPY \u2014 what did you build/design for them?
    stats: [],
  },

  // ─────────────────────────────────────────────────────────────
  // DIRECT-LINK PROJECTS \u2014 Xan built the site or runs the Instagram
  // directly. No case-study subpage \u2014 the card click goes straight
  // out to the live work. coverImg still needed for the grid tile
  // (add a screenshot to src/assets/ and reference it below).
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'age-thoughtfully',
    title: 'Age Thoughtfully',
    subtitle: 'Wellness site for Marissa Kennerson',
    category: 'Web Design',
    tags: ['Web Design'],
    coverImg: 'https://images.squarespace-cdn.com/content/v1/5ea20c129ed1223b74d7d398/1607894600247-6JP0ZPS0W4AVNO8SQ1O1/image-asset.jpeg',
    galleryImgs: [],
    externalUrl: 'https://www.agethoughtfully.com',
    externalUrlLabel: 'Visit Website',
    socials: {
      instagram: 'https://www.instagram.com/marissa.kennerson/',
    },
    problem: '',
    solution: '',
    stats: [],
    directLink: true,
  },
  {
    slug: 'unicorn-alliance',
    title: 'Unicorn Alliance',
    subtitle: 'Web application',
    category: 'Web Design',
    tags: ['Web Design'],
    coverImg: 'https://raw.githubusercontent.com/xanorchid-svg/unicorn-alliance/main/public/unicorn-assets/whatsapp.jpeg',
    galleryImgs: [],
    externalUrl: 'https://unicorn-alliance.vercel.app/',
    externalUrlLabel: 'Visit Website',
    problem: '',
    solution: '',
    stats: [],
    directLink: true,
  },
  {
    slug: 'perfeqtion-imaging',
    title: 'Perfeqtion Imaging',
    subtitle: 'Social media for Dr. Jenn Simmons',
    category: 'Social Media',
    tags: ['Social Media'],
    coverImg: 'https://static.wixstatic.com/media/cb4220_8a62ba55f67b4902ac63e0755219d0f1~mv2.jpg',
    galleryImgs: [],
    socials: {
      instagram: 'https://www.instagram.com/perfeqtionimaging/',
    },
    problem: '',
    solution: '',
    stats: [],
    directLink: true,
  },
];
