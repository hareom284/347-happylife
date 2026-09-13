// Contact & social links
export const wa = 'https://wa.me/66944265297';
export const email = '347happylifehappyworld@gmail.com';

// Primary navigation
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'The Method', href: '/method' },
  { label: 'Programs', href: '/programs' },
  { label: 'Retreats', href: '/programs#retreats' },
  { label: 'Membership', href: '/membership' },
  { label: 'Journal', href: '/blog/best-meditation-retreat-chiang-mai' },
  { label: 'Contact', href: '/contact' },
];

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

// ===== Homepage content =====

// The 347 Method overview cards (homepage) — 3 Alignment · 4 Awakening · 7 Life Transformation
export const methodPillars = [
  {
    num: '3', title: 'Alignment', icon: 'leaf',
    body: 'Align body, mind, and spirit so the three essential dimensions of life flow as one.',
    href: '/method#alignment',
  },
  {
    num: '4', title: 'Awakening', icon: 'lotus',
    body: 'A four-step path — Morality, Mindfulness, Meditation, Wisdom — from a clean life to a free mind.',
    href: '/method#awakening',
  },
  {
    num: '7', title: 'Life Transformation', icon: 'sun',
    body: 'When seven dimensions of life align, life naturally evolves into clarity, abundance, and purpose.',
    href: '/method#transformation',
  },
];

// Instructors (spec: INSTRUCTORS section — Master Swan & Master Kaie)
export const instructors = [
  {
    name: 'Master Swan',
    img: '/images/master-sawan.webp',
    role: '',
    blurb:
      'A consciousness teacher and meditation guide dedicated to helping people awaken inner wisdom, emotional healing, and spiritual clarity.',
    specialties: ['Chanting & Meditation', 'Consciousness awakening', 'Spiritual guidance', 'Emotional transformation'],
  },
  {
    name: 'Master Kaie',
    img: '/images/master-kaie-320.webp',
    role: 'Founder of 347 Awakening · Happy Life Happy World',
    blurb:
      'Master Kaie combines mindfulness, healing, consciousness work, and transformational coaching to guide people toward authentic happiness and meaningful living.',
    specialties: ['Conscious leadership', 'Emotional healing', 'Mindfulness coaching', 'Life transformation', 'Spiritual awakening'],
  },
];

// "Find the Path for You" program cards
type PathCard = {
  title: string;
  img: string;
  imgSrcset?: string;
  width?: number;
  height?: number;
  body: string;
  cta: string;
  href: string;
};

export const pathCards: PathCard[] = [
  {
    title: 'On-Site Courses', img: '/images/retreat-photo-3-400.webp',
    imgSrcset: '/images/retreat-photo-3-400.webp 400w, /images/retreat-photo-3.webp 600w',
    width: 400, height: 177,
    body: 'Guided meditation and awakening experiences at the Silver Temple in Chiang Mai.',
    cta: 'Explore', href: '/programs#onsite',
  },
  {
    title: 'Online Courses', img: '/images/retreat-meditation-400.webp',
    imgSrcset: '/images/retreat-meditation-400.webp 400w, /images/retreat-meditation.webp 600w',
    width: 400, height: 537,
    body: 'Guided courses for personal growth and awakening from anywhere in the world.',
    cta: 'Explore', href: '/programs#online',
  },
  {
    title: 'Retreats', img: '/images/retreat-photo-2-480.webp',
    imgSrcset: '/images/retreat-photo-2-480.webp 480w, /images/retreat-photo-2.webp 600w',
    width: 480, height: 282,
    body: 'Immersive retreats in Chiang Mai for deep healing and awakening.',
    cta: 'View Retreats', href: '/programs#retreats',
  },
  {
    title: 'Private Mentoring', img: '/images/mentoring-session-800.webp',
    imgSrcset: '/images/mentoring-session-400.webp 400w, /images/mentoring-session-800.webp 800w, /images/mentoring-session-1280.webp 1280w, /images/mentoring-session-1600.webp 1600w',
    width: 800, height: 534,
    body: 'Receive personalized guidance and support for your transformation.',
    cta: 'Apply Now', href: '/programs#mentoring',
  },
  {
    title: 'Membership', img: '/images/community-circle-800.webp',
    imgSrcset: '/images/community-circle-400.webp 400w, /images/community-circle-800.webp 800w, /images/community-circle-1280.webp 1280w, /images/community-circle-1600.webp 1600w',
    width: 800, height: 450,
    body: 'Join our global community and grow together every day.',
    cta: 'Learn More', href: '/membership',
  },
];

// "A Journey Back to Yourself" retreat feature chips
export const retreatFeatures = ['Meditation', 'Healing', 'Nature', 'Conscious Living', 'Inner Connection'];

// ===== About page content =====
export const mission =
  'To help humanity awaken consciousness, heal from within, and create a peaceful world through inner transformation.';

export const homeIntro =
  '347 Awakening is a transformational journey designed to help people reconnect with their inner wisdom, emotional balance, purpose, and consciousness through meditation, mindfulness, healing, and spiritual awakening.';

export const problemPoints = [
  'Mentally exhausted',
  'Emotionally overwhelmed',
  'Spiritually disconnected',
  'Living without meaning',
  'Searching for happiness outside themselves',
];

export const threePowerfulQuestions = [
  { n: '1', q: 'Who Am I?', body: 'Beyond your name, career, status, and identity… who are you truly?' },
  { n: '2', q: 'Why Was I Born on This Earth?', body: 'Every human being has a unique purpose, gift, and reason for existence.' },
  { n: '3', q: 'What Is My Mission?', body: 'How can we use our life to create meaning, happiness, and positive impact for the world?' },
];

export const gpsHappiness = [
  { letter: 'G', title: 'Gratitude', body: 'Living with appreciation, humility, and gratitude for life.' },
  { letter: 'P', title: 'Presence', body: 'Being fully aware and mindful in the present moment.' },
  { letter: 'S', title: 'Service', body: 'Using our life, gifts, and consciousness to serve others and create a better world.' },
];

export const silverTemple = {
  title: 'The Silver Temple & GPS Happiness',
  body: 'Wat Sri Suphan, the "Silver Temple," is one of the most spiritually beautiful temples in Chiang Mai, Thailand. With a history of more than 500 years, it is renowned for its magnificent silver ordination hall. For 347 Awakening, the Silver Temple represents the symbol of inner awakening — the Silver Temple within every human being. In its silence and sacred atmosphere, people reconnect with inner peace, clarity of life, emotional balance, and true happiness from within.',
};

// ===== The Method page (347 framework, full) =====
export const methodAlignment = {
  num: '3', title: 'Alignment', subtitle: 'Body · Mind · Spirit',
  intro: 'True transformation begins when the three essential dimensions of life align and flow as one.',
  items: [
    { name: 'Body Alignment', body: 'Healing the body through breath, movement, nutrition, rest, and energy balance.' },
    { name: 'Mind Alignment', body: 'Transforming thoughts, emotions, beliefs, and mental patterns.' },
    { name: 'Spirit Alignment', body: 'Connecting with consciousness, intuition, inner peace, and higher purpose.' },
  ],
};

export const methodAwakening = {
  num: '4', title: 'Awakening', subtitle: 'Morality · Mindfulness · Meditation · Wisdom',
  intro: 'A four-step path of inner awakening — from a clean life to a free mind.',
  items: [
    { name: 'Morality', body: 'Living with integrity, compassion, and conscious responsibility.' },
    { name: 'Mindfulness', body: 'Developing awareness in daily life and the present moment.' },
    { name: 'Meditation', body: 'Cultivating inner silence, clarity, and emotional healing.' },
    { name: 'Wisdom', body: 'Understanding life deeply beyond fear, ego, and suffering.' },
  ],
};

export const methodTransformation = {
  num: '7', title: 'Life Transformation',
  intro: 'When these seven dimensions align, life naturally evolves into clarity, abundance, and purpose.',
  items: [
    { name: 'Health', body: 'Vitality, energy, and holistic wellbeing.' },
    { name: 'Emotional Balance', body: 'Inner stability, healing, and peace.' },
    { name: 'Love & Relationship', body: 'Conscious communication and heart connection.' },
    { name: 'Self Development', body: 'Growth, confidence, and leadership.' },
    { name: 'Soul Work', body: 'Living aligned with your soul and authentic self.' },
    { name: 'Holistic Wealth', body: 'Abundance in health, relationships, purpose, and finances.' },
    { name: 'Life Purpose', body: 'Discovering and living your mission on Earth.' },
  ],
};

// ===== Programs page content =====
export type ProgramPrice = {
  thb: string;
  usd: string;
  display: string;
};

export type MentoringPrice = {
  label: string;
  usd: string;
  display: string;
};

const price = (thb: string, usd: string): ProgramPrice => ({
  thb: `THB ${thb}`,
  usd: `USD ${usd}`,
  display: `THB ${thb} / USD ${usd}`,
});

const mentoringPrice = (label: string, usd: string): MentoringPrice => ({
  label,
  usd: `USD ${usd}`,
  display: `THB pricing on request / USD ${usd}`,
});

export const onSiteExperiences = [
  { title: '347 Alignment Experience', dur: '3 Hours', price: price('1,500', '47'), tagline: 'Align Body, Mind & Spirit',
    body: 'A guided experience to align body, mind, and spirit and reconnect with inner peace and clarity.' },
  { title: '347 Awakening Experience', dur: '3 Hours', price: price('2,500', '77'), tagline: 'Awaken Your Inner Wisdom',
    body: 'A deeper guided experience to develop awareness, release emotional stress, and reconnect with your true self.' },
  { title: '347 Life Transformation Experience', dur: '3 Hours', price: price('3,500', '111'), tagline: 'Transform Your Way of Living',
    body: 'An immersive session for emotional healing, inner awakening, and conscious life transformation.' },
  { title: '347 Awakening Journey', dur: '1 Day', price: price('7,000', '219'), tagline: 'A Full Day of Awakening',
    body: 'A full-day journey through meditation, healing, and conscious living to create lasting inner transformation.' },
];

export const onlineCourses = [
  { name: '347 Awakening Starter Program', price: price('800', '27'), tagline: 'Calm Your Mind & Reconnect Yourself',
    duration: '1.5 Hours · 1 Live Online Session',
    learn: ['Quiet the busy mind', 'Basic awakening meditation', 'Breath & energy awareness', 'Emotional reset techniques', 'Daily 10-minute routine'],
    includes: ['Live Zoom Session', 'Guided Meditation Audio', 'Reflection Workbook PDF'], featured: false },
  { name: '347 Deep Awakening Program', price: price('2,500', '77'), tagline: 'Break Inner Blocks & Transform Your Energy',
    duration: '3 Hours · 2 Live Sessions (90 min each)',
    learn: ['Deep emotional release meditation', 'Understanding subconscious patterns', 'Energy balancing', 'Reconnect with purpose', 'Confidence & abundance'],
    includes: ['2 Live Zoom Sessions', 'Guided Meditation Audio Pack', 'Self-Discovery Worksheet', 'Private Community Access'], featured: true },
  { name: '347 Premium Life Transformation Program', price: price('7,000', '219'), tagline: 'Awaken Your True Self & Transform Your Life',
    duration: '6 Hours · 4 Live Sessions (90 min each)',
    learn: ['Advanced awakening meditation', 'Mind-body-spirit alignment', 'Healing trauma patterns', 'Finding life mission', 'Inner peace with success', 'Conscious living'],
    includes: ['4 Premium Live Sessions', 'Personal Meditation Guidance', 'Energy Alignment Practice', 'Life Mission Assessment', 'VIP Private Support', 'Certificate of Completion'], featured: false },
];

export const retreatOptions = [
  { duration: '1 day', price: price('7,000', '219') },
  { duration: '2 days', price: price('12,000', '347') },
  { duration: '3 days', price: price('15,000', '477') },
];

export const mentoringPrograms = [
  { name: '347 Clarity Session', tagline: 'One Session Can Change Your Direction.', duration: '90 Minutes',
    includes: ['1:1 Private Mentoring', 'Emotional Clearing', 'Consciousness Guidance', 'Personalized Insight'],
    pricing: [mentoringPrice('Online', '147'), mentoringPrice('In-Person', '197')] },
  { name: '347 Inner Reset Mentoring', tagline: 'Reset Your Energy. Reconnect with Your True Self.', duration: '1 Month',
    includes: ['4 Private Sessions', 'Meditation Guidance', 'Emotional & Energy Reset', 'Weekly Personal Practice', 'WhatsApp / LINE Support'],
    pricing: [mentoringPrice('Online', '888'), mentoringPrice('VIP In-Person', '1,200')] },
  { name: '347 Conscious Leadership Mentoring', tagline: 'Success Without Inner Suffering.', duration: '2 Months',
    includes: ['8 Private Sessions', 'Mind Reprogramming', 'Emotional Mastery', 'Business + Life Alignment', 'Voice Message Support', 'Private Meditation Library'],
    pricing: [mentoringPrice('Online', '2,500'), mentoringPrice('VIP Private', '3,500')] },
];

export const programCategories = [
  { title: 'On-Site — Chiang Mai', body: 'Experience meditation, healing, and conscious living in a peaceful sanctuary in Chiang Mai.', href: '#onsite' },
  { title: 'Online Programs', body: 'Transform your life through guided meditations and online consciousness courses from anywhere in the world.', href: '#online' },
  { title: 'Retreats', body: 'Deep awakening and healing retreats designed for inner transformation and renewal.', href: '#retreats' },
  { title: 'Private Mentoring', body: 'Personalized 1:1 guidance for emotional healing, conscious leadership, and life transformation.', href: '#mentoring' },
];

// ===== Membership & Contact page content =====
export const membership = {
  name: '347 Inner Circle™ Essential',
  blurb: 'A global conscious community for ongoing growth, healing, and awakening.',
  priceMonth: '$27', priceMonthUnit: '/ month',
  priceYear: '$270', priceYearUnit: '/ year',
  includes: [
    'Weekly Group Meditation',
    'Monthly Consciousness Workshop',
    'Private Community Access',
    'Emotional Healing Sharing Circle',
    'Inspirational Teachings & Practices',
    'Global Conscious Community',
  ],
  perfectFor: 'People seeking peace, emotional healing, and spiritual connection.',
};

export const volunteer = {
  blurb: '347 Awakening is more than a program. It is a global mission to create a happier and more conscious world.',
  roles: ['Meditation', 'Healing', 'Conscious living', 'Community service', 'Event support', 'Content creation', 'Global impact'],
};

export const collaboration = ['Retreat partners', 'Wellness centers', 'Conscious leaders', 'Volunteers', 'Global ambassadors'];

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
    a: 'The 347 Awakening meditation retreat at Silver Temple is one of the most recommended experiences in Chiang Mai, with 5-star Google reviews from over 800 international students from 38+ countries. Led by Master Kaie, it blends Buddhist Vipassana meditation with modern inner coaching — suitable for beginners and experienced practitioners alike.',
  },
  {
    q: 'How much does a meditation retreat in Chiang Mai cost?',
    a: '347 Awakening online programs are THB 800 / USD 27 (Starter), THB 2,500 / USD 77 (Deep Awakening), and THB 7,000 / USD 219 (Premium Life Transformation). On-site experiences in Chiang Mai range from the 3-hour Alignment Experience at THB 1,500 / USD 47 to the 1-day Awakening Journey at THB 7,000 / USD 219. Retreats are available for 1 day at THB 7,000 / USD 219, 2 days at THB 12,000 / USD 347, or 3 days at THB 15,000 / USD 477. Private 1:1 mentoring details are available by request, and Inner Circle membership is $27/month or $270/year.',
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
    a: 'We practice at Silver Temple (Wat Sri Suphan) on Wua Lai Road in Chiang Mai Old City, about 15 minutes from Chiang Mai International Airport. It is one of the most sacred and beautiful temples in Chiang Mai, entirely handcrafted in silver.',
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
    a: 'Yes. We offer online sessions via WhatsApp or Zoom for students who cannot visit Chiang Mai in person. Online course packages are available at THB 800 / USD 27, THB 2,500 / USD 77, and THB 7,000 / USD 219. Contact us via WhatsApp to arrange a session in your time zone.',
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
];
