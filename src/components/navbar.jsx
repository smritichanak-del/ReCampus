import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-green-600/80 to-emerald-600/80 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-3xl animate-float">♻</div>
            <h1 className="font-bold text-white text-2xl bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-white transition">
              ReCampus
            </h1>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex gap-2">
            {[
              { to: "/", label: "🏠 Home" },
              { to: "/market", label: "🛍️ Marketplace" },
              { to: "/dashboard", label: "📊 Dashboard" },
            ].map((link) => (
              <Link key={link.to} to={link.to}>
                <button className="text-white hover:text-green-100 font-medium transition py-2 px-4 rounded-lg hover:bg-white/10 backdrop-blur-sm">
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full border-2 border-white shadow-md hover:scale-110 transition"
                />
                <span className="text-white hidden sm:inline text-sm font-medium">
                  {user.displayName?.split(" ")[0]}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                disabled={loading}
                className="bg-white/90 hover:bg-white text-green-600 px-6 py-2 rounded-lg font-semibold transition disabled:opacity-50 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;