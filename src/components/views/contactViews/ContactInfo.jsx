const contactItems = [
  { icon: "fa-envelope", color: "text-purple-400", bgColor: "bg-purple-600/20", border: "border-purple-500/20", title: "Email", line1: "hello@smartdebate.com", line2: "We'll reply within 24 hours" },
  { icon: "fa-phone", color: "text-cyan-400", bgColor: "bg-cyan-600/20", border: "border-cyan-500/20", title: "Phone", line1: "+92 321 1234567", line2: "Monday to Friday, 9am-5pm" },
  { icon: "fa-map-marker-alt", color: "text-blue-400", bgColor: "bg-blue-600/20", border: "border-blue-500/20", title: "Address", line1: "Lahore, Pakistan", line2: "Visit our office" },
];

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 stagger-children">
      {contactItems.map((item) => (
        <div key={item.title} className={`glass rounded-xl p-6 border ${item.border} text-center card-hover scale-in group`}>
          <div className={`w-14 h-14 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
            <i className={`fas ${item.icon} ${item.color} text-2xl`}></i>
          </div>
          <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
          <p className="text-slate-400">{item.line1}</p>
          <p className="text-slate-400 text-sm mt-1">{item.line2}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
