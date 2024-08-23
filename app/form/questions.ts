export interface Question {
    text: string;
    type: 'text' | 'textarea' | 'radio' | 'checkbox';
    options?: string[];
    required?: boolean;
  }
  
  export const questions: Question[] = [
    { text: "Name of deceased", type: "text", required: true },
    { text: "Your relation to [name]. They were your…", type: "checkbox", options: ["Father", "Mother", "Sibling", "Grandmother", "Grandfather", "Friend"], required: true },
   { text: "What is your ideal tone for the speech? Select up to 3", type: "checkbox", options: ["Poetic", "Heartfelt", "Light hearted", "Grateful", "Spiritual", "Uplifting", "Solemn"], required: true },
    // { text: "What were [name]’s most notable personality traits?", type: "checkbox", options: ["Kindness", "Loyalty", "Person of faith", "Generosity", "Humor", "Warmth", "Intelligence", "Resilience", "Other: ____"], required: true },
    // { text: "What’s a story where [name] demonstrated one of these qualities?", type: "textarea", required: true },
    // { text: "What were their passions, hobbies, or interests?", type: "textarea", required: true },
    // { text: "What are some of their key accomplishments?", type: "textarea", required: true },
    // { text: "Educational:", type: "textarea", required: false },  
    // { text: "Professional:", type: "textarea", required: false }, 
    // { text: "Raising a family:", type: "textarea", required: false },
    // { text: "Community service:", type: "textarea", required: false }, 
    // { text: "What life lessons did you learn from them?", type: "checkbox", options: ["The importance of perseverance", "The value of kindness", "The strength of love", "The power of positivity", "How to face challenges", "The joy in everyday moments."], required: true },
    // { text: "What is the lasting impact they left on you or the community?", type: "checkbox", options: ["A sense of purpose", "A commitment to service", "A love for life", "Strong family bonds", "A legacy of kindness", "A spirit of resilience", "Artistic inspiration"], required: true },
    // { text: "Please provide the quote or poem you would like included.", type: "textarea", required: false }
  ];