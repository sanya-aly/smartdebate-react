import MissionVision from "../views/aboutViews/MissionVision";
import CoreValues from "../views/aboutViews/CoreValues";

const AboutPage = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">About SmartDebate</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Our mission is to create a safe, respectful space where people can engage in meaningful
          discussions and learn from diverse perspectives.
        </p>
      </section>
      <MissionVision />
      <CoreValues />
    </>
  );
};

export default AboutPage;
