import RegisterForm from "../views/authViews/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Create Your Account</h1>
          <p className="text-slate-300">Join thousands of debaters worldwide</p>
        </div>
        <RegisterForm />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "fa-shield-alt", color: "text-purple-400", border: "border-purple-500/20", title: "Secure", desc: "Your data is protected" },
            { icon: "fa-users", color: "text-cyan-400", border: "border-cyan-500/20", title: "Community", desc: "Join thousands" },
            { icon: "fa-bolt", color: "text-blue-400", border: "border-blue-500/20", title: "Instant", desc: "Start debating now" },
          ].map((item) => (
            <div key={item.title} className={`glass rounded-lg p-4 border ${item.border} text-center`}>
              <i className={`fas ${item.icon} text-2xl ${item.color} mb-2 block`}></i>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
