import FormPage from "./form/FormPage";
import Hero from "./Hero";

const HeroWrapper: React.FC = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-indigo-100 to-indigo-200">
        <Hero />
        <FormPage />
      </div>
    );
  };


export default HeroWrapper;