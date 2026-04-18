import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-green-50 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center relative">
        <div className="mb-8 animate-float">
          <span className="text-8xl drop-shadow-lg animate-pulse-glow">♻️</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 animate-fade-in">
          <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Circular Campus Economy
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl font-semibold text-green-600 mb-6 animate-fade-in">
          ♻️ Reuse • 📉 Reduce • 🌍 Recycle
        </p>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Transform your campus into a hub of sustainability. Connect with thousands of eco-conscious students, buy and sell used items, reduce waste, save money, and build a greener future together.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
          <Link to="/login">
            <button className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              🔐 Campus Login
            </button>
          </Link>
          <Link to="/market">
            <button className="btn-secondary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              🛍️ Explore Marketplace
            </button>
          </Link>
        </div>

        {/* Stats Teaser */}
        <div className="mt-20 grid grid-cols-3 gap-6 animate-scale-in">
          {[
            { number: "5,200+", label: "Active Users" },
            { number: "3,400+", label: "Items Listed" },
            { number: "50kg+", label: "Waste Reduced" },
          ].map((stat, idx) => (
            <div key={idx} className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-green-600">{stat.number}</div>
              <div className="text-gray-600 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose ReCampus?</h2>
          <p className="text-xl text-gray-600">Join the sustainability movement on your campus</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "💚",
              title: "Save Money",
              desc: "Get premium quality items at 40-60% of original price. Smart shopping for smart students.",
              color: "from-green-400 to-emerald-500",
            },
            {
              icon: "🌍",
              title: "Save the Planet",
              desc: "Every item reused prevents 2kg of waste. Together, we're building a sustainable future.",
              color: "from-teal-400 to-cyan-500",
            },
            {
              icon: "🤝",
              title: "Build Community",
              desc: "Connect with eco-conscious students. Exchange not just items, but ideas and values.",
              color: "from-violet-400 to-purple-500",
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="group glass p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
            >
              <div className={`text-6xl mb-6 group-hover:scale-125 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 py-20 border-y border-green-100/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Just 4 simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1️⃣", title: "Login", desc: "Sign in with your campus account in seconds" },
              { step: "2️⃣", title: "Browse", desc: "Explore thousands of quality used items" },
              { step: "3️⃣", title: "Connect", desc: "Chat with sellers and negotiate prices" },
              { step: "4️⃣", title: "Trade", desc: "Meet & exchange items safely on campus" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative card rounded-2xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* Connection line */}
                {idx < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 w-6 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform -translate-y-1/2"></div>
                )}
                
                <div className="text-5xl mb-4 animate-float">{item.step}</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need for seamless buying and selling</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: "🔍", title: "Smart Search", desc: "Find exactly what you need with advanced filters" },
            { icon: "💬", title: "Instant Chat", desc: "Message sellers directly in the app" },
            { icon: "🛡️", title: "Safe Trading", desc: "Campus community keeps trades secure" },
            { icon: "⭐", title: "User Reviews", desc: "Check seller ratings and feedback" },
            { icon: "📱", title: "Mobile Ready", desc: "Shop on the go, anywhere, anytime" },
            { icon: "🎯", title: "Quick Deals", desc: "Get notified of new items matching your interests" },
          ].map((feature, idx) => (
            <div key={idx} className="group glass p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{feature.icon}</div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative my-20 mx-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl overflow-hidden shadow-2xl">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative px-8 py-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students building a sustainable campus economy. Start buying, selling, and saving today!
            </p>
            <Link to="/market">
              <button className="bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 transform text-lg">
                Get Started 🚀
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "kg Waste Reduced" },
            { value: "₹2M+", label: "Saved Collectively" },
            { value: "15K+", label: "Transactions" },
            { value: "98%", label: "Happy Users" },
          ].map((stat, idx) => (
            <div key={idx} className="group">
              <div className="text-4xl font-bold text-green-600 group-hover:text-emerald-600 transition">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;