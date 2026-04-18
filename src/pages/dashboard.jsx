import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Allow viewing dashboard even without login (for demo purposes)
          setUser({ displayName: "Guest User", email: "re@campus.edu", photoURL: null });
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Auth error:", error);
      setUser({ displayName: "Guest User", email: "re@campus.edu", photoURL: null });
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <p className="text-5xl mb-4 animate-float">⏳</p>
          <p className="text-2xl text-gray-600 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <p className="text-5xl mb-4">❌</p>
          <p className="text-2xl text-gray-600 font-semibold">Unable to load dashboard</p>
          <p className="text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: "♻️", label: "Items Reused", value: "120+", color: "from-emerald-400 to-green-600", emoji: "items" },
    { icon: "💰", label: "Money Saved", value: "₹80,000+", color: "from-blue-400 to-cyan-600", emoji: "money" },
    { icon: "🌍", label: "Waste Reduced", value: "500kg+", color: "from-teal-400 to-emerald-600", emoji: "waste" },
    { icon: "🤝", label: "Community Users", value: "5,200+", color: "from-purple-400 to-pink-600", emoji: "users" },
  ];

  const activityStyles = {
    blue: "border-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent",
    green: "border-green-500 bg-gradient-to-r from-emerald-50/50 to-transparent",
    yellow: "border-yellow-500 bg-gradient-to-r from-yellow-50/50 to-transparent",
    pink: "border-pink-500 bg-gradient-to-r from-pink-50/50 to-transparent",
  };

  const activities = [
    { type: "Listed Item", title: "Physics Textbook", time: "2 hours ago", icon: "📚", color: "blue" },
    { type: "Sold Item", title: "College Backpack", time: "1 day ago", icon: "✅", color: "green" },
    { type: "Listed Item", title: "Study Lamp", time: "3 days ago", icon: "💡", color: "yellow" },
    { type: "Purchased Item", title: "Lab Coat", time: "5 days ago", icon: "🛍️", color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-green-50 to-white">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="glass p-8 mb-8 rounded-2xl border border-white/50 shadow-lg animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL || "https://ui-avatars.com/api/?name=Guest+User"}
                alt={user.displayName}
                className="w-24 h-24 rounded-full border-4 border-green-500 shadow-lg"
              />
              <div>
                <h1 className="text-5xl font-bold text-gray-900">
                  Welcome back, <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{user.displayName?.split(" ")[0]}</span>! 👋
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  📧 {user.email}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="badge bg-green-100 text-green-700 font-semibold">✓ Active Member</span>
                  <span className="badge bg-blue-100 text-blue-700 font-semibold">⭐ Level 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-in-up">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} text-white p-8 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl duration-300 border border-white/20`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{stat.icon}</div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <span className="text-sm font-semibold">↑ +12%</span>
                </div>
              </div>
              <p className="text-white/80 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/70 text-xs">This month's contribution</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Your Activity */}
          <div className="md:col-span-2 animate-fade-in">
            <div className="glass p-8 rounded-2xl border border-white/50 shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                <span className="text-4xl">📊</span> Recent Activity
              </h2>
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className={`${activityStyles[activity.color]} group p-5 rounded-xl border-l-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl group-hover:scale-125 transition-transform">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{activity.type}</p>
                        <p className="text-gray-600">{activity.title}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-500 block">{activity.time}</span>
                        <span className="text-xs text-gray-400">View Details →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="animate-scale-in">
            <div className="glass p-8 rounded-2xl border border-white/50 shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                ⚡ Quick Actions
              </h2>
              <div className="space-y-3">
                <Link to="/market" className="block">
                  <button className="btn-primary w-full font-semibold py-3 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
                    🛍️ Browse Items
                  </button>
                </Link>
                <button className="btn-secondary w-full font-semibold py-3 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all" onClick={() => alert("Coming Soon: View your listings")}>
                  📝 My Listings
                </button>
                <button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all" onClick={() => alert("Coming Soon: View your messages")}>
                  💬 Messages (3)
                </button>
                <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all" onClick={() => alert("Coming Soon: View your orders")}>
                  📦 My Orders (2)
                </button>
              </div>
            </div>

            {/* Mission Progress */}
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">🌱</span> Mission LiFE
              </h3>
              <p className="text-green-100 text-sm mb-6">
                Your actions help reduce campus waste!
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">Campus Goal</span>
                    <span className="text-lg font-bold">75%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                    <div className="bg-white h-3 rounded-full w-3/4 shadow-lg"></div>
                  </div>
                </div>
                <div className="text-xs text-green-100 pt-2">
                  Your rank: <span className="font-bold text-white">#47 on Campus</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            📈 Your Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            {[
              {
                title: "🌍 Environmental Impact",
                icon: "🌿",
                stats: [
                  { label: "CO₂ Saved", value: "120kg", color: "from-green-400 to-emerald-600" },
                  { label: "Water Saved", value: "5000L", color: "from-blue-400 to-cyan-600" },
                  { label: "Waste Diverted", value: "500kg", color: "from-teal-400 to-green-600" },
                ],
              },
              {
                title: "💰 Financial Impact",
                icon: "💵",
                stats: [
                  { label: "Money Saved", value: "₹80,000+", color: "from-yellow-400 to-orange-600" },
                  { label: "Your Earnings", value: "₹12,500", color: "from-green-400 to-emerald-600" },
                  { label: "Avg Discount", value: "65%", color: "from-pink-400 to-rose-600" },
                ],
              },
              {
                title: "🤝 Community Impact",
                icon: "👥",
                stats: [
                  { label: "Items Reused", value: "120+", color: "from-purple-400 to-indigo-600" },
                  { label: "Active Traders", value: "5,200+", color: "from-cyan-400 to-blue-600" },
                  { label: "Participation", value: "85%", color: "from-orange-400 to-red-600" },
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="glass p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-2xl text-gray-900 mb-6 flex items-center gap-2">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.stats.map((stat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`bg-gradient-to-br ${stat.color} text-white px-3 py-2 rounded-lg font-bold text-sm min-w-fit`}>
                        {stat.value}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 font-medium">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;