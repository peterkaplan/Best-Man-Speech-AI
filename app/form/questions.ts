export interface Question {
  text: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox';
  options?: string[];
  required?: boolean;
  shortName: string;
  allowCustom?: boolean;
  /**
   * Open-ended questions people get stuck on ("tell me a funny story") can be
   * skipped so they don't abandon the form. The names and basic facts can't be -
   * the speech falls apart without them.
   */
  skippable?: boolean;
  /** Reassurance shown under the question - lowers the bar for answering. */
  hint?: string;
  /** Memory-joggers shown as chips, for questions that stare back blankly. */
  prompts?: string[];
  placeholder?: string;
}

/**
 * The first CORE_QUESTION_COUNT questions are everything a speech actually
 * needs. After them the user hits a checkpoint and can either finish or answer
 * the remaining "bonus" questions for a more personalized speech.
 *
 * The order of `questions` is load-bearing: the prompt reads answers by index,
 * so questions can't be reordered without updating mergeSpeechData.
 */
export const CORE_QUESTION_COUNT = 7;

export const questions: Question[] = [
  { text: "What's the name of the groom?", type: "text", required: true, shortName: "groomName" },
  { text: "What's the name of the groom's partner?", type: "text", required: true, shortName: "partnerName" },
  { text: "What is your name?", type: "text", required: true, shortName: "yourName" },
  { text: "How long have you known [name]?", type: "text", required: true, shortName: "knownDuration" },
  { text: "How did you and [name] meet?", type: "textarea", required: true, shortName: "howMet", skippable: true },
  {
    text: "What are [name]'s best qualities?",
    type: "checkbox",
    options: ["Loyal", "Funny", "Intelligent", "Adventurous", "Dependable"],
    required: true,
    shortName: "bestQualities",
    allowCustom: true
  },
  // Deliberately not "share a funny story" - being asked to be funny on demand
  // is the single hardest question in the form and where people give up. Ask
  // for a memory instead and let the model find the comedy in it.
  {
    text: "Tell us about a moment with [name] you still bring up",
    type: "textarea",
    required: true,
    shortName: "funnyStory",
    skippable: true,
    hint: "It doesn't have to be funny - that's our job. A few messy details beat a polished story.",
    prompts: [
      "A trip that went sideways",
      "Something he's obsessed with",
      "A running joke about him",
      "The dumbest thing you two did",
      "How he was when you met",
      "A time he showed up for you"
    ],
    placeholder: "Two or three sentences is plenty..."
  },
  {
    text: "What's [name]'s biggest accomplishment (besides getting married)?",
    type: "textarea",
    required: true,
    shortName: "biggestAccomplishment",
    skippable: true,
    hint: "It doesn't have to be a career thing. What are you actually proud of him for?",
    prompts: [
      "A job he worked hard for",
      "Something he built or fixed",
      "A goal he stuck with",
      "Getting through a rough year",
      "A skill he taught himself",
      "How far he's come"
    ],
    placeholder: "A sentence or two is plenty..."
  },
  {
    text: "How has [name] changed since meeting his partner?",
    type: "textarea",
    required: true,
    shortName: "changeSincePartner",
    skippable: true,
    hint: "Small stuff works best here - the tiny changes get the biggest laughs.",
    prompts: [
      "Habits that quietly vanished",
      "A hobby he'd never admit to",
      "He's calmer these days",
      "His place is suddenly tidy",
      "How he talks about the future",
      "What your friends noticed"
    ],
    placeholder: "Even one small change works..."
  },
  {
    text: "What do you admire most about [name] and his partner's relationship?",
    type: "textarea",
    required: true,
    shortName: "admiration",
    skippable: true,
    hint: "No big statement needed - just what you notice when they're together.",
    prompts: [
      "How they are in a room together",
      "The way they wind each other up",
      "How they handled something hard",
      "They genuinely like each other",
      "How welcome they made you feel",
      "What [name] is like around them"
    ],
    placeholder: "What you notice when they're together..."
  },
  {
    text: "What advice would you give to [name] for a happy marriage?",
    type: "textarea",
    required: true,
    shortName: "marriageAdvice",
    skippable: true,
    hint: "Jokes very welcome. So is one honest line.",
    prompts: [
      "Something your parents got right",
      "Never go to bed angry",
      "Let them pick the film",
      "Keep saying yes to each other",
      "Advice he'll ignore anyway",
      "What you'd tell your younger self"
    ],
    placeholder: "One line is enough..."
  },
  {
    text: "Is there anything else you'd like to include in the speech about [name]?",
    type: "textarea",
    required: false,
    shortName: "additionalNotes",
    hint: "Anything we missed - and anything we should steer well clear of.",
    prompts: [
      "An inside joke to work in",
      "Someone to thank or mention",
      "A nickname he's stuck with",
      "Something to definitely avoid",
      "How you want to end it",
      "A line he'd love"
    ],
    placeholder: "Optional - anything we haven't asked about..."
  }
];