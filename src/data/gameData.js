// ── PRO SCOUT ──────────────────────────────────────────────────────────────
export const proScoutProfiles = [
  {
    id: 1,
    name: 'Tyler B.',
    sport: 'Football — Wide Receiver',
    photo: '🏈',
    errors: [
      { id: 'photo', label: 'Unprofessional photo', description: 'Profile picture is a party photo with a red cup.', x: 15, y: 8, found: false },
      { id: 'headline', label: 'Weak headline', description: 'Headline says "Just here vibin\'". Should highlight sport, major, and goals.', x: 10, y: 22, found: false },
      { id: 'spelling', label: 'Spelling error', description: '"Recieved" instead of "Received" in the summary.', x: 60, y: 45, found: false },
      { id: 'missing_skills', label: 'No skills listed', description: 'Skills section is completely empty.', x: 30, y: 68, found: false },
      { id: 'contact', label: 'Missing contact info', description: 'No email or phone listed for recruiters to reach out.', x: 75, y: 80, found: false },
    ],
  },
  {
    id: 2,
    name: 'Mia K.',
    sport: 'Volleyball — Setter',
    photo: '🏐',
    errors: [
      { id: 'bio', label: 'No summary/bio', description: 'About section is blank — missed chance to tell your story.', x: 20, y: 30, found: false },
      { id: 'dates', label: 'Missing dates', description: 'Job experience has no dates — looks incomplete.', x: 55, y: 50, found: false },
      { id: 'vague', label: 'Vague experience', description: '"Worked at a restaurant" — no role, no impact, no detail.', x: 40, y: 65, found: false },
      { id: 'inactive', label: 'Profile marked inactive', description: '"Open to work" banner missing. Recruiters won\'t reach out.', x: 70, y: 15, found: false },
    ],
  },
]

// ── BUDGET BLITZ ────────────────────────────────────────────────────────────
export const budgetScenarios = [
  {
    id: 1,
    scenario: "It's Friday night. Teammates want to hit a $40 steakhouse, but you only have $20 left in your weekly food budget.",
    emoji: '🥩',
    choices: {
      swipeRight: { label: 'Go for it 🎉', tag: 'Treat Yourself', color: 'text-green-400' },
      swipeLeft: { label: 'Pass this time 🙏', tag: 'Stay On Budget', color: 'text-blue-400' },
    },
    rightOutcome: { title: 'Ouch.', message: 'You spent $20 over budget. That\'s groceries for 2 days next week. Small decisions compound.', type: 'warning' },
    leftOutcome: { title: 'Smart play.', message: 'Suggest a $12 taco spot instead. Real friends > expensive restaurants. Budget: protected.', type: 'success' },
  },
  {
    id: 2,
    scenario: "A teammate is selling their old AirPods for $80 — 'a steal.' You have $200 in your account and rent is due in 10 days.",
    emoji: '🎧',
    choices: {
      swipeRight: { label: 'Buy them 🎵', tag: 'Treat Yourself', color: 'text-green-400' },
      swipeLeft: { label: 'Pass', tag: 'Play it Safe', color: 'text-blue-400' },
    },
    rightOutcome: { title: 'Risky move.', message: 'After rent, you\'ll have $120 left for the month. One unexpected expense and you\'re in trouble. Know your obligations first.', type: 'warning' },
    leftOutcome: { title: 'Disciplined.', message: 'After rent, you\'ll have $200. That\'s a real emergency fund. New AirPods can wait — your landlord can\'t.', type: 'success' },
  },
  {
    id: 3,
    scenario: "A fan on social media wants to pay you $500 to post about their supplement brand. No BYU compliance check yet.",
    emoji: '💊',
    choices: {
      swipeRight: { label: 'Post it! 💰', tag: 'Take the Money', color: 'text-green-400' },
      swipeLeft: { label: 'Report to compliance first', tag: 'By the Book', color: 'text-blue-400' },
    },
    rightOutcome: { title: 'RED FLAG.', message: 'Undisclosed NIL deals can cost you eligibility. $500 isn\'t worth your scholarship. Always disclose first.', type: 'danger' },
    leftOutcome: { title: 'Professional.', message: 'Compliance clears it in 48 hours. You still get the $500 AND protect your eligibility. This is how it\'s done.', type: 'success' },
  },
  {
    id: 4,
    scenario: "Credit card offer: 0% APR for 12 months, $1,000 limit. 'Perfect for emergencies.' You have no credit history.",
    emoji: '💳',
    choices: {
      swipeRight: { label: 'Sign up ✍️', tag: 'Build Credit', color: 'text-green-400' },
      swipeLeft: { label: 'Not yet', tag: 'Wait', color: 'text-blue-400' },
    },
    rightOutcome: { title: 'Neutral — depends.', message: 'A secured card is fine IF you pay it off monthly. The danger: using it for non-emergencies. Set a $50/month limit on yourself.', type: 'neutral' },
    leftOutcome: { title: 'Cautious — valid.', message: 'Starting with no debt is smart. But building credit history matters for apartments and jobs. Consider a secured card with a $200 limit when ready.', type: 'neutral' },
  },
  {
    id: 5,
    scenario: "Post-season bonus drops: $400 in your stipend. Teammates are going to Vegas for a weekend trip ($350 total).",
    emoji: '🎰',
    choices: {
      swipeRight: { label: 'Vegas baby! 🎲', tag: 'You Earned It', color: 'text-green-400' },
      swipeLeft: { label: 'Save it', tag: 'Future You', color: 'text-blue-400' },
    },
    rightOutcome: { title: 'You\'re human.', message: 'This one\'s your call — you earned it. But ask: is this aligned with your goals? A $350 Vegas trip vs. $350 toward your first car/apartment?', type: 'neutral' },
    leftOutcome: { title: 'Future you says thanks.', message: 'That $400 in a HYSA at 4.5% APY for 5 years = ~$495. Small saves become real money. But also: celebrate your wins.', type: 'success' },
  },
]

// ── MEDIA MINEFIELD ─────────────────────────────────────────────────────────
export const socialPosts = [
  {
    id: 1,
    user: '@t_johnson22',
    avatar: '🏀',
    time: '2h ago',
    content: "Finally got my bag 💰💰 signed with @SuppBrand for that bread. No cap this hits different when you getting PAID #NIL #StudentAthlete",
    image: null,
    shouldFlag: true,
    reason: 'Undisclosed NIL deal. "Paid" language without proper #ad or #sponsored disclosure violates FTC guidelines and NIL rules.',
    category: 'NIL Compliance',
  },
  {
    id: 2,
    user: '@coachwatch_fan',
    avatar: '👀',
    time: '4h ago',
    content: "Just saw #BYU players at that party last night. Things were WILD 😂🍺 [Photo attached]",
    image: '🎉',
    shouldFlag: true,
    reason: 'Even if YOU didn\'t post this — being identifiable in a photo like this can violate team conduct policies. Report to your compliance office.',
    category: 'Team Conduct',
  },
  {
    id: 3,
    user: '@byufootball_fan',
    avatar: '🏈',
    time: '6h ago',
    content: "Incredible game last night! The team played their hearts out. So proud of these Cougars! #BYU #GoCougars",
    image: null,
    shouldFlag: false,
    reason: null,
    category: null,
  },
  {
    id: 4,
    user: '@athlete_probs',
    avatar: '😤',
    time: '1h ago',
    content: "Can't believe coach pulled me in the 4th. His play calls are trash and everyone knows it. Maybe if he actually watched film... 🙄 #frustrated",
    image: null,
    shouldFlag: true,
    reason: 'Public criticism of coaching staff. Even if frustration is valid — this can damage team relationships and create media headlines. Handle internally.',
    category: 'Team/Brand',
  },
  {
    id: 5,
    user: '@byutrack_star',
    avatar: '🏃',
    time: '3h ago',
    content: "Off-season is HERE. Grateful for the recovery time and my family support. Training for next season starts Monday 💪 #blessed",
    image: null,
    shouldFlag: false,
    reason: null,
    category: null,
  },
  {
    id: 6,
    user: '@sportsbetting_tip',
    avatar: '🎯',
    time: '30m ago',
    content: "Hey @jmichaels_byu DM me the injury report on Williams before tomorrow's game 👀 could be worth $$$",
    image: null,
    shouldFlag: true,
    reason: 'MAJOR RED FLAG. Sharing internal injury information for betting purposes is a violation of NCAA rules and potentially federal law. Report immediately.',
    category: 'Integrity Violation',
  },
]

// ── THE NETWORKER ────────────────────────────────────────────────────────────
export const alumniCards = [
  { id: 'a1', name: 'Marcus Chen', emoji: '💻', industry: 'Tech', hint: 'Software Engineer @ Google', matched: false },
  { id: 'a2', name: 'Sophia Reyes', emoji: '⚖️', industry: 'Law', hint: 'Sports Attorney, LA', matched: false },
  { id: 'a3', name: 'Dr. Priya Patel', emoji: '🏥', industry: 'Health', hint: 'Orthopedic Surgeon, Intermountain', matched: false },
  { id: 'a4', name: 'James Wright', emoji: '📈', industry: 'Finance', hint: 'VP at Morgan Stanley', matched: false },
  { id: 'a5', name: 'Elena Castro', emoji: '🎬', industry: 'Media', hint: 'ESPN Producer', matched: false },
  { id: 'a6', name: 'Noah Kim', emoji: '🏗️', industry: 'Engineering', hint: 'Civil Engineer, Bechtel', matched: false },
]

export const industryCards = [
  { id: 'i1', label: 'Tech', emoji: '💻', matched: false },
  { id: 'i2', label: 'Law', emoji: '⚖️', matched: false },
  { id: 'i3', label: 'Health', emoji: '🏥', matched: false },
  { id: 'i4', label: 'Finance', emoji: '📈', matched: false },
  { id: 'i5', label: 'Media', emoji: '🎬', matched: false },
  { id: 'i6', label: 'Engineering', emoji: '🏗️', matched: false },
]
