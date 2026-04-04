import { useState } from "react";

const ContactForm = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="glass rounded-xl p-8 border border-purple-500/20 mb-12">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Send us a Message</h2>
      <form action="https://formspree.io/f/mlgpydgo" method="POST" className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Full Name</label>
          <input type="text" name="name" placeholder="Your name" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Email Address</label>
          <input type="email" name="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Subject</label>
          <input type="text" name="subject" placeholder="What is this about?" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Message</label>
          <textarea name="message" placeholder="Tell us more..." rows="6" className="w-full px-4 py-3 rounded-lg resize-none" required></textarea>
        </div>
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        <p className="text-sm text-gray-400">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-purple-400 underline">Privacy Policy</a>.
        </p>
        <div className="flex items-center">
          <input type="checkbox" required className="mr-2" checked={agreed} onChange={() => setAgreed(!agreed)} />
          <label className="text-sm">I agree to the Terms & Privacy Policy</label>
        </div>
        <button type="submit" className="btn-gradient w-full py-3 rounded-lg text-white font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
