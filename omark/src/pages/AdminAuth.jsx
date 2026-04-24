// pages/AdminAuth.jsx - Omark Real Estate Admin Authentication
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Home,
  Building2,
  CheckCircle,
  X,
  AlertCircle,
  Users,
} from "lucide-react";
import { authApi } from "../api/auth";

const AdminAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await authApi.login({ email: loginData.email, password: loginData.password });
      if (loginData.rememberMe) {
        localStorage.setItem("admin_remember", loginData.email);
      }
      setSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (err) {
      setError(err?.response?.data?.message ?? "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };


  const features = [
    {
      icon: Building2,
      text: "Manage property listings",
      color: "from-red-500 to-red-700",
      description: "Add, edit, and track properties",
    },
    {
      icon: Users,
      text: "Track client inquiries",
      color: "from-red-500 to-red-700",
      description: "Manage customer relationships",
    },
    {
      icon: Home,
      text: "Monitor construction projects",
      color: "from-red-500 to-red-700",
      description: "Real-time project updates",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14141D] to-[#1a1a25] flex overflow-hidden">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/1.jpeg"
            alt="Omark Real Estate"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14141D]/90 via-[#14141D]/70 to-[#14141D]/40" />
        </div>

        <div className="relative z-10 flex flex-col p-12 w-full justify-between">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-md overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <img
                src="/images/logo1.png"
                alt="Omark Real Estate Logo"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Omark Real Estate</h1>
              <p className="text-red-400 text-sm">Premium Property Management</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold text-white leading-tight">
              Admin
              <br />
              <span className="text-red-500">Dashboard Access</span>
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{feature.text}</p>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">500+</div>
              <div className="text-xs text-gray-400">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">98%</div>
              <div className="text-xs text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">15+</div>
              <div className="text-xs text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile header */}
          <div className="text-center mb-8 lg:hidden">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
                <img
                  src="/images/logo1.png"
                  alt="Omark Real Estate Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#14141D]">Admin Access</h2>
            <p className="text-gray-500 text-sm">Omark Real Estate Dashboard</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#14141D]">Welcome back</h3>
            <p className="text-gray-500 text-sm mt-1">Sign in to your admin account</p>
          </div>

          {/* Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-600 text-sm flex-1">{error}</p>
                <button onClick={() => setError("")}>
                  <X className="w-4 h-4 text-red-400 hover:text-red-600" />
                </button>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-600 text-sm flex-1">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 bg-white"
                  placeholder="admin@omarkrealestate.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAuth;
