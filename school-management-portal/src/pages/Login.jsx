
import { useState } from "react";
import {
  GraduationCap,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Frontend demo only: no real authentication yet.
    onLogin({ email, rememberMe });
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-form-panel">
          <div className="login-brand">
            <div className="login-brand-icon">
              <GraduationCap size={37} strokeWidth={2.2} />
            </div>

            <div>
              <h1>EduCare School</h1>
              <p>School Management Portal</p>
            </div>
          </div>

          <div className="login-heading">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="login-email">Email Address</label>

              <div className="login-input-wrapper">
                <Mail size={17} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>

              <div className="login-input-wrapper">
                <LockKeyhole size={17} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  setError("Password recovery will be added later.")
                }
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="login-submit">
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="login-footer">
            © 2026 EduCare School. All rights reserved.
          </p>
        </div>

        <div className="login-hero-panel">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

          <div className="login-hero-content">
            <div className="hero-school-icon">
              <GraduationCap size={48} />
            </div>

            <span className="hero-eyebrow">
              WELCOME TO EDUCARE
            </span>

            <h2>
              Better Education.
              <br />
              Brighter Futures.
            </h2>

            <p>
              Manage students, teachers, classes and assignments
              from one simple school management portal.
            </p>

            <div className="hero-feature">
              <span className="hero-feature-dot" />
              <span>Everything your school needs, in one place.</span>
            </div>
          </div>

          <span className="hero-bottom-label">
            LEARN · GROW · ACHIEVE
          </span>
        </div>
      </section>
    </main>
  );
}

export default Login;
