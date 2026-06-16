export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  coverImg: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  externalUrl: string | null;
  problem: string;
  solution: string;
  stats: { value: string; label: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'diamond-vitality-center',
    title: 'Diamond Vitality Center',
    subtitle: 'Social media strategy, content creation & website management',
    category: 'Social Media',
    tags: ['Social Media', 'Content Creation', 'Web Design'],
    // Grid image — the DVC branded graphic
    coverImg:
      'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
    externalUrl: 'http://www.diamondvitalitycenter.com',
    problem:
      'Diamond Vitality Center needed a stronger digital presence to attract new clients and clearly communicate their wellness offerings across social platforms and their website.',
    solution:
      'Xan developed a cohesive social media strategy, created engaging posts and reels, crafted newsletters and blogs, and built and maintained a clean, well-organized website.',
    stats: [
      { value: '35%', label: 'Increase in engagement' },
      { value: '80%', label: 'Growth in followers' },
      { value: '15%', label: 'Boost in web traffic' },
    ],
  },
  {
    slug: 'dandelion-wild-school',
    title: 'Dandelion Wild School',
    subtitle: 'Website design & brand presence for a nature-based learning school',
    category: 'Web Design',
    tags: ['Web Design', 'Brand Identity'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    externalUrl: 'https://elianebeeson.wixsite.com/wildchild',
    problem:
      'Dandelion Wild School needed a website that captured the spirit of outdoor, child-led education and communicated trust to parents exploring alternative schooling.',
    solution:
      'Xan designed a warm, nature-inspired website with a clear layout that conveyed the school\'s philosophy and made enrollment information easy to find.',
    stats: [],
  },
  {
    slug: 'simple',
    title: 'Simple',
    subtitle: 'Clean brand identity system — logo, palette, and visual language',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
    externalUrl: null,
    problem:
      'Simple needed a brand identity that communicated clarity and accessibility — visually approachable without feeling cheap or templated.',
    solution:
      'Xan created a minimalist identity system: a refined logo, a clean color palette, and consistent typography that let the brand\'s core message lead without distraction.',
    stats: [],
  },
  {
    slug: 'seekr',
    title: 'Seekr',
    subtitle: 'Startup brand identity — bold visual concept for a discovery platform',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Startup'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
    externalUrl: null,
    problem:
      'Seekr needed a brand identity that felt bold and modern — signaling ambition and innovation to early adopters and potential investors.',
    solution:
      'Xan developed a distinctive logomark and visual concept combining forward motion with discovery, giving the startup a confident and memorable brand presence.',
    stats: [],
  },
  {
    slug: 'abrago',
    title: 'Abrago',
    subtitle: 'Award-winning startup brand — all-in-one study abroad platform',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
    externalUrl: null,
    problem:
      'Study abroad students had no single platform to organize housing, finances, social connections, and local experiences — everything was scattered across apps and spreadsheets.',
    solution:
      'Xan ideated, branded, and pitched Abrago — an all-in-one platform for the study abroad experience. The concept won the New Venture Creation competition at CU Boulder.',
    stats: [],
  },
  {
    slug: 'one-local',
    title: 'One Local',
    subtitle: 'Brand identity for a community-centered local marketplace',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
    externalUrl: null,
    problem:
      'One Local needed branding that felt rooted in community — warm, authentic, and approachable, without losing polish or professionalism.',
    solution:
      'Xan built an identity anchored in warmth and locality: earthy tones, grounded typography, and a logomark that evoked connection and neighborhood pride.',
    stats: [],
  },
  {
    slug: 'goddess-activations',
    title: 'Goddess Activations',
    subtitle: 'Brand identity for a spiritual wellness and empowerment brand',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
    externalUrl: null,
    problem:
      'Goddess Activations needed a brand that felt sacred and empowering — visually beautiful and spiritually resonant, designed to attract women seeking transformation.',
    solution:
      'Xan crafted a rich, feminine brand identity using deep purples, gold accents, and flowing typography that captured the essence of divine feminine energy.',
    stats: [],
  },
  {
    slug: 'flyers',
    title: 'Flyers & Print',
    subtitle: 'Graphic design for events, promotions, and print collateral',
    category: 'Graphic Design',
    tags: ['Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    externalUrl: null,
    problem:
      'Clients needed high-quality print materials that stood out — event flyers, promotional pieces, and marketing collateral that felt designed, not templated.',
    solution:
      'Xan delivered eye-catching flyer and print designs tailored to each client\'s brand — bold typography, strong composition, and color that maximizes visual impact.',
    stats: [],
  },
  {
    slug: 'art-portfolio',
    title: 'Art Portfolio',
    subtitle: 'Original illustrations and digital artwork',
    category: 'Illustration',
    tags: ['Illustration', 'Graphic Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    externalUrl: null,
    problem:
      'A space to showcase Xan\'s personal artistic work — original illustrations and digital pieces that express her creative voice beyond client work.',
    solution:
      'A curated collection of original artwork demonstrating range and artistic identity, from digital illustration to visual storytelling and experimental design.',
    stats: [],
  },
  {
    slug: 'hypnositea',
    title: 'Hypnositea',
    subtitle: 'Brand identity and social media for a wellness tea brand',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media', 'Content Creation'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    externalUrl: null,
    problem:
      'Hypnositea needed a brand identity that communicated calm, ritual, and wellness — something that would resonate with a mindful, health-conscious audience.',
    solution:
      'Xan created a serene, elegant brand identity with soft palettes and flowing design elements that positioned Hypnositea as a premium mindful wellness experience.',
    stats: [],
  },
  {
    slug: 'astro-trips',
    title: 'Astro Trips',
    subtitle: 'NFT project — brand identity and complete visual universe',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Illustration'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
    externalUrl: null,
    problem:
      'Astro Trips needed a full visual universe — branding that felt otherworldly and collectible, built for the NFT space where visual storytelling drives value.',
    solution:
      'Xan developed the complete visual world for Astro Trips: branding, character design, and a cohesive aesthetic that brought the interstellar concept to life.',
    stats: [],
  },
  {
    slug: 'gogal',
    title: 'GoGal',
    subtitle: 'Startup brand — invite-only platform for women to connect & travel safely',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Web Design'],
    coverImg:
      'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    col1Img1:
      'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    col1Img2:
      'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    col2Img:
      'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
    externalUrl: null,
    problem:
      'Women traveling solo face real safety challenges and lack a trusted community of like-minded female travelers to connect with.',
    solution:
      'Xan founded and branded GoGal — an invite-only platform for women to connect, travel safely, and build authentic friendships through shared adventures.',
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
