import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string;
  speechText?: string;
}

const fakeform = `To Dad
My dad is my best friend and hero and the strongest man I know - To say he was a good man would be an understatement. He was an extraordinary man who acted like an ordinary one.
He was an amazing Friend, Brother, Uncle, Husband, Dad, and Grandfather - He loved so fully and is loved by so many.
There are no words to express his influence on my life or his influence on those around him. He was always willing to help, to give advice, to volunteer to help - the first to show up and last to leave.
When I think of my Dad all I have are warm and welcoming memories - Although my dad wasn’t big for the I love yous, I never once doubted the absolute love he had for myself, Adam, Mom, his grandkids, and his family… there was never a time when I couldn’t go to my Dad for help and not come away with a new perspective, and life advice that made me a better person - but that's who my dad was, a compassionate, honest person, who taught me to always learn something new, to always aim to better myself with every day.

But most of all these memories have no words. They are memories of talking about all things Maryland basketball, our camper trips to see amazing places waking up in the middle of the night to 30-degree weather with no heater on, to pushing my mom and him up from the bottom of the canyon at Yellowstone on the same trip, to Christmas mornings when we would have to wait for dad and mom to let us come down the stairs - which was never quick enough.
My Dad loved nothing more than being a grandad or more affectionately “bubbles” to his grandsons Jackson and Noah. They are the world to him, and he is the world to them. From tickle fights to singing Rockabye Baby, to kisses and telling them he loved them every chance he got, the joy they brought to him was immeasurable.

This love of his grandkids extended into a more recent memory involving my favorite meal called pot pie which is simple dough squares covered in gravy served with a Sunday roast - a recipe passed down from his grandmother - a meal that I wanted as often as possible so I taught my nephews to ask grandma and grandad for it - grandma and grandad can say no to me but they can't say no to the grandkids - it worked and it's now their favorite as well - I have some learning to do with mom but I promise that I will carry on the tradition, although nothing will ever taste as good as a fathers meal I will do my best to make him proud.

Throughout childhood, some of my fondest memories are of my brother and I working with dad in the backyard on some house project or woodworking project - probably something mom requested - and still distinctly remember him handing me stain for a box he helped me build that just didn't stain ‘right’, as he told me to keep applying coats of stain he slowly realized he had handed me the used motor oil can. I still have that box sitting in my room, and every once in a while I would tease him about the time he gave me used oil instead of stain - yet somehow that motor oil has held up and looked beautiful all these years.

To this day we would take weekly trips where I would make him buy some woodworking tool we didn’t need and tell him “It's just money” as I put it in the cart - I will carry on that tradition but I have a feeling it won't be as funny when I say “it's just money” and it's my money
Dad taught Adam and I so much and in recent years he would love to watch us work and build things using the skills he imparted to us and provide advice and guidance from a chair we affectionately referred to as the “Kings Chair” - Adam and I will miss that guidance, and supervision on every woodworking project, but we will leave the chair open so that he can check in on us from time to time.

There is not enough time in the day for me to express the great man my dad was but if you’re here then you knew him and if you knew him you know that he was an extraordinary man who acted like an ordinary one.

I want to wrap up with two quotes from a letter I recently found that my dad had written to both Adam and I that he had planned to have delivered to us upon his passing - it was only by chance that I located it while looking for pictures this week:

“If I could have imparted one thing it would be to help others, be a participant and not a watcher. Pay it forward and in the end, it will come back to you a thousand times over.”
and
“Remember that words are quickly forgotten but deeds are always remembered. Be careful with your actions and you will never regret it.”
I love you Dad, forever and always`;

export async function POST(req: NextRequest): Promise<NextResponse<ResponseData>> {
  try {
    // Parse the request body
    const formData = await req.json();

    // Validate the request method
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed' },
        { status: 405 }
      );
    }

    // Process the form data
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate a simple speech based on the form data
    let speechText = `Thank you for your submission, ${formData[0]}! Here's a quick speech based on your answers...`;
    speechText += fakeform;

    // Return the response
    return NextResponse.json(
      { message: 'Form submitted successfully', speechText },
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
