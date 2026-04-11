import ContactInfo from "../views/contactViews/ContactInfo";
import ContactForm from "../views/contactViews/ContactForm";

const ContactPage = () => {
  return (
    <div className="page-enter">
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-block mb-4 float-anim">
          <i className="fas fa-envelope-open-text text-5xl gradient-text"></i>
        </div>
        <h1 className="text-5xl font-bold mb-4 gradient-text fade-in">Get in Touch</h1>
        <p className="text-xl text-slate-300 fade-in" style={{ animationDelay: "0.15s" }}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-4">
        <ContactInfo />
        <ContactForm />
      </section>
    </div>
  );
};

export default ContactPage;
