export const CAREERS_ROLES = [
  {
    id: "amharic-language-professional",
    title: "Amharic language professional",
    location: "Remote · Horn & diaspora",
    blurb:
      "Help us ship Amharic the way Afaan Oromo shipped: native conversation, teacher-validated speaking, and real video—not flashcards.",
  },
  {
    id: "tigrinya-language-professional",
    title: "Tigrinya language professional",
    location: "Remote · Horn & diaspora",
    blurb:
      "Build Tigrinya speaking lessons with native speakers and educators so learners can talk with family, not memorize a deck.",
  },
  {
    id: "language-professional",
    title: "Language professional",
    location: "Remote · curriculum & review",
    blurb:
      "Work across Horn languages on conversation scripts, teacher review, and quality—so every lesson sounds like how people actually speak.",
  },
  {
    id: "social-media-manager",
    title: "Social media manager",
    location: "Remote · Instagram & TikTok",
    blurb:
      "Run @dubbadhu.app. Show speaking-first learning, upcoming Amharic and Tigrinya, and the diaspora story without turning the brand into generic language-app ads.",
  },
  {
    id: "project-manager",
    title: "Project manager",
    location: "Remote · product & languages",
    blurb:
      "Keep Amharic, Tigrinya, and language work on schedule: teachers, video, review, and ship dates. Coordinate the team so speaking lessons actually land.",
  },
];

export const CAREERS_TRACKS = [
  {
    title: "Languages",
    body: "Amharic, Tigrinya, and a language professional who can write and review native conversation—the same speaking-first path as Afaan Oromo.",
  },
  {
    title: "Product",
    body: "A project manager who keeps teachers, video, review, and ship dates moving so the next languages actually launch.",
  },
  {
    title: "Story",
    body: "A social media manager for Instagram and TikTok—@dubbadhu.app—who can show speaking, not generic language-app ads.",
  },
];

export const CAREER_CONTACT_METHODS = [
  { id: "email", label: "Email" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "telegram", label: "Telegram" },
  { id: "phone", label: "Phone" },
];

export function careerRoleById(id) {
  return CAREERS_ROLES.find((role) => role.id === id) || null;
}
