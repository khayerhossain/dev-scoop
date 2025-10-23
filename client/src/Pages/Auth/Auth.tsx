import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/AuthContext.jsx";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Auth = () => {
  const authContext = useContext(AuthContext);
  const { createUser, signInUser, signInWithGoogle, loading } = authContext || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === "login") {
        // Login logic
        await signInUser(formData.email, formData.password);
        toast.success("Login successful!");
        navigate("/");
      } else {
        // Register logic
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match!");
          setIsLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters!");
          setIsLoading(false);
          return;
        }

        const result = await createUser(formData.email, formData.password);
        
        // Update user profile with name
        if (result.user && formData.name) {
          await updateProfile(result.user, {
            displayName: formData.name
          });
        }
        
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = "An error occurred. Please try again.";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use. Please try logging in instead.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
      navigate("/");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #3b82f6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem"
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "28rem",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    padding: "2rem"
  };

  const tabButtonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    background: activeTab === "login" ? "#3b82f6" : "transparent",
    color: activeTab === "login" ? "white" : "#64748b",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: "500"
  };

  const tabButtonStyleSignup = {
    padding: "0.75rem 1.5rem",
    border: "none",
    background: activeTab === "signup" ? "#3b82f6" : "transparent",
    color: activeTab === "signup" ? "white" : "#64748b",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: "500"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s"
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: "28rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "1rem" }}>
            <div style={{ 
              padding: "0.5rem", 
              borderRadius: "0.5rem", 
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              transition: "transform 0.2s"
            }}>
              <Code2 size={24} color="white" />
            </div>
            <span style={{ 
              fontSize: "1.5rem", 
              fontWeight: "bold", 
              background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              DevScoop
            </span>
          </Link>
        </div>

        <div style={cardStyle}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1f2937" }}>Welcome</h2>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Sign in to your account or create a new one</p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <motion.div 
              style={{ 
                display: "flex", 
                gap: "0.5rem", 
                marginBottom: "1.5rem",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "0.25rem",
                borderRadius: "0.75rem",
                backdropFilter: "blur(10px)"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button 
                style={{
                  ...tabButtonStyle,
                  position: "relative",
                  overflow: "hidden"
                }}
                onClick={() => handleTabChange("login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User size={16} style={{ marginRight: "0.5rem" }} />
                Login
                {activeTab === "login" && (
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, #3b82f6, #1d4ed8)"
                    }}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
              <motion.button 
                style={{
                  ...tabButtonStyleSignup,
                  position: "relative",
                  overflow: "hidden"
                }}
                onClick={() => handleTabChange("signup")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus size={16} style={{ marginRight: "0.5rem" }} />
                Sign Up
                {activeTab === "signup" && (
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, #3b82f6, #1d4ed8)"
                    }}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === "login" && (
                <motion.form 
                  key="login"
                  onSubmit={handleSubmit} 
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="login-email" style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
                      <Mail size={16} style={{ marginRight: "0.5rem" }} />
                      Email
                    </label>
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="login-password" style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
                      <Lock size={16} style={{ marginRight: "0.5rem" }} />
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                      id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                      required
                        style={inputStyle}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "0.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#6b7280"
                        }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                  </div>
                  </motion.div>
                  <motion.button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                      ...buttonStyle,
                      background: isLoading ? "#9ca3af" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </motion.button>
                </motion.form>
              )}

              {activeTab === "signup" && (
                <motion.form 
                  key="signup"
                  onSubmit={handleSubmit} 
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="signup-name" style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
                      <User size={16} style={{ marginRight: "0.5rem" }} />
                      Full Name
                    </label>
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="signup-email" style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
                      <Mail size={16} style={{ marginRight: "0.5rem" }} />
                      Email
                    </label>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="signup-password" style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
                      <Lock size={16} style={{ marginRight: "0.5rem" }} />
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "0.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#6b7280"
                        }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                  </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="signup-confirm-password" style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontWeight: "500", color: "#374151" }}>
                      <Lock size={16} style={{ marginRight: "0.5rem" }} />
                      Confirm Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      required
                        style={inputStyle}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: "absolute",
                          right: "0.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#6b7280"
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                  </div>
                  </motion.div>
                  <motion.button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                      ...buttonStyle,
                      background: isLoading ? "#9ca3af" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Google Login Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: "1rem" 
              }}>
                <div style={{ 
                  flex: 1, 
                  height: "1px", 
                  background: "#e5e7eb" 
                }}></div>
                <span style={{ 
                  padding: "0 1rem", 
                  color: "#6b7280", 
                  fontSize: "0.875rem" 
                }}>
                  Or continue with
                </span>
                <div style={{ 
                  flex: 1, 
                  height: "1px", 
                  background: "#e5e7eb" 
                }}></div>
              </div>

              <motion.button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "white",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s"
                }}
                whileHover={{ 
                  scale: isLoading ? 1 : 1.02,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ marginRight: "0.5rem" }}
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Signing in..." : "Continue with Google"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
