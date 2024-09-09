import { expect, test } from 'vitest';
import { mergeSpeechData } from './route'; // Adjust the import path as needed

test('mergeSpeechData correctly merges speech format with form data', () => {
  const mockSpeechFormat = `
START BEST MAN SPEECH FORMAT TO FOLLOW:
{format_placeholder}
END BEST MAN SPEECH FORMAT TO FOLLOW

START STORIES & FACTS ABOUT {name}
[FACTSANDSTORIES]

I want you to follow the BEST MAN SPEECH FORMAT to produce a best man speech for: {name} and {partner name} use the details from the stories and facts sections. DO NOT use examples from the example speeches or I will be fired. 

Output the FULL speech and ONLY the speech. 
`;

  const mockFormData = {
    '0': { shortName: 'groomName', answer: 'Peter' },
    '1': { shortName: 'knownDuration', answer: '10 years' },
    '2': { shortName: 'howMet', answer: 'At university' },
    '3': { shortName: 'bestQualities', answer: ['Loyal', 'Funny'] },
    '4': { shortName: 'funnyStory', answer: 'That time we got lost in Paris' },
    '5': { shortName: 'biggestAccomplishment', answer: 'Started his own company' },
    '6': { shortName: 'changeSincePartner', answer: 'Hes more organized now' },
    '7': { shortName: 'admiration', answer: 'Their ability to communicate' },
    '8': { shortName: 'marriageAdvice', answer: 'Always make time for date nights' },
    '9': { shortName: 'additionalNotes', answer: 'Hes an amazing cook' }
  };

  const result = mergeSpeechData(mockSpeechFormat, mockFormData);

  console.log(result); // This will help us see the full output

  // Check if the groom's name is correctly inserted
  expect(result).toContain('Peter');

  // Check if all form data is included in the result
  expect(result).toContain('10 years');
  expect(result).toContain('At university');
  expect(result).toContain('Loyal, Funny');
  expect(result).toContain('That time we got lost in Paris');
  expect(result).toContain('Started his own company');
  expect(result).toContain('Hes more organized now');
  expect(result).toContain('Their ability to communicate');
  expect(result).toContain('Always make time for date nights');
  expect(result).toContain('Hes an amazing cook');

  // Check if the structure is maintained
  expect(result).toContain('START BEST MAN SPEECH FORMAT TO FOLLOW:');
  expect(result).toContain('END BEST MAN SPEECH FORMAT TO FOLLOW');
  expect(result).toContain('START STORIES & FACTS ABOUT Peter');

  // Check that the [FACTSANDSTORIES] placeholder has been replaced
  expect(result).not.toContain('[FACTSANDSTORIES]');
});