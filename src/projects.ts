// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS.TS — Single source of truth
// Every project scraped directly from graphixannft.wixstudio.com/xanorchid
// Images, titles, and order match the Wix portfolio grid exactly.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  coverImg: string;        // shown on portfolio grid + project card
  galleryImgs: string[];   // shown on detail page (includes coverImg as first)
  externalUrl: string | null;
  problem: string;
  solution: string;
  stats: { value: string; label: string }[];
}

export const PROJECTS: Project[] = [

  // ── 1 ── DIAMOND VITALITY CENTER ─────────────────────────────────────────
  // Wix grid image: branded DVC graphic (purple/teal logo on dark bg)
  {
    slug: 'diamond-vitality-center',
    title: 'Diamond Vitality Center',
    subtitle: 'Social media management, content creation & website upkeep',
    category: 'Social Media',
    tags: ['Social Media', 'Content Creation', 'Web Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
      'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
    ],
    externalUrl: 'http://www.diamondvitalitycenter.com',
    problem: 'Diamond Vitality Center needed a stronger digital presence to attract new clients and communicate their wellness offerings clearly across social media and their website.',
    solution: 'Xan developed a full social media strategy, created engaging posts and reels, wrote newsletters and blogs, and built and maintained a clean, well-organized website.',
    stats: [
      { value: '35%', label: 'Increase in engagement' },
      { value: '80%', label: 'Growth in followers' },
      { value: '15%', label: 'Boost in web traffic' },
    ],
  },

  // ── 2 ── DANDELION WILD SCHOOL ────────────────────────────────────────────
  // Wix grid: tan/earthy watercolor illustration of a wild child scene
  // Note: Wix labels this "DANDELION WILD SCHOOL" with a live link to wildchild
  {
    slug: 'dandelion-wild-school',
    title: 'Dandelion Wild School',
    subtitle: 'Website design for a nature-based learning community',
    category: 'Web Design',
    tags: ['Web Design', 'Brand Identity'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    ],
    externalUrl: 'https://elianebeeson.wixsite.com/wildchild',
    problem: 'Dandelion Wild School needed a website that captured the spirit of outdoor, child-led education and communicated trust to parents exploring alternative schooling.',
    solution: 'Xan designed a warm, nature-inspired website with a clear layout that conveyed the school\'s philosophy and made enrollment information easy to find.',
    stats: [],
  },

  // ── 3 ── SIMPLE ───────────────────────────────────────────────────────────
  // Wix grid: clean typographic logo lockup on white/light background
  {
    slug: 'simple',
    title: 'Simple',
    subtitle: 'Minimalist brand identity — logo, palette & visual language',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Graphic Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    ],
    externalUrl: null,
    problem: 'Simple needed a brand identity that communicated clarity and accessibility — visually approachable without feeling cheap or templated.',
    solution: 'Xan created a minimalist identity: a refined logo, a clean color palette, and consistent typography that lets the brand\'s core message lead without distraction.',
    stats: [],
  },

  // ── 4 ── SEEKR ────────────────────────────────────────────────────────────
  // Wix grid: bold stylized "SEEKR" logomark on dark background
  {
    slug: 'seekr',
    title: 'Seekr',
    subtitle: 'Startup brand identity for a bold discovery platform',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Startup'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    ],
    externalUrl: null,
    problem: 'Seekr needed a brand identity that felt bold and modern — signaling ambition and innovation to early adopters and potential investors.',
    solution: 'Xan developed a distinctive logomark and visual concept combining forward motion with discovery, giving the startup a confident and memorable brand presence.',
    stats: [],
  },

  // ── 5 ── ABRAGO ───────────────────────────────────────────────────────────
  // Wix grid: warm coral/orange brand design with "abrago" wordmark
  {
    slug: 'abrago',
    title: 'Abrago',
    subtitle: 'Award-winning startup brand — all-in-one study abroad platform',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Graphic Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    ],
    externalUrl: null,
    problem: 'Study abroad students had no single platform to organize housing, finances, social connections, and local experiences.',
    solution: 'Xan ideated, branded, and pitched Abrago — an all-in-one study abroad platform. Won the New Venture Creation competition at CU Boulder.',
    stats: [],
  },

  // ── 6 ── ONE LOCAL ────────────────────────────────────────────────────────
  // Wix grid: earthy photograph — people at a local market/community setting
  {
    slug: 'one-local',
    title: 'One Local',
    subtitle: 'Brand identity for a community-centered local marketplace',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Graphic Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    ],
    externalUrl: null,
    problem: 'One Local needed branding that felt rooted in community — warm, authentic, approachable, without losing polish or professionalism.',
    solution: 'Xan built an identity anchored in warmth and locality: earthy tones, grounded typography, and a logomark evoking connection and neighborhood pride.',
    stats: [],
  },

  // ── 7 ── GODDESS ACTIVATIONS ─────────────────────────────────────────────
  // Wix grid: rich purple/gold mystical feminine energy photograph
  {
    slug: 'goddess-activations',
    title: 'Goddess Activations',
    subtitle: 'Brand identity for a spiritual wellness & empowerment brand',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    ],
    externalUrl: null,
    problem: 'Goddess Activations needed a brand that felt sacred and empowering — visually beautiful and spiritually resonant, designed to attract women seeking transformation.',
    solution: 'Xan crafted a rich, feminine identity with deep purples, gold accents, and flowing typography capturing the essence of divine feminine energy.',
    stats: [],
  },

  // ── 8 ── FLYERS & PRINT ───────────────────────────────────────────────────
  // Wix grid: colorful event flyer collage
  {
    slug: 'flyers',
    title: 'Flyers & Print',
    subtitle: 'Graphic design for events, promotions & print collateral',
    category: 'Graphic Design',
    tags: ['Graphic Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    ],
    externalUrl: null,
    problem: 'Clients needed high-quality print materials that stood out — event flyers, promotional pieces, and marketing collateral that felt designed, not templated.',
    solution: 'Xan delivered eye-catching flyer and print designs tailored to each client\'s brand, using bold typography, strong composition, and color for maximum visual impact.',
    stats: [],
  },

  // ── 9 ── ART PORTFOLIO ────────────────────────────────────────────────────
  // Wix grid: illustrated character art on dark background
  {
    slug: 'art-portfolio',
    title: 'Art Portfolio',
    subtitle: 'Original illustrations & digital artwork',
    category: 'Illustration',
    tags: ['Illustration', 'Graphic Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    ],
    externalUrl: null,
    problem: 'A space to showcase Xan\'s personal artistic work beyond client projects.',
    solution: 'A curated collection of original artwork demonstrating range and artistic identity — from digital illustration to visual storytelling.',
    stats: [],
  },

  // ── 10 ── HYPNOSITEA ──────────────────────────────────────────────────────
  // Wix grid: labeled "HYNOSITEA" on site — space/galaxy aesthetic image
  // Note: correct spelling is Hypnositea
  {
    slug: 'hypnositea',
    title: 'Hypnositea',
    subtitle: 'Brand identity & social media for a wellness tea brand',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media', 'Content Creation'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    ],
    externalUrl: null,
    problem: 'Hypnositea needed a brand that communicated calm, ritual, and wellness — resonating with a mindful, health-conscious audience.',
    solution: 'Xan created a serene, elegant brand identity with soft palettes and flowing design elements, positioning Hypnositea as a premium mindful wellness experience.',
    stats: [],
  },

  // ── 11 ── ASTRO TRIPS ─────────────────────────────────────────────────────
  // Wix grid: space/galaxy NFT visual — stars and cosmos imagery
  // NOTE: on Wix the Astro Trips image appears BEFORE GoGal in the grid
  {
    slug: 'astro-trips',
    title: 'Astro Trips',
    subtitle: 'NFT project — brand identity & complete visual universe',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Illustration'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    ],
    externalUrl: null,
    problem: 'Astro Trips needed a full visual universe — branding that felt otherworldly and collectible, built for the NFT space where visual storytelling drives value.',
    solution: 'Xan developed the complete visual world for Astro Trips: branding, character design, and a cohesive aesthetic that brought the interstellar concept to life.',
    stats: [],
  },

  // ── 12 ── GO GAL ──────────────────────────────────────────────────────────
  // Wix grid: warm lifestyle photo — women, travel, community energy
  {
    slug: 'gogal',
    title: 'GoGal',
    subtitle: 'Startup brand — invite-only platform for women to travel safely',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Web Design'],
    coverImg: 'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    galleryImgs: [
      'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    ],
    externalUrl: null,
    problem: 'Women traveling solo face real safety challenges and lack a trusted community of like-minded female travelers.',
    solution: 'Xan founded and branded GoGal — an invite-only platform for women to connect, travel safely, and build authentic friendships through shared adventures.',
    stats: [],
  },

];

// ─── Filter tags for portfolio grid ──────────────────────────────────────────
export const ALL_TAGS = [
  'All',
  'Brand Identity',
  'Web Design',
  'Social Media',
  'Startup',
  'Graphic Design',
  'Illustration',
  'Content Creation',
];
