// Constants
export const MIN_SENTENCES_PER_PARAGRAPH = 3;
export const MAX_SENTENCES_PER_PARAGRAPH = 5;
export const INITIAL_SENTENCES = 5;
export const SENTENCES_INCREMENT = 3;

export const generateWord = (): string => {
  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  const length = Math.floor(Math.random() * 8) + 3; // 3 to 10 characters
  let word = '';
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      word += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      word += vowels[Math.floor(Math.random() * vowels.length)];
    }
  }
  return word;
};

export const generateSentence = (): string => {
  const words = Math.floor(Math.random() * 5) + 3; // 3 to 7 words
  return Array(words).fill(null).map(() => generateWord()).join(' ') + '. ';
};

export const generateTitle = (): string => {
  return "Best Man Speech";
};

export const generateContent = (sentenceCount: number): string => {
  let content = '';
  let sentencesInCurrentParagraph = 0;
  let paragraphLength = Math.floor(Math.random() * (MAX_SENTENCES_PER_PARAGRAPH - MIN_SENTENCES_PER_PARAGRAPH + 1)) + MIN_SENTENCES_PER_PARAGRAPH;

  for (let i = 0; i < sentenceCount; i++) {
    content += generateSentence();
    sentencesInCurrentParagraph++;

    if (sentencesInCurrentParagraph >= paragraphLength && i < sentenceCount - 1) {
      content += '\n\n';
      sentencesInCurrentParagraph = 0;
      paragraphLength = Math.floor(Math.random() * (MAX_SENTENCES_PER_PARAGRAPH - MIN_SENTENCES_PER_PARAGRAPH + 1)) + MIN_SENTENCES_PER_PARAGRAPH;
    }
  }

  return content.trim();
};