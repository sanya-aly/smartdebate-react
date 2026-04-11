import { useState } from "react";

const ContactForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [focused, setFocused] = useState("");

  return (
    <div className="glass rounded-xl p-8 border border-purple-500/20 mb-12 scale-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-2">
        <i className="fas fa-paper-plane"></i> Send us a Message
      </h2>
      <form action="https://formspree.io/f/mlgpydgo" method="POST" className="space-y-5">

        {[
          { field: "name", label: "Full Name", type: "text", name: "name", placeholder: "Your name", icon: "fa-user" },
          { field: "email", label: "Email Address", type: "email", name: "email", placeholder: "your@email.com", icon: "fa-envelope" },
          { field: "subject", label: "Subject", type: "text", name: "subject", placeholder: "What is this about?", icon: "fa-tag" },
        ].map((f) => (
          <div key={f.field} className={`transition-all duration-300 ${focused === f.field ? "scale-[1.01]" : ""}`}>
            <label className="block font-semibold mb-2 text-sm">
              <i className={`fas ${f.icon} mr-2 text-cyan-400`}></i>{f.label}
            </label>
            <input
              type={f.type} name={f.name} placeholder={f.placeholder}
              className="w-full px-4 py-3 rounded-xl"
              onFocus={() => setFocused(f.field)} onBlur={() => setFocused("")}
              required
            />
          </div>
        ))}

        <div className={`transition-all duration-300 ${focused === "msg" ? "scale-[1.005]" : ""}`}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-comment-dots mr-2 text-cyan-400"></i>Message
          </label>
          <textarea
            name="message" placeholder="Tell us more..." rows="5"
            className="w-full px-4 py-3 rounded-xl resize-none"
            onFocus={() => setFocused("msg")} onBlur={() => setFocused("")}
            required
          ></textarea>
        </div>

        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <div className="flex items-center gap-2">
          <input
            type="checkbox" required className="w-4 h-4 accent-purple-500"
            checked={agreed} onChange={() => setAgreed(!agreed)}
          />
          <label className="text-sm text-slate-300">I agree to the Terms & Privacy Policy</label>
        </div>

        <button
          type="submit"
          className="btn-gradient w-full py-3 rounded-xl text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          <i className="fas fa-paper-plane mr-2"></i>Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
