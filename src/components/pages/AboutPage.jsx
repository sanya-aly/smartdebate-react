import MissionVision from "../views/aboutViews/MissionVision";
import CoreValues from "../views/aboutViews/CoreValues";

const AboutPage = () => {
  return (
    <div className="page-enter">
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-block mb-4 float-anim">
          <i className="fas fa-info-circle text-5xl gradient-text"></i>
        </div>
        <h1 className="text-5xl font-bold mb-4 gradient-text fade-in">About SmartDebate</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto fade-in" style={{ animationDelay: "0.15s" }}>
          Our mission is to create a safe, respectful space where people can engage in meaningful
          discussions and learn from diverse perspectives.
        </p>
      </section>
      <MissionVision />
      <CoreValues />
    </div>
  );
};

export default AboutPage;
