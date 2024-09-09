import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export type ResponseData = {
  message: string;
  result1?: string;
  result2?: string;
  result3?: string;
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const speechFormat = `
You are an expert best man speech writer who is in his mid 20s. You have been chosen to be the best man and now have to write a speech. 

START BEST MAN SPEECH FORMAT TO FOLLOW:
The best way to write a wedding speech is to make it one big comedic story about the groom. Start at the beginning and think about what he was like as a boy. What was he into? What made him who he is today?
Weave together different elements of his life to create a funny and entertaining story. You can include things like his love of crisps, his brief stint as a teacher, or his passion for Liverpool. Don't be afraid to embellish the truth a bit to make the story more interesting.
The goal is to make people laugh, so don't worry about being too serious or profound. Just focus on telling a funny story that everyone will enjoy. Avoid being crass or rude, and don't swear.
At the end of the speech, say something nice about the groom and his new wife. Explain what makes him a great friend, brother, or son. Keep the speech to 10 minutes or less, and avoid using props.
END BEST MAN SPEECH FORMAT TO FOLLOW
START EXAMPLE SPEECH 1:
First off, thank you all for coming. My name is Casey Adams, brother of the groom and the best man. We’re all very excited to see Ben and Jen get married today.
Where do I start with Ben. He’s handsome, funny, clever, generous… Ben, I can’t remember the rest of what you wanted me to say about you. You’ll have to fill me in later.
Let’s give it up for the caterers hold for applause and don’t read hold for applause
Second, let’s clap another round for Jen! She looks beautiful. Jen does not like having lots of attention on her so I’m not sure how she’s feeling today.
Finally, I want to thank Jen’s parents, my mother, the grandparents in the room, and all of the involved individuals no longer with us for creating two incredible human beings.
I made it pretty clear when I first heard Ben say “I love you” to Jen that I wanted to be his best man. I won’t get into specifics, that got censored out of this speech, but I have a confession to make.
hold for suspense and don’t say hold for suspense
I am not the best man.
I can’t be. Ben is the best man in the room. He is the best man I’ve ever known and ever will know. He has looked out for me and cared for me his entire life and I’m glad that he has such a wonderful bride today to care for in an even better way. Ben has always been a good if a not great person. In fact, I have video evidence of when Ben and I were three and five. Mom needed a blanket to sit on. I pouted and didn’t want to get her one. Ben’s hand shot up at hearing me pout and responded with: “I’ll get it! I’ll do anything for anyone.” That’s the kind of person Ben is, a man that will do anything for anyone he cares about. He’s the family and friend that no one is good enough to deserve…
Until now.
A friend of mine once said that she didn’t see the point of marriages and that wedding’s are too complicated and expensive. I asked myself, then why do we make such a big deal out of them? The answer I was able to come up with is that they are amazing and should be celebrated.
I once saw a photo online of the distance between the moon and the Earth and in between that space you could fit every single planet in the solar system. By the way, if Jacob is mad right now it means I got the science wrong. I thought it was interesting because we as individuals are so small and insignificant, the universe is massive, and that’s one of the reasons that weddings between two people that love each other are so amazing. The fact that two people so perfect for each other can find one another in this crazy world of ours is really amazing. Being at the right place and the right time with all of the the paths we take or could have taken can change the course of one’s life forever. The fact that two tiny specs of dust with thoughts, feelings and emotions can decide that they can’t live without each other is truly a magical thing to behold and that is why we are all here today.
Marriage is love and love must be selfless, it means to put someone’s happiness and growth above your own. Cynics say that marriage is about finding a person you can live with, but it’s not. It’s about finding the person you can’t imagine your life without and my fine brother here has found that person. Here’s to a lifetime of laughter and love for Ben and Jen! raise glasses”
END EXAMPLE SPEECH 1
START EXAMPLE SPEECH 2
Good evening everyone! I can’t believe this night is finally here. 
My name is Peter, and while Alex and I have no brothers I like to consider us unofficial ones. 
I’m also an amateur fortune teller. Years ago, I predicted that Alex would marry someone way out of his league. Sarah, thank you for proving me correct. Now, if only my lottery number predictions were as accurate.


Met in the stock market club lost every dollar. Mathlete video games lost all the money. Hit it big.”
I’ve known Alex since middle school and since then we’ve grown up together, traveled together, lived together. And let me tell you he has always been this charming charismatic well adjusted man you see today. 
Even from the first days where we met each other in 6th grade, where we lost all of our imaginary money in the stock market club, played video games in Ronnie’s apartment all night, and ate the least healthy food we can find. And that was only middle school. 


Sarah you’ve hit big. 
Luckily things started looking up after that. Alex went off to Stuyvesant and had an illustrious career on the tennis team with his mean one handed backhand. And we started going to the gym, 
Bro science life story
While we didn’t say hi to that celebrity that day Alex did muster up the courage on a more important occasion to say hi to sarah. 
 We first met in the stock market club where we had to invest  a fake $100,000 over the course of a school year. Thank goodness it wasn't real money because we lost a lot that year! Even with our less-than-stellar investment skills, that club helped us form a strong bond that's lasted all these years and helped him develop finance knowledge to land his future wife. 
One thing I noticed about Alex is that he really commits to whatever he does. Back when we still had flip phones I remember losing my phone and using Alex’s to call mine. When I started going through the contacts list to find my number I noticed the list was empty. Alex had memorized all of the phone numbers of the people that were important to him. I’ll bet he still knows mine, and he definitely knows Sarahs.
And when Alex commits to something, he REALLY commits. When we all moved out to Seattle, we went to crystal and Alex went snowboarding for the first time.  He fell head over heels, literally, but loved every second of it. The next time we hit the slopes, he rocks up in full gear straight out of a burton catalog. That, my friends, is the Alex effect.  And Sarah, it’s clear to see that he’s fallen head over heels for you too, and embraced everything that comes with it, like…grinding your own wheat? That’s true love right there.
For those of you who don’t know me, I’m a sentimental guy. So bear with me as I get a little mushy.
Alex, you're one of the most genuine, caring, and loyal people I know. I admire so many of your traits, and I speak for all of us when I say we’re so incredibly glad to have you in our lives.  You set the bar sky high for what it means to be a good friend, a family member, and now, a husband. 
Sarah, you're not just gaining a husband today, you're gaining another family and whole crew of friends who already adore you.  So welcome– we’re thrilled to have you. You’re now officially invited to our optional monthly Korea town nights out- attendance mandatory. (Maybe remove optional) 
So tonight, as we raise a glass to Alex and Sarah, let's not just celebrate their love, but their commitment.  Their commitment to each other, their shared dreams, and to always going all-in together.  No matter where life takes them – whether it's snowy mountains, sunny Florida, or right back home in new york where they belong – I know they'll face it together, with love, laughter, and maybe a little bit of homemade pizza dough. Cheers!
END EXAMPLE SPEECH 2

START STORIES & FACTS:
[FACTSANDSTORIES]


END STORIES & FACTS
You can embellish the stories but do not make up stories or facts not found in the "STORIES & FACTS" Section. Do not be mean to the groom.

Output the FULL speech and ONLY the speech. DO NOT ASK for any more information. 
`;

interface FormDataItem {
  shortName: string;
  answer: string | string[];
}

export function mergeSpeechData(speechFormat: string, cleansedFormData: Record<string, FormDataItem>): string {
  const groomName = cleansedFormData['0']?.answer as string || 'Groom';
  const partnerName = "Partner"; // Placeholder, replace with actual partner name when available

  // Replace {name} and {partner name} in the speech format
  let mergedSpeech = speechFormat.replace(/{name}/g, groomName).replace(/{partner name}/g, partnerName);

  // Helper function to safely get answer or return a default value
  const getAnswer = (index: string, defaultValue: string = 'N/A') => {
    return cleansedFormData[index]?.answer || defaultValue;
  };

  // Create the stories and facts section
  let storiesAndFacts = `
Here are details about ${groomName} and stories:

- Known ${groomName} for: ${getAnswer('1')}
- How they met: ${getAnswer('2')}
- ${groomName}'s best qualities: ${Array.isArray(getAnswer('3')) ? (getAnswer('3') as string[]).join(", ") : getAnswer('3')}
- Funny story: ${getAnswer('4')}
- Biggest accomplishment: ${getAnswer('5')}
- How ${groomName} changed since meeting partner: ${getAnswer('6')}
- What's admirable about their relationship: ${getAnswer('7')}
- Marriage advice: ${getAnswer('8')}
${getAnswer('9', '') ? `- Additional notes: ${getAnswer('9')}` : ''}

ONLY use the names ${groomName} for the groom and ${partnerName} for the partner.
`.trim();

  // Replace the [FACTSANDSTORIES] placeholder with the actual stories and facts
  mergedSpeech = mergedSpeech.replace('[FACTSANDSTORIES]', storiesAndFacts);

  return mergedSpeech;
}

async function callModel(modelName: string, input: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(input);
    return result.response.text();
  } catch (error) {
    console.error(`Error calling ${modelName}:`, error);
    throw error;
  }
}

async function simulateCallModel(modelName: string, input: string): Promise<string> {
  // Simulate API call to different models
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `${modelName} processed: ${input}`;
}

function cleanseFormData(formData: Record<string, any>): Record<string, any> {
  const cleansedData: Record<string, any> = {};
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      cleansedData[key] = value.replace(/<[^>]*>?/gm, '').trim();
    } else if (Array.isArray(value)) {
      cleansedData[key] = value.map(item => 
        typeof item === 'object' ? cleanseFormData(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      cleansedData[key] = cleanseFormData(value);
    } else {
      cleansedData[key] = value;
    }
  }
  return cleansedData;
}

export async function POST(req: NextRequest): Promise<NextResponse<ResponseData>> {
  try {
    const formData = await req.json();

    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed' },
        { status: 405 }
      );
    }

    const cleansedFormData = cleanseFormData(formData);
    console.log(cleansedFormData);

    const transformation1 =  mergeSpeechData(speechFormat, cleansedFormData);

    console.log("HERE");
    console.log(transformation1);
    const transformation2 = `Create a short story based on: ${Object.values(cleansedFormData).join(' - ')}`;
    const transformation3 = `Generate a poem inspired by: ${Object.keys(cleansedFormData).map(key => `${key}:${cleansedFormData[key]}`).join(' | ')}`;

    const [result1, result2, result3] = await Promise.all([
      callModel("gemini-1.5-pro", transformation1),
      simulateCallModel("gemini-1.5-pro-latest", transformation2),
      simulateCallModel("gemini-1.5-pro-latest", transformation3)
    ]);

    return NextResponse.json(
      { 
        message: 'Form processed successfully', 
        result1,
        result2,
        result3
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
