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