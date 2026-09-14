export const CAREERS_ROLES = [
  {
    id: "amharic-language-professional",
    title: "Amharic language professional",
    location: "Part-time · Remote · Horn & diaspora",
    blurb:
      "Help us ship Amharic the way Afaan Oromo shipped: native conversation, teacher-validated speaking, and real video—not flashcards.",
  },
  {
    id: "tigrinya-language-professional",
    title: "Tigrinya language professional",
    location: "Part-time · Remote · Horn & diaspora",
    blurb:
      "Build Tigrinya speaking lessons with native speakers and educators so learners can talk with family, not memorize a deck.",
  },
  {
    id: "learning-and-development-researcher",
    title: "Learning and Development researcher",
    location: "Part-time · Remote · curriculum & research",
    blurb:
      "Research how learners speak and stick with Horn languages—inform conversation lessons, practice design, and quality so every series feels teachable and real.",
  },
  {
    id: "social-media-manager",
    title: "Social media manager",
    location: "Part-time · Remote · Instagram & TikTok",
    blurb:
      "Run @dubbadhu.app. Show speaking-first learning, upcoming Amharic and Tigrinya, and the diaspora story without turning the brand into generic language-app ads.",
  },
  {
    id: "project-manager",
    title: "Project manager",
    location: "Part-time · Remote · product & languages",
    blurb:
      "Keep Amharic, Tigrinya, and language work on schedule: teachers, video, review, and ship dates. Coordinate the team so speaking lessons actually land.",
  },
];

/** Old apply URLs still resolve. */
const ROLE_ALIASES = {
  "language-professional": "learning-and-development-researcher",
};

export const CAREERS_TRACKS = [
  {
    title: "Languages",
    body: "Amharic and Tigrinya language professionals, plus Learning and Development research—so speaking lessons stay native, teachable, and real.",
  },
  {
    title: "Product",
    body: "A part-time project manager who keeps teachers, video, review, and ship dates moving so the next languages actually launch.",
  },
  {
    title: "Story",
    body: "A part-time social media manager for Instagram and TikTok—@dubbadhu.app—who can show speaking, not generic language-app ads.",
  },
];

export const CAREER_CONTACT_METHODS = [
  { id: "email", label: "Email" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "telegram", label: "Telegram" },
  { id: "phone", label: "Phone" },
];

export function careerRoleById(id) {
  const resolved = ROLE_ALIASES[id] || id;
  return CAREERS_ROLES.find((role) => role.id === resolved) || null;
}
