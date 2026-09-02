/* ============================================================
   WORK LIST DATA
   ------------------------------------------------------------
   Add, remove or edit works here. Each object becomes one row
   in the work list, and its own popup when clicked. Nothing
   else in the site needs to change when you edit this file.

   Fields:
   id        unique short id, no spaces
   title     work title
   type      category. Use one of:
               Digital art
               Branding, merch & product
               Music & band merch
             (or your own — it becomes its own folder automatically)
   client    who it was made for. Use "Personal work" if none.
   year      four digit year.
   role      what you actually did on it — e.g. "Modelling,
             texturing, lighting" or "Illustration, lettering".
             Free text, list as many or as few as apply.
   desc      1-3 sentences about the piece
   img       path to the image file, relative to index.html.
             If a post has just one image, use this.
   images    optional. Use THIS instead of img when a post has
             more than one image (e.g. mockups, multiple angles).
             It's just a list: images: ['path/one.jpg', 'path/two.jpg'].
             The first one shown becomes the main image, and a
             row of thumbnails appears underneath to click through
             the rest. If both img and images are set, images wins.
   vertical  true if the source image is a tall/portrait image
   link      optional. External url (ArtStation, Instagram, etc).
             Leave as '' if there isn't one.
   linkLabel optional. Text shown on the link button, e.g.
             'Band Instagram' or 'View on ArtStation'. If left
             as '' it just says "View full project".
   video     optional. Path to a short video file to show under
             the image in the popup (breakdowns, environment
             flythroughs, etc). Leave as '' if there isn't one.
             Keep this specific to the piece it belongs to —
             don't reuse one video across multiple entries.
   ============================================================ */

window.SK_WORKS = [
  {
    id: 'beauty-for-ashes',
    title: 'Beauty For Ashes graphic ',
    type: 'Branding, merch & product',
    client: 'Beauty For Ashes Life Group',
    year: '2026',
    role: 'Illustration, lettering, apparel design',
    desc: 'Commissioned t-shirt and merch design built around Isaiah 61:3, pairing botanical line art with a wildflower field illustration.',
    images: [
      'assets/works/branding-merch-product/beauty_ashes_0.jpg',
      'assets/works/branding-merch-product/beauty_ashes_1.jpg'
    ],
    vertical: false,
    link: '',
    linkLabel: '',
    video: ''
  },
  {
    id: 'atems',
    title: 'Atems',
    type: 'Digital art',
    client: '1st Year Project',
    year: '2023',
    role: 'Concept design, character illustration, diorama environment',
    desc: 'First-year college project: an original character paired with a diorama environment, taken from concept through a full illustrated turnaround.',
    img: 'assets/works/digital-art/atems.jpg',
    vertical: false,
    link: 'https://garethlapras.artstation.com/projects/oJ9ABm',
    linkLabel: 'View on ArtStation',
    video: 'assets/works/digital-art/atems-environment.mp4'
  },
  {
    id: 'nyakezi',
    title: 'Nyakezi',
    type: 'Digital art',
    client: '2nd Year Project',
    year: '2025', 
    role: 'Design, modelling, texturing, surfacing, rigging, posing, lighting, compositing',
    desc: 'Second-year character study covering the full 3D pipeline end to end, from initial design through final lighting and composite.',
    img: 'assets/works/digital-art/nyakezi.jpg',
    vertical: false,
    link: 'https://garethlapras.artstation.com/projects/Zlx6r0',
    linkLabel: 'View on ArtStation',
    video: 'assets/works/digital-art/nyakezi-breakdown.mp4'
  },
  {
    id: 'watering',
    title: 'Watering',
    type: 'Digital art',
    client: 'Personal work',
    year: '2025',
    role: 'Digital painting',
    desc: 'A quiet vertical scene of a figure watering wildflowers at the edge of a field, built around warm afternoon light.',
    img: 'assets/works/digital-art/watering.jpg',
    vertical: true,
    link: '',
    linkLabel: '',
    video: ''
  },
  {
    id: 'marty-portrait',
    title: 'Marty Portrait',
    type: 'Digital art',
    client: 'Personal work',
    year: '2026',
    role: 'Digital painting',
    desc: 'Fanart for one of the coolest vocalists in the local scene.',
    images: [
      'assets/works/digital-art/MartyGreen2.jpg',
      'assets/works/digital-art/MartyPurple2.jpg'
    ],
    vertical: true,
    link: 'https://www.instagram.com/itsmartay?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==',
    linkLabel: 'Marty\'s Instagram',
    video: ''
  },
  {
    id: 'walk-these-skies',
    title: 'Walk These Skies Godforsaken Alternate Poster',
    type: 'Music & band merch',
    client: 'Walk These Skies',
    year: '2026',
    role: 'Poster design',
    desc: 'Alternate album cover concept for the band Walk These Skies — a lone silhouette dwarfed by a looming shadow figure on a fog-lit shore.',
    img: 'assets/works/music-band-merch/WTS_Godforsaken.jpg',
    vertical: true,
    link: 'https://www.instagram.com/walk_these_skies/',
    linkLabel: 'Band social',
    video: ''
  },
  {
    id: 'walk-these-skies-promo',
    title: 'Walk These Skies Band Promo Poster',
    type: 'Music & band merch',
    client: 'Walk These Skies',
    year: '2026',
    role: 'Poster design',
    desc: 'Promotional poster for Walk These Skies.',
    images: [
      'assets/works/music-band-merch/WTS_Promo2.jpg',
      'assets/works/music-band-merch/WTS_Promo.jpg'
    ],
    vertical: true,
    link: 'https://www.instagram.com/walk_these_skies/',
    linkLabel: 'Band social',
    video: ''
  },
];
