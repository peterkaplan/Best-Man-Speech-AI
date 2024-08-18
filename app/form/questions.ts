export interface Question {
    text: string;
    type: 'text' | 'textarea' | 'radio' | 'checkbox';
    options?: string[];
    required?: boolean;
  }
  
  export const questions: Question[] = [
    { text: "What's your name?", type: "text", required: true },
    { text: "Tell us about your relationship with the groom.", type: "textarea", required: true },
    { text: "How long have you known the groom?", type: "radio", options: ["Less than 5 years", "5-10 years", "More than 10 years"], required: true },
    { text: "What are the groom's best qualities? (Select all that apply)", type: "checkbox", options: ["Funny", "Loyal", "Intelligent", "Kind"], required: true },
  ];
  