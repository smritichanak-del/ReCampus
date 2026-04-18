import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const [campusEmail, setCampusEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = campusEmail.trim();

    if (!email) {
      setError("Please enter your campus email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (loginError) {
      console.error("Login error:", loginError);
      setError("Login failed. Please try again or use a campus Google account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-green-50 to-white overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-14 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-green-700">Welcome to ReCampus</p>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Login in seconds with your campus account and start trading sustainably.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Enter your campus email below and continue with Google to access the student marketplace, connect with sellers, and swap used items safely.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { step: "1️⃣", title: "Login", desc: "Sign in with your campus account in seconds" },
                { step: "2️⃣", title: "Browse", desc: "Explore thousands of quality used items" },
                { step: "3️⃣", title: "Connect", desc: "Chat with sellers and negotiate prices" },
                { step: "4️⃣", title: "Trade", desc: "Meet & exchange items safely on campus" },
              ].map((card) => (
                <div key={card.step} className="glass p-6 rounded-3xl border border-white/50 shadow-lg">
                  <div className="text-4xl mb-3">{card.step}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[2rem] border border-white/50 p-10 shadow-2xl">
            <div className="mb-8 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-green-700 font-semibold">Campus Login</p>
              <h2 className="mt-4 text-4xl font-bold text-gray-900">Sign in with Google</h2>
              <p className="mt-3 text-gray-600">Use your campus email address to join the ReCampus community.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-gray-700">Campus Email</label>
              <input
                type="email"
                value={campusEmail}
                onChange={(event) => setCampusEmail(event.target.value)}
                placeholder="student@campus.edu"
                className="w-full rounded-3xl border border-green-200 bg-white/90 px-5 py-4 text-gray-900 shadow-sm outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
              />

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 text-white text-lg font-semibold shadow-lg transition hover:shadow-xl disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Continue with Google"}
              </button>
            </form>

            <div className="mt-8 text-center text-gray-500">
              <p>
                Already have an account? <Link to="/dashboard" className="font-semibold text-green-700 hover:text-emerald-700">View dashboard</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
