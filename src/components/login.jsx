import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Felipa&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    font-family: 'DM Sans', sans-serif;
    background: #0a1628;
    min-height: 100vh;
    overflow-x: hidden;
  }
.felipa-regular {
  font-family: "Felipa", serif;
  font-weight: 400;
  font-style: normal;
}

  /* ─── Layout ─── */
  .page {
    display: flex;
    min-height: 100vh;
    flex-direction: row;
  }

  /* ─── Left Panel (sidebar) ─── */
  .left-panel {
    width: clamp(260px, 30vw, 400px);
    flex-shrink: 0;
    background: linear-gradient(160deg, #0d1b35 0%, #0a1628 60%, #0d1f3c 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(24px, 4vh, 48px) clamp(16px, 2.5vw, 32px);
    position: relative;
    overflow: hidden;
  }

  .left-panel::before {
    content: '';
    position: absolute;
    top: -80px; left: -80px;
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(30,60,120,0.35) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
  .left-panel::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(20,50,100,0.3) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .logo-ring {
    width: clamp(64px, 8vw, 90px);
    height: clamp(64px, 8vw, 90px);
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: clamp(12px, 2vh, 20px);
    position: relative;
    z-index: 1;
    box-shadow: 0 0 40px rgba(255,255,255,0.04), inset 0 0 30px rgba(255,255,255,0.02);
    flex-shrink: 0;
  }
  .logo-icon { font-size: clamp(24px, 3.5vw, 36px); filter: brightness(0.85) sepia(0.2); }

  .brand-title {
  font-family: "Felipa", serif;
    font-size: clamp(15px, 2vw, 20px);
    font-weight: 800;
    color: #e8ecf4;
    text-align: center;
    line-height: 1.35;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }
  .gold-divider {
    width: 40px; height: 2px;
    background: linear-gradient(90deg, transparent, #c9a84c, transparent);
    margin: 10px auto 12px;
  }
  .brand-tagline {
    font-size: clamp(10px, 1.2vw, 11px);
    color: rgba(180,195,220,0.65);
    text-align: center;
    letter-spacing: 0.04em;
    line-height: 1.7;
    margin-bottom: clamp(16px, 3vh, 28px);
    position: relative;
    z-index: 1;
  }
  .feature-list {
    display: flex;
    flex-direction: column;
    gap: clamp(6px, 1vh, 10px);
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: clamp(8px, 1.2vh, 11px) clamp(10px, 1.5vw, 14px);
    font-size: clamp(11px, 1.2vw, 12.5px);
    color: rgba(200,215,235,0.8);
    font-weight: 400;
    letter-spacing: 0.01em;
  }
  .feature-icon { font-size: clamp(13px, 1.5vw, 15px); opacity: 0.75; flex-shrink: 0; }

  /* ─── Mobile Top Bar (hidden on desktop) ─── */
  .mobile-topbar { display: none; }

  /* ─── Right Panel ─── */
  .right-panel {
    flex: 1;
    background: #0a1628;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(16px, 3vw, 40px);
    overflow-y: auto;
  }

  /* ─── Card ─── */
  .card {
    background: #ffffff;
    border-radius: clamp(12px, 2vw, 18px);
    padding: clamp(20px, 3.5vw, 40px) clamp(18px, 4vw, 44px) clamp(18px, 3vw, 32px);
    width: 100%;
    max-width: 480px;
    box-shadow: 0 8px 40px rgba(15,30,60,0.18), 0 2px 8px rgba(15,30,60,0.08);
  }

  .card-title {
    font-family: 'Crimson Pro', serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 700;
    color: #12213d;
    margin-bottom: 4px;
  }
  .card-subtitle {
    font-size: clamp(12px, 1.4vw, 13px);
    color: #7a8ba8;
    margin-bottom: clamp(14px, 2.5vh, 22px);
    font-weight: 400;
  }

  /* ─── Tabs ─── */
  .tab-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #e8edf5;
    border-radius: 10px;
    padding: 4px;
    margin-bottom: clamp(14px, 2.5vh, 22px);
    gap: 4px;
  }
  .tab-btn {
    padding: clamp(8px, 1.2vh, 11px);
    border-radius: 7px;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(13px, 1.5vw, 14px);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .tab-btn.active {
    background: #ffffff;
    color: #12213d;
    box-shadow: 0 1px 6px rgba(15,30,60,0.12);
    border: 1px solid rgba(15,30,60,0.08);
  }
  .tab-btn.inactive { background: transparent; color: #7a8ba8; }

  /* ─── Fields ─── */
  .field-group { margin-bottom: clamp(10px, 1.8vh, 15px); }
  .field-label {
    display: block;
    font-size: clamp(12px, 1.3vw, 13px);
    font-weight: 500;
    color: #3a4d6b;
    margin-bottom: 6px;
  }
  .required-star { color: #e04444; margin-left: 2px; }

  .input-wrap { position: relative; display: flex; align-items: center; }
  .input-icon {
    position: absolute; left: 13px;
    font-size: clamp(13px, 1.5vw, 15px);
    color: #a0adc0;
    pointer-events: none;
  }
  .field-input {
    width: 100%;
    padding: clamp(10px, 1.5vh, 13px) 14px clamp(10px, 1.5vh, 13px) 40px;
    border: 1.5px solid #dde3ef;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(14px, 1.6vw, 14px);
    color: #12213d;
    background: #fafbfd;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }
  .field-input:focus {
    border-color: #1d3a72;
    box-shadow: 0 0 0 3px rgba(29,58,114,0.1);
    background: #fff;
  }
  .field-input::placeholder { color: #b0bcce; }

  .eye-btn {
    position: absolute; right: 12px;
    background: none; border: none;
    cursor: pointer;
    font-size: clamp(14px, 1.8vw, 16px);
    color: #a0adc0;
    padding: 4px;
    line-height: 1;
  }

  .select-wrap { position: relative; display: flex; align-items: center; }
  .select-icon {
    position: absolute; left: 13px;
    font-size: clamp(13px, 1.5vw, 15px);
    color: #a0adc0;
    pointer-events: none;
    z-index: 1;
  }
  .select-arrow {
    position: absolute; right: 13px;
    font-size: 13px; color: #a0adc0;
    pointer-events: none;
  }
  .field-select {
    width: 100%;
    padding: clamp(10px, 1.5vh, 13px) 36px clamp(10px, 1.5vh, 13px) 40px;
    border: 1.5px solid #dde3ef;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(14px, 1.6vw, 14px);
    color: #12213d;
    background: #fafbfd;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field-select:focus {
    border-color: #1d3a72;
    box-shadow: 0 0 0 3px rgba(29,58,114,0.1);
    background: #fff;
  }
  .field-select.placeholder-color { color: #b0bcce; }

  /* ─── Remember Row ─── */
  .remember-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: clamp(12px, 2vh, 18px);
  }
  .remember-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: clamp(12px, 1.4vw, 13.5px);
    color: #5a6e8a;
    cursor: pointer;
    user-select: none;
  }
  .remember-checkbox { width: 16px; height: 16px; accent-color: #1d3a72; cursor: pointer; }
  .forgot-link {
    font-size: clamp(12px, 1.4vw, 13.5px);
    color: #1d3a72;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
  }
  .forgot-link:hover { text-decoration: underline; }

  /* ─── Button ─── */
  .login-btn {
    width: 100%;
    padding: clamp(11px, 1.8vh, 13px);
    background: linear-gradient(135deg, #1d3a72, #14284f);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(14px, 1.7vw, 15px);
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: opacity 0.2s, transform 0.1s;
    margin-bottom: clamp(10px, 1.8vh, 16px);
    box-shadow: 0 4px 18px rgba(29,58,114,0.35);
  }
  .login-btn:hover { opacity: 0.92; }
  .login-btn:active { transform: scale(0.99); }
  .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  /* ─── Alert ─── */
  .alert {
    padding: clamp(9px, 1.2vh, 12px) 14px;
    border-radius: 8px;
    font-size: clamp(12px, 1.3vw, 13px);
    margin-bottom: clamp(10px, 1.8vh, 16px);
    font-weight: 500;
  }
  .alert.error  { background: #fef0f0; color: #c0392b; border: 1px solid #f5c6c6; }
  .alert.success{ background: #edfdf4; color: #1a7a45; border: 1px solid #b8e8ce; }

  /* ─── Mobile top bar internals ─── */
  .topbar-main {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 20px 10px;
    position: relative; z-index: 1;
  }
  .topbar-logo {
    width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    box-shadow: 0 0 20px rgba(201,168,76,0.15);
  }
  .topbar-text { flex: 1; min-width: 0; }
  .topbar-title {
    font-family: 'Crimson Pro', serif;
    font-size: 15px; font-weight: 700; color: #e8ecf4;
    line-height: 1.2;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .topbar-subtitle {
    font-size: 10.5px; color: rgba(180,195,220,0.55);
    letter-spacing: 0.06em; margin-top: 2px; font-style: italic;
  }
  .topbar-pills {
    display: flex; gap: 8px; overflow-x: auto;
    padding: 0 20px 13px;
    scrollbar-width: none;
    position: relative; z-index: 1;
  }
  .topbar-pills::-webkit-scrollbar { display: none; }
  .topbar-pill {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px; padding: 5px 13px;
    font-size: 11.5px; color: rgba(200,220,245,0.8);
    white-space: nowrap; flex-shrink: 0;
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #c9a84c; flex-shrink: 0; }

  /* ─── Responsive Breakpoints ─── */

  /* Tablet & below: hide sidebar, show top bar */
  @media (max-width: 820px) {
    .page { flex-direction: column; }
    .left-panel { display: none; }

    .mobile-topbar {
      display: block;
      background: linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%);
      border-bottom: 1px solid rgba(201,168,76,0.2);
      position: relative;
      overflow: hidden;
    }
    .mobile-topbar::before {
      content: '';
      position: absolute; top: -40px; right: -40px;
      width: 160px; height: 160px;
      background: radial-gradient(circle, rgba(30,60,120,0.4) 0%, transparent 70%);
      border-radius: 50%;
    }

    .right-panel {
      flex: 1;
      background: #0f1a2e;
      align-items: flex-start;
      justify-content: center;
      padding: clamp(20px, 4vw, 36px) clamp(14px, 4vw, 28px) clamp(24px, 5vw, 48px);
    }

    .card {
      max-width: 540px;
      margin: 0 auto;
    }
  }

  /* Small phones */
  @media (max-width: 480px) {
    .topbar-main { padding: 12px 14px 8px; gap: 10px; }
    .topbar-logo { width: 38px; height: 38px; font-size: 19px; }
    .topbar-title { font-size: 13.5px; }
    .topbar-pills { padding: 0 14px 11px; }

    .right-panel { padding: 16px 10px 32px; }

    .card {
      padding: 22px 16px 20px;
      border-radius: 12px;
    }
  }

  /* Very small phones */
  @media (max-width: 360px) {
    .topbar-subtitle { display: none; }
    .card { padding: 18px 12px 16px; }
    .topbar-title { font-size: 12.5px; }
  }
`;

export default function Login() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suRole, setSuRole] = useState("");

  const roles = [
    "Judge",
    "Prosecutor",
    "Defence Attorney",
    "Court Clerk",
    "Administrator",
    "Law Enforcement",
  ];

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regex.test(email)) return false;
  const blockedDomains = [
    "gmaill.com", "gmial.com", "gmai.com", "gmailll.com",
    "yahooo.com", "yaho.com", "hotmial.com", "outlok.com",
    "gnail.com", "gamil.com", "gmail.co", "yahoo.co",
  ];
  const domain = email.split("@")[1].toLowerCase();
  if (blockedDomains.includes(domain)) return false;
  return true;
};

const getFriendlyError = (code) => {
  switch (code) {
    case "auth/invalid-email":         return "Invalid email address format.";
    case "auth/user-not-found":        return "No account found with this email.";
    case "auth/wrong-password":        return "Incorrect password. Please try again.";
    case "auth/invalid-credential":    return "Incorrect email or password.";
    case "auth/email-already-in-use":  return "An account with this email already exists.";
    case "auth/weak-password":         return "Password must be at least 6 characters.";
    case "auth/too-many-requests":     return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":return "Network error. Check your connection.";
    case "auth/user-disabled":         return "This account has been disabled.";
    default:                           return "Something went wrong. Please try again.";
  }
};

const handleLogin = async () => {
  if (!email || !password || !role) {
    setMessage({ type: "error", text: "Please fill in all required fields." });
    return;
  }
  if (!isValidEmail(email)) {
    setMessage({ type: "error", text: "Please enter a valid email address." });
    return;
  }
  setLoading(true);
  setMessage(null);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setMessage({ type: "success", text: `Logged in as ${role}. Welcome back!` });
  } catch (error) {
    setMessage({ type: "error", text: getFriendlyError(error.code) });
  } finally {
    setLoading(false);
  }
};

const handleSignUp = async () => {
  if (!suName || !suEmail || !suPassword || !suRole) {
    setMessage({ type: "error", text: "Please fill in all required fields." });
    return;
  }
  if (!isValidEmail(suEmail)) {
    setMessage({ type: "error", text: "Please enter a valid email address." });
    return;
  }
  if (suPassword.length < 6) {
    setMessage({ type: "error", text: "Password must be at least 6 characters." });
    return;
  }
  setLoading(true);
  setMessage(null);
  sessionStorage.setItem("blockRedirect", "true");
  try {
    await createUserWithEmailAndPassword(auth, suEmail, suPassword);
    await signOut(auth);
    sessionStorage.removeItem("blockRedirect");
    setMessage({ type: "success", text: "Account created! Please log in to continue." });
    setTab("login");
    setSuName(""); setSuEmail(""); setSuPassword(""); setSuRole("");
  } catch (error) {
    sessionStorage.removeItem("blockRedirect");
    setMessage({ type: "error", text: getFriendlyError(error.code) });
  } finally {
    setLoading(false);
  }
};


//   const handleLogin = async () => {
//     if (!email || !password || !role) {
//       setMessage({
//         type: "error",
//         text: "Please fill in all required fields.",
//       });
//       return;
//     }
//     setLoading(true);
//     setMessage(null);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setMessage({
//         type: "success",
//         text: `Logged in as ${role}. Welcome back!`,
//       });
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: error.message.replace("Firebase: ", ""),
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleSignUp = async () => {
//   if (!suName || !suEmail || !suPassword || !suRole) {
//     setMessage({ type: "error", text: "Please fill in all required fields." });
//     return;
//   }
//   setLoading(true);
//   setMessage(null);

//   // Block dashboard redirect BEFORE creating account
//   sessionStorage.setItem("blockRedirect", "true");

//   try {
//     await createUserWithEmailAndPassword(auth, suEmail, suPassword);
//     await signOut(auth);
//     sessionStorage.removeItem("blockRedirect");
//     setMessage({ type: "success", text: "Account created! Please log in to continue." });
//     setTab("login");
//     setSuName(""); setSuEmail(""); setSuPassword(""); setSuRole("");
//   } catch (error) {
//     sessionStorage.removeItem("blockRedirect");
//     setMessage({ type: "error", text: error.message.replace("Firebase: ", "") });
//   } finally {
//     setLoading(false);
//   }
// };

  const switchTab = (t) => {
    setTab(t);
    setMessage(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* ── Sidebar (desktop only) ── */}
        <div className="left-panel">
          <div className="logo-ring">
            <span className="logo-icon">🏛️</span>
          </div>
          <div className="brand-title">
            NIZAM
            <br />E<br />
            HUKAM
          </div>
          <div className="gold-divider" />
          <div className="brand-tagline">
            Justice. Transparency.
            <br />
            Accountability.
          </div>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>Secure role-based access
            </div>
            <div className="feature-item">
              <span className="feature-icon">💬</span>Real-time case tracking
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>All court roles supported
            </div>
          </div>
        </div>

        {/* ── Top Bar (mobile/tablet only) ── */}
        <div className="mobile-topbar">
          <div className="topbar-main">
            <div className="topbar-logo">🏛️</div>
            <div className="topbar-text">
              <div className="topbar-title">NIZAM E HUKAM</div>
              <div className="topbar-subtitle">
                Justice · Transparency · Accountability
              </div>
            </div>
          </div>
          <div className="topbar-pills">
            <div className="topbar-pill">
              <span className="pill-dot"></span>Secure Access
            </div>
            <div className="topbar-pill">
              <span className="pill-dot"></span>Real-time Tracking
            </div>
            <div className="topbar-pill">
              <span className="pill-dot"></span>All Court Roles
            </div>
          </div>
        </div>

        {/* ── Right Panel / Form ── */}
        <div className="right-panel">
          <div className="card">
            <div className="card-title">
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </div>
            <div className="card-subtitle">
              {tab === "login"
                ? "Login to continue to your account"
                : "Join the management system"}
            </div>

            <div className="tab-row">
              <button
                className={`tab-btn ${tab === "login" ? "active" : "inactive"}`}
                onClick={() => switchTab("login")}
              >
                Login
              </button>
              <button
                className={`tab-btn ${tab === "signup" ? "active" : "inactive"}`}
                onClick={() => switchTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {message && (
              <div className={`alert ${message.type}`}>{message.text}</div>
            )}

            {tab === "login" ? (
              <>
                <div className="field-group">
                  <label className="field-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">✉️</span>
                    <input
                      className="field-input"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Password <span className="required-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input
                      className="field-input"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="eye-btn"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Role / Category <span className="required-star">*</span>
                  </label>
                  <div className="select-wrap">
                    <span className="select-icon">👤</span>
                    <select
                      className={`field-select ${!role ? "placeholder-color" : ""}`}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                </div>

                <div className="remember-row">
                  <label className="remember-label">
                    <input
                      type="checkbox"
                      className="remember-checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <button className="forgot-link">Forgot Password?</button>
                </div>

                <button
                  className="login-btn"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in…" : "Login"}
                </button>
              </>
            ) : (
              <>
                <div className="field-group">
                  <label className="field-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                      className="field-input"
                      type="text"
                      placeholder="Enter your full name"
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">✉️</span>
                    <input
                      className="field-input"
                      type="email"
                      placeholder="Enter your email"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Password <span className="required-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input
                      className="field-input"
                      type={showPass ? "text" : "password"}
                      placeholder="Create a password"
                      value={suPassword}
                      onChange={(e) => setSuPassword(e.target.value)}
                    />
                    <button
                      className="eye-btn"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Role / Category <span className="required-star">*</span>
                  </label>
                  <div className="select-wrap">
                    <span className="select-icon">👤</span>
                    <select
                      className={`field-select ${!suRole ? "placeholder-color" : ""}`}
                      value={suRole}
                      onChange={(e) => setSuRole(e.target.value)}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                </div>

                <button
                  className="login-btn"
                  onClick={handleSignUp}
                  disabled={loading}
                >
                  {loading ? "Creating account…" : "Create Account"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
