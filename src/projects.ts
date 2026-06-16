export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  coverImg: string;
  galleryImgs: string[];
  externalUrl: string | null;
  problem: string;
  solution: string;
  stats: { value: string; label: string }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// TRUE IMAGE → PROJECT MAPPING
// Source: graphixannft.wixstudio.com/xanorchid/portfolio
//
// The Wix HTML lists images BEFORE their title, but "DANDELION WILD SCHOOL"
// is a text-only hyperlink with NO image. This shifts every image after it
// by one position. Correct mapping:
//
//  b80b05_4197938d  →  Diamond Vitality Center  (navy/gold DVC logo)
//  b80b05_9df5fbb6  →  Simple                   (app mockup screenshot)
//  b80b05_834d8e30  →  Seekr                    (woman with phone ad)
//  b80b05_d701bdca  →  Abrago                   (travel globe silhouette)
//  b80b05_2305bdcf  →  One Local                (red geometric ONE design)
//  b80b05_4a4d6bfe  →  Goddess Activations      (glowing goddess woman)
//  b80b05_9d859e43  →  Flyers & Print           (flyer collage)
//  b80b05_b93b871b  →  Art Portfolio            (illustrated character)
//  b80b05_3cc09fce  →  Hypnositea               (tea/wellness visual)
//  b80b05_d7e67e7f  →  Astro Trips              (galaxy/space visual)
//  b80b05_0432fd65  →  GoGal                    (women travel photo)
//
//  Dandelion Wild School → uses image from their actual live site
// ─────────────────────────────────────────────────────────────────────────────

const W = 'https://static.wixstatic.com/media/';

export const PROJECTS: Project[] = [
  {
    slug: 'diamond-vitality-center',
    title: 'Diamond Vitality Center',
    subtitle: 'Social media management, content creation & website upkeep',
    category: 'Social Media',
    tags: ['Social Media', 'Content Creation', 'Web Design'],
    coverImg: W + 'b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
    galleryImgs: [
      W + 'b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
      W + 'b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
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
  {
    slug: 'dandelion-wild-school',
    title: 'Dandelion Wild School',
    subtitle: 'Website design for a nature-based learning community in Costa Rica',
    category: 'Web Design',
    tags: ['Web Design', 'Brand Identity'],
    // Image from their actual live site — children in nature/Costa Rica setting
    coverImg: W + 'b80b05_1183020d0f444e2b87555f2431eed7fe~mv2.jpg',
    galleryImgs: [
      W + 'b80b05_1183020d0f444e2b87555f2431eed7fe~mv2.jpg',
      W + 'b80b05_47e038b0be594e1392e95947ffc4d562~mv2.jpg',
      W + 'b80b05_c16a8987ce2f4c1ba5e44ea3c157b9bd~mv2.jpg',
    ],
    externalUrl: 'https://elianebeeson.wixsite.com/wildchild',
    problem: 'Dandelion Wild School needed a website that captured the spirit of outdoor, child-led education and communicated trust to parents exploring alternative schooling in Nosara, Costa Rica.',
    solution: "Xan designed a warm, nature-inspired website with a clear layout that conveyed the school's philosophy and made enrollment information easy to find.",
    stats: [],
  },
  {
    slug: 'simple',
    title: 'Simple',
    subtitle: 'App design & brand identity for a fintech platform',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Web Design', 'Graphic Design'],
    coverImg: W + 'b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    galleryImgs: [W + 'b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png'],
    externalUrl: null,
    problem: 'Simple needed a compelling visual presence and app design that communicated clarity and accessibility to users.',
    solution: "Xan created a clean, modern app design and brand identity that let the product's core message lead without distraction.",
    stats: [],
  },
  {
    slug: 'seekr',
    title: 'Seekr',
    subtitle: 'Startup brand identity — "Seek and You Shall Find"',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Startup'],
    coverImg: W + 'b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    galleryImgs: [W + 'b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg'],
    externalUrl: null,
    problem: 'Seekr needed a brand identity that felt bold and modern — signaling ambition and innovation to early adopters and potential investors.',
    solution: 'Xan developed a distinctive visual concept combining forward motion with discovery, giving the startup a confident and memorable brand presence.',
    stats: [],
  },
  {
    slug: 'abrago',
    title: 'Abrago',
    subtitle: 'Award-winning startup brand — all-in-one study abroad platform',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Graphic Design'],
    coverImg: W + 'b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    galleryImgs: [W + 'b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png'],
    externalUrl: null,
    problem: 'Study abroad students had no single platform to organize housing, finances, social connections, and local experiences.',
    solution: 'Xan ideated, branded, and pitched Abrago — an all-in-one study abroad platform. Won the New Venture Creation competition at CU Boulder.',
    stats: [],
  },
  {
    slug: 'one-local',
    title: 'One Local',
    subtitle: 'Brand identity for a community-centered local marketplace',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Graphic Design'],
    coverImg: W + 'b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    galleryImgs: [W + 'b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png'],
    externalUrl: null,
    problem: 'One Local needed branding that felt rooted in community — warm, authentic, and approachable without losing polish.',
    solution: 'Xan built an identity anchored in warmth and locality: bold typography, grounded color, and a logomark evoking connection and neighborhood pride.',
    stats: [],
  },
  {
    slug: 'goddess-activations',
    title: 'Goddess Activations',
    subtitle: 'Brand identity for a spiritual wellness & empowerment brand',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media'],
    coverImg: W + 'b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    galleryImgs: [W + 'b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg'],
    externalUrl: null,
    problem: 'Goddess Activations needed a brand that felt sacred and empowering — visually beautiful and spiritually resonant.',
    solution: 'Xan crafted a rich, feminine identity with deep purples, gold accents, and flowing typography capturing divine feminine energy.',
    stats: [],
  },
  {
    slug: 'flyers',
    title: 'Flyers & Print',
    subtitle: 'Graphic design for events, promotions & print collateral',
    category: 'Graphic Design',
    tags: ['Graphic Design'],
    coverImg: W + 'b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    galleryImgs: [W + 'b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg'],
    externalUrl: null,
    problem: 'Clients needed high-quality print materials that stood out — event flyers and marketing collateral that felt designed, not templated.',
    solution: 'Xan delivered eye-catching designs using bold typography, strong composition, and color for maximum visual impact.',
    stats: [],
  },
  {
    slug: 'art-portfolio',
    title: 'Art Portfolio',
    subtitle: 'Original illustrations & digital artwork',
    category: 'Illustration',
    tags: ['Illustration', 'Graphic Design'],
    coverImg: W + 'b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    galleryImgs: [W + 'b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png'],
    externalUrl: null,
    problem: "A space to showcase Xan's personal artistic work beyond client projects.",
    solution: 'A curated collection of original artwork demonstrating range and artistic identity — from digital illustration to visual storytelling.',
    stats: [],
  },
  {
    slug: 'hypnositea',
    title: 'Hypnositea',
    subtitle: 'Brand identity & social media for a wellness tea brand',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media', 'Content Creation'],
    coverImg: W + 'b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    galleryImgs: [W + 'b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png'],
    externalUrl: null,
    problem: 'Hypnositea needed a brand that communicated calm, ritual, and wellness — resonating with a mindful, health-conscious audience.',
    solution: 'Xan created a serene, elegant brand identity positioning Hypnositea as a premium mindful wellness experience.',
    stats: [],
  },
  {
    slug: 'astro-trips',
    title: 'Astro Trips',
    subtitle: 'NFT project — brand identity & complete visual universe',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Illustration'],
    coverImg: W + 'b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    galleryImgs: [W + 'b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png'],
    externalUrl: null,
    problem: 'Astro Trips needed a full visual universe — branding that felt otherworldly and collectible for the NFT space.',
    solution: 'Xan developed the complete visual world for Astro Trips: branding, character design, and a cohesive interstellar aesthetic.',
    stats: [],
  },
  {
    slug: 'gogal',
    title: 'GoGal',
    subtitle: 'Startup brand — invite-only platform for women to travel safely',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Web Design'],
    coverImg: W + 'b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    galleryImgs: [W + 'b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg'],
    externalUrl: null,
    problem: 'Women traveling solo face real safety challenges and lack a trusted community of like-minded female travelers.',
    solution: 'Xan founded and branded GoGal — an invite-only platform for women to connect, travel safely, and build authentic friendships.',
    stats: [],
  },
];

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
