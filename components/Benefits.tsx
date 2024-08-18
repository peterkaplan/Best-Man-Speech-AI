import BenefitsItem from './BenefitsItem';

const benefitsData = [
  {
    id: 1,
    title: "Tailored Speech",
    description: "Get a perfectly tailored speech that resonates with your audience.",
    icon: "speech", // Assuming you have an icon named 'speech'
  },
  {
    id: 2,
    title: "Easy to Use",
    description: "Our platform is user-friendly and intuitive, making speech creation a breeze.",
    icon: "easy", // Assuming you have an icon named 'easy'
  },
  {
    id: 3,
    title: "AI-Powered Insights",
    description: "Leverage AI to craft speeches that hit the right emotional chords.",
    icon: "ai", // Assuming you have an icon named 'ai'
  },
];

const Benefits = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Why Choose BestManAI?
        </h2>
        <div className="flex flex-wrap -mx-4">
          {benefitsData.map((benefit) => (
            <BenefitsItem
              key={benefit.id}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;