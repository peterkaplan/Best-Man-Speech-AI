import FormPage from "./form/FormPage";
import Hero from "./Hero";

const HeroWrapper: React.FC = () => {
    return (
      <div className="min-h-screen bg-background">
        <Hero />
        <FormPage />
      </div>
    );
  };


export default HeroWrapper;