import ContactInfo from "../views/contactViews/ContactInfo";
import ContactForm from "../views/contactViews/ContactForm";

const ContactPage = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Get in Touch</h1>
        <p className="text-xl text-slate-300">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-4">
        <ContactInfo />
        <ContactForm />
      </section>
    </>
  );
};

export default ContactPage;
