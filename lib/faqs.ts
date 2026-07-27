import type { FaqInput } from './schema'

/**
 * FAQ content, shared between the rendered <FaqSection> and the FAQPage
 * JSON-LD so the two can never disagree — Google treats visible-content
 * mismatch as a structured-data violation.
 *
 * Note on expectations: Google restricted FAQ rich results to well-known
 * authoritative sites in 2023, so these are unlikely to produce SERP
 * accordions. The value here is passage-level extraction by AI search
 * surfaces, plus answering real pre-conversion questions on the page.
 */

export const homeFaqs: FaqInput[] = [
  {
    question: 'Is Best Man Speech AI free?',
    answer:
      'Yes. The speech generator is currently free — it was previously $4.99. You get one personalized speech, a PDF download, and our highest-quality AI model at no cost.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. There is no signup, no login, and no email required. Answer the questions and your speech is generated straight away.',
  },
  {
    question: 'How long does it take?',
    answer:
      'About five minutes. There are seven core questions, plus an optional bonus round if you want to add more detail. The speech itself is written in under a minute.',
  },
  {
    question: 'Will the speech actually sound like me?',
    answer:
      'The questions ask for your own stories — how you met the groom, what he is like, the moments that stuck with you. The AI writes around those specifics rather than producing generic filler, so the result reflects your relationship. Treat it as a strong first draft and adjust any phrasing that does not sound like how you talk.',
  },
  {
    question: 'Can I edit the speech afterwards?',
    answer:
      'Yes, and you should. Download the PDF, read it out loud, and change anything that feels off. A speech you have made your own will always land better than one you read cold.',
  },
]

export const tipsFaqs: FaqInput[] = [
  {
    question: 'How long should a best man speech be?',
    answer:
      'Three to five minutes, which is roughly 500 to 750 words spoken at a comfortable pace. Under three minutes feels thin; past five, you can feel the room drift. Time yourself out loud rather than guessing from the page — most people read faster silently than they speak.',
  },
  {
    question: 'How do I start a best man speech?',
    answer:
      'Introduce yourself in one line, then get to a story fast. "For those who don\'t know me, I\'m Tom, and I\'ve been Jack\'s best friend since we were eleven" does the job. Skip the throat-clearing about how nervous you are — it lowers the room\'s confidence in you before you have said anything.',
  },
  {
    question: 'What should I avoid in a best man speech?',
    answer:
      'Anything the grandparents should not hear, ex-partners, inside jokes only three people understand, and roasting that never turns into warmth. Also avoid reading from your phone — printed notes look far better and will not die mid-speech.',
  },
  {
    question: 'When does the best man speech happen?',
    answer:
      'Usually during the reception, after the meal, and typically after the father of the bride and the groom have spoken. Confirm the running order with whoever is coordinating the day so you are not caught off guard.',
  },
  {
    question: 'Should I memorize my speech or read it?',
    answer:
      'Neither extreme. Memorizing word for word means one blank moment derails you; reading every line means no eye contact. Know your opening and closing cold, keep bullet notes for the middle, and let the delivery breathe.',
  },
]

export const twoGroomsFaqs: FaqInput[] = [
  {
    question: 'Who gives the best man speech at a wedding with two grooms?',
    answer:
      'Whatever the couple decides. Some two-groom weddings have a best man for each groom, some have one shared best person, and some skip the role entirely in favour of a friend or sibling speaking. Ask the couple early rather than assuming the traditional structure applies.',
  },
  {
    question: 'How do I address both grooms in the speech?',
    answer:
      'Give both of them real presence. If you only know one groom well, say so honestly and then spend genuine time on what you have seen in the relationship — how the other groom changed your friend, a moment you noticed between them. What lands badly is a speech that treats one groom as a guest at his own wedding.',
  },
  {
    question: 'Does the traditional best man speech structure still work?',
    answer:
      'Yes. Introduction, a story about the groom you know, a turn toward the couple, and a toast works regardless of who is marrying whom. The structure is sound — it is the assumptions baked into the stock jokes that need dropping.',
  },
  {
    question: 'What should I avoid at a same-sex wedding?',
    answer:
      'Bride jokes and "ball and chain" material obviously do not apply, but the subtler trap is making the couple\'s sexuality the theme of the speech. They are getting married, not being congratulated for who they are. Treat it the way you would any wedding: talk about the people.',
  },
]

export const howToFaqs: FaqInput[] = [
  {
    question: 'How far in advance should I write my best man speech?',
    answer:
      'Start three to four weeks out. Draft it early, then leave it alone for a few days before editing — the weak lines are much easier to spot when the writing is not fresh. Rehearsing needs about a week of casual practice, not a panicked night before.',
  },
  {
    question: 'How many jokes should a best man speech have?',
    answer:
      'Fewer than you think. Two or three that genuinely land beat eight that half-work. A best man speech is not a stand-up set — the humour exists to earn the sincerity at the end, not to replace it.',
  },
  {
    question: 'What if I am not funny?',
    answer:
      'Then do not perform funny. Specific, warm, well-told stories work on any audience, and a heartfelt speech delivered well is remembered more fondly than a joke-dense one delivered nervously. Play to sincerity and the laughs you do get will be real ones.',
  },
  {
    question: 'What should the best man speech end with?',
    answer:
      'A toast, always. Turn from the groom to the couple, say something you actually believe about them, then raise your glass and name them clearly so the room knows to join. Keep the final line short — that is the sentence people carry out of the room.',
  },
  {
    question: 'Can I use an AI-generated best man speech as-is?',
    answer:
      'You can, but it works better as a first draft. Our generator builds the speech from your own answers, so the stories are yours — but read it out loud and swap any phrasing that does not sound like how you actually talk. The gap between "good speech" and "his speech" is usually a handful of words.',
  },
]

export const bachelorFaqs: FaqInput[] = [
  {
    question: 'How is a bachelor party speech different from a wedding speech?',
    answer:
      'It is shorter, looser, and the audience is entirely people who know the groom. You can lean harder into the roast because there are no grandparents in the room — but it still needs a sincere turn at the end. The wedding speech is a performance; this one is a toast among friends.',
  },
  {
    question: 'How long should a bachelor party toast be?',
    answer:
      'One to two minutes. People are standing, drinking, and half-listening. Get in, land one story, toast, get out.',
  },
  {
    question: 'How rude is too rude?',
    answer:
      'The test is whether the groom would be happy for this story to be repeated tomorrow. Roast his terrible dancing, his cooking, his refusal to admit he is lost — not anything involving an ex, anything genuinely humiliating, or anything he has told you in confidence.',
  },
  {
    question: 'When should I give the bachelor party speech?',
    answer:
      'Early in the evening, while everyone is still coherent. Dinner is usually the natural moment. Waiting until late means half the group has wandered off and the other half will not remember it.',
  },
]
