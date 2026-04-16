// Contact & social links
export const wa = 'https://wa.me/66944265297';
export const email = '347happylifehappyworld@gmail.com';

// Featured TikTok video on the Master Kaie section.
// Swap these two values to change which video is embedded — no other code changes needed.
export const featuredTiktok = {
  videoId: '7484144831330045202',
  username: '347_happylifehappyworld',
};

export const social = {
  fb: 'https://web.facebook.com/profile.php?id=61550271392068',
  ig: 'https://www.instagram.com/kaie_awaken',
  yt: 'https://youtube.com/@kaie347happylife',
  tt: 'https://www.tiktok.com/@347_happylifehappyworld',
};

export const waMsg = (course: string) =>
  `https://wa.me/66944265297?text=${encodeURIComponent(
    `Hello, I'm interested in the ${course}. Could you help me book?`
  )}`;

// Map
export const mapEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.5!2d98.9810711!3d18.7787367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da31004702f2c5%3A0x4660cea33addd1fc!2s347%20Happy%20life%20meditation%20retreat!5e0!3m2!1sen!2sth!4v1';

export const googleMapsLink =
  'https://www.google.com/maps/place/347+Happy+life+meditation+retreat/@18.7787367,98.9810711,17z/data=!3m1!4b1!4m6!3m5!1s0x30da31004702f2c5:0x4660cea33addd1fc!8m2!3d18.7787316!4d98.983646!16s%2Fg%2F11vt0mkk_0';

// Brand vision (from Transformation Story)
export const vision = {
  tagline: 'Awaken your mind. Transform your life. Create your happy world.',
  mission:
    'To guide people from mental chaos to inner clarity — from suffering to understanding, from unconscious living to awakened life.',
};

// 347 Life Reset Experience (entry-level offering)
export const lifeReset = {
  title: '347 Life Reset Experience',
  location: 'Chiang Mai',
  promise: 'Reset Your Life in 3 Hours',
  duration: '3 Hours',
  groupPriceUsd: 47,
  groupPriceThb: 1700,
  privatePriceUsd: 77,
  privatePriceThb: 2500,
  benefits: [
    'Release Stress',
    'Clear Your Mind',
    'Reconnect to Your True Self',
    'Feel Inner Peace',
  ],
};

// Why people trust Kaie — the 4 qualities, exactly as listed in the doc.
export const trustQualities: string[] = [
  'Authenticity',
  'Compassion',
  'Deep Inner Stability',
  'Genuine Intention',
];

// 5 pillars of Kaie's teaching method
export const teachingPillars: { number: string; title: string; body: string }[] = [
  {
    number: '01',
    title: 'Awareness Before Technique',
    body: 'Students first learn how the mind works — recognising thoughts, emotions, and patterns through observer consciousness — so meditation becomes natural, not forced.',
  },
  {
    number: '02',
    title: 'Experiential Awakening',
    body: 'Practice over theory. Carefully designed sessions guide students to observe the mind, release emotional tension, and reconnect with deep awareness.',
  },
  {
    number: '03',
    title: 'The 347 Transformation System',
    body: '3 Alignments · 4 Self-Access steps · 7 Life Transformations — a complete framework for everyday awakening.',
  },
  {
    number: '04',
    title: 'Modern Spiritual Teaching',
    body: 'Bridges ancient Buddhist wisdom and modern life so students from any background can apply it immediately.',
  },
  {
    number: '05',
    title: 'A Safe Space for Inner Transformation',
    body: 'A supportive container where students feel safe to explore their inner world. Many describe sessions as a turning point in their life.',
  },
];

// 347 Philosophy framework (3-4-7)
export const philosophy347 = {
  alignment: {
    number: '3',
    title: 'Alignment',
    subtitle: 'Body · Mind · Spirit',
    body: 'True transformation begins when the three essential dimensions of life are aligned and flow as one.',
    items: [
      { name: 'Body', body: 'The physical foundation — when cared for and relaxed, the mind opens to awareness.' },
      { name: 'Mind', body: 'The centre of thoughts, emotions, and perception — the key to freedom from suffering.' },
      { name: 'Spirit', body: 'The deeper awareness beyond thoughts and emotions — the true nature of being.' },
    ],
  },
  awakening: {
    number: '4',
    title: 'Self-Access',
    subtitle: 'Morality · Mindfulness · Meditation · Wisdom',
    body: 'A four-step path of inner awakening — from a clean life to a free mind.',
    items: [
      { name: 'Morality', body: 'Clean life — the foundation of inner stability.' },
      { name: 'Mindfulness', body: 'Aware mind — observing the present moment with clarity.' },
      { name: 'Meditation', body: 'Stable mind — training awareness to become still and expanded.' },
      { name: 'Wisdom', body: 'Free mind — seeing the true nature of life.' },
    ],
  },
  transformations: {
    number: '7',
    title: 'Life Transformations',
    subtitle: 'A holistic awakening across every dimension of life',
    body: 'When these seven dimensions align, life naturally evolves into clarity, abundance, and purpose.',
    items: [
      { name: 'Health', body: 'Awakening the intelligence of the body.' },
      { name: 'Emotional Balance', body: 'Mastering the inner emotional world.' },
      { name: 'Love & Relationships', body: 'Transforming how we connect with others.' },
      { name: 'Self Development', body: 'Awakening your highest human potential.' },
      { name: 'Soul Work', body: 'Connecting with the deeper dimension of being.' },
      { name: 'Holistic Wealth', body: 'Abundance in every dimension of life.' },
      { name: 'Life Purpose', body: 'Discovering why you are here.' },
    ],
  },
};

// Testimonials
export type Testimonial = { name: string; text: string; time: string };

export const testimonials: Testimonial[] = [
  {
    name: 'Greg G.',
    text: 'Best meditation experience I had in a while, and the best in Thailand. Her approach is really beginner friendly and helps to understand and learn about Meditation. I recommend taking this course if you are in Chiang Mai.',
    time: '3 months ago',
  },
  {
    name: 'Y vdm',
    text: "I've been meditating for six years, but with her, you get so much useful information and practical meditation that you can immediately apply in your daily life. She's a very inspiring woman. Suitable for all levels.",
    time: '5 months ago',
  },
  {
    name: 'Mario Hartwig',
    text: "It is rare to encounter such an open, calming, and healing atmosphere, a space of mindfulness where, through Kaie's empathetic guidance, it becomes possible to find a connection to one's natural origins.",
    time: '8 months ago',
  },
  {
    name: 'Ella Simpson',
    text: 'She has a great approach to meditation and mindfulness and how they can help throughout life. She breaks things down well and I left the session feeling very calm and motivated to maintain a mindfulness practice.',
    time: '3 weeks ago',
  },
  {
    name: 'Todd W.',
    text: 'Very positive experience with Master Kaie. I did the three day retreat and also had the opportunity to do a chanting and sound healing session. I liked the practical personal development focus of the program.',
    time: '2 months ago',
  },
  {
    name: 'Elodie B.',
    text: "If you don't understand why you're not happy, sad, lost... go see her. Every human being should learn and understand this fundamental aspect of Life, because... that's Life!",
    time: '10 months ago',
  },
];

// FAQs
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'What is the best meditation retreat in Chiang Mai?',
    a: 'The 347 Awakening meditation retreat at Srisuphan Silver Temple is one of the most recommended experiences in Chiang Mai, with 5-star Google reviews from over 800 international students from 38+ countries. Led by Master Kaie, it blends Buddhist Vipassana meditation with modern inner coaching — suitable for beginners and experienced practitioners alike.',
  },
  {
    q: 'How much does a meditation retreat in Chiang Mai cost?',
    a: '347 Awakening experiences range from $47 (1,700 THB) for a 3-hour session to $347 (12,500 THB) for a full 3-day retreat. Chanting & Meditation with Master Sawan is 500 THB, and private 1:1 sessions are $77 (2,500 THB). Online packages start at $47.',
  },
  {
    q: 'Do I need meditation experience to join?',
    a: 'Not at all. Our beginner course is designed for complete newcomers — most of our students had never meditated before. Intermediate and advanced options are available for experienced practitioners. Master Kaie adapts every session to your level and intention.',
  },
  {
    q: 'What is Vipassana meditation and is it good for beginners?',
    a: 'Vipassana is an ancient Buddhist insight meditation that develops mindful awareness of body and mind. Yes, it is excellent for beginners — the 347 Awakening method blends Vipassana with practical inner coaching so even first-time meditators can experience profound clarity and calm in their very first session.',
  },
  {
    q: 'Can meditation really help with stress and anxiety?',
    a: 'Yes. Many of our students come seeking relief from stress, anxiety, overthinking, or emotional burnout. Meditation directly calms the nervous system, clears mental clutter, and teaches you to observe thoughts without being controlled by them. Most students report feeling noticeably lighter and more peaceful after just one 3-hour session.',
  },
  {
    q: 'What language is instruction in?',
    a: 'All courses are taught in English by Master Kaie, who has guided over 800 international students from 38+ countries. No Thai language is required.',
  },
  {
    q: 'Where is the retreat located?',
    a: 'We practice at Srisuphan Silver Temple (Wat Sri Suphan) on Wua Lai Road in Chiang Mai Old City, about 15 minutes from Chiang Mai International Airport. It is one of the most sacred and beautiful temples in Chiang Mai, entirely handcrafted in silver.',
  },
  {
    q: 'How do I get to Srisuphan Temple from Chiang Mai Airport?',
    a: 'Srisuphan Temple is about 15 minutes from Chiang Mai International Airport. You can take a Grab taxi, a red songthaew, or a tuk-tuk — all are affordable and readily available. The address is Wua Lai Road, Chiang Mai 50100.',
  },
  {
    q: 'What should I wear to a meditation retreat?',
    a: 'Please wear modest, comfortable clothing — preferably white or light-coloured. Loose pants and a comfortable top work well. We practice sitting, walking, and lying meditation, so comfort and freedom of movement matter more than style.',
  },
  {
    q: "What's included in the price?",
    a: 'All courses include meditation instruction, guided practice, course materials, and tea/water. The Private and Small Group packages also include 1 month of follow-up guidance via WhatsApp or Zoom.',
  },
  {
    q: 'Is accommodation or food included?',
    a: 'Accommodation and meals are not included in the course price. We can recommend affordable guesthouses and vegetarian-friendly restaurants in the Wua Lai neighbourhood. Chiang Mai offers excellent budget-to-luxury options within walking distance.',
  },
  {
    q: 'Can I join the meditation retreat online?',
    a: 'Yes. We offer online sessions via WhatsApp or Zoom for students who cannot visit Chiang Mai in person. Online course packages are available at $47, $97, and $147. Contact us via WhatsApp to arrange a session in your time zone.',
  },
  {
    q: 'Is this a silent retreat or a guided retreat?',
    a: 'Our retreats are guided — Master Kaie teaches, explains, and supports you throughout. We do include periods of silent practice, but you are never left alone without instruction. This makes 347 Awakening far more accessible than traditional 10-day silent retreats.',
  },
  {
    q: 'What is the difference between mindfulness and meditation?',
    a: 'Mindfulness is the quality of present-moment awareness that can be practiced any time. Meditation is the formal training — specific techniques that build and deepen mindfulness. In our 347 method, you learn both: formal meditation technique for the cushion, and mindfulness skills to carry into daily life.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Free cancellation up to 24 hours before your scheduled session. For Private or Group bookings, please notify us 48 hours in advance for a full refund.',
  },
  {
    q: 'How do I book?',
    a: "Simply click any 'Book Now' button to message us on WhatsApp. We'll confirm your date, time, and course. Payment is made in cash or by bank transfer on the day of your session.",
  },
  {
    q: 'What should I wear?',
    a: 'Please wear modest, comfortable clothing — preferably white or light-colored. Loose pants and a comfortable top work well. We practice sitting, walking, and lying meditation.',
  },
];
