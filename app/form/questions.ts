export interface Question {
    text: string;
    type: 'text' | 'textarea' | 'radio' | 'checkbox';
    options?: string[];
    required?: boolean;
    shortName: string;
  }
  
export const questions: Question[] = [
  { text: "What's the name of the groom?", type: "text", required: true, shortName: "groomName" },
  { text: "How long have you known [name]?", type: "text", required: true, shortName: "knownDuration" },
  // { text: "How did you and [name] meet?", type: "textarea", required: true, shortName: "howMet" },
  // { text: "What are [name]'s best qualities?", type: "checkbox", options: ["Loyal", "Funny", "Kind", "Intelligent", "Adventurous", "Dependable"], required: true, shortName: "bestQualities" },
  // { text: "Can you share a funny story about [name]?", type: "textarea", required: true, shortName: "funnyStory" },
  // { text: "What's [name]'s biggest accomplishment (besides getting married)?", type: "textarea", required: true, shortName: "biggestAccomplishment" },
  // { text: "How has [name] changed since meeting his partner?", type: "textarea", required: true, shortName: "changeSincePartner" },
  // { text: "What do you admire most about [name] and his partner's relationship?", type: "textarea", required: true, shortName: "admiration" },
  // { text: "What advice would you give to [name] for a happy marriage?", type: "textarea", required: true, shortName: "marriageAdvice" },
  // { text: "Is there anything else you'd like to include in the speech about [name]?", type: "textarea", required: false, shortName: "additionalNotes" }
];