// src/pages/Settings.jsx
// import { useState } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
// import { db, auth } from "../firebase";
// import { useAuth } from "../context/AuthContext";

// const ROLES = ["Judge","Lawyer","Prosecutor","Court Clerk","Investigator","Paralegal"];

// export default function Settings() {
//   const { user, profile, refreshProfile } = useAuth();
//   const [tab, setTab] = useState("profile");

//   return (
//     <div className="page">
//       <div className="breadcrumb">Dashboard › Settings</div>
//       <h1 className="page-title">Profile / Settings</h1>

//       <div className="settings-card">
//         {/* Tabs */}
//         <div className="settings-tabs">
//           {["profile", "password", "preferences"].map((t) => (
//             <button
//               key={t}
//               className={`settings-tab ${tab === t ? "settings-tab--active" : ""}`}
//               onClick={() => setTab(t)}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//               {t === "password" && " Change"}
//             </button>
//           ))}
//         </div>

//         {tab === "profile"     && <ProfileTab user={user} profile={profile} refreshProfile={refreshProfile} />}
//         {tab === "password"    && <PasswordTab user={user} />}
//         {tab === "preferences" && <PreferencesTab />}
//       </div>
//     </div>
//   );
// }

// function ProfileTab({ user, profile, refreshProfile }) {
//   const [form, setForm] = useState({
//     name:     profile?.name     || "",
//     email:    profile?.email    || user?.email || "",
//     phone:    profile?.phone    || "",
//     category: profile?.category || "",
//     court:    profile?.court    || "",
//     bar_no:   profile?.bar_no   || "",
//   });
//   const [saving, setSaving] = useState(false);
//   const [msg,    setMsg]    = useState("");

//   const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateDoc(doc(db, "users", user.uid), {
//         name: form.name, phone: form.phone,
//         category: form.category, court: form.court, bar_no: form.bar_no,
//       });
//       await refreshProfile();
//       setMsg("Profile updated successfully!");
//       setTimeout(() => setMsg(""), 3000);
//     } catch (err) {
//       setMsg("Error: " + err.message);
//     }
//     setSaving(false);
//   };

//   return (
//     <div className="settings-body">
//       <div className="settings-form">
//         <div className="form-row-2">
//           <div className="form-group">
//             <label className="form-label">Full Name</label>
//             <input className="form-input" value={form.name} onChange={f("name")} />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Email Address</label>
//             <input className="form-input" value={form.email} disabled style={{ opacity:.6 }} />
//           </div>
//         </div>
//         <div className="form-row-2">
//           <div className="form-group">
//             <label className="form-label">Mobile Number</label>
//             <input className="form-input" value={form.phone} onChange={f("phone")} placeholder="+1 987 654 3210" />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Role / Category</label>
//             <select className="form-select" value={form.category} onChange={f("category")}>
//               <option value="">Select role</option>
//               {ROLES.map((r) => <option key={r}>{r}</option>)}
//             </select>
//           </div>
//         </div>
//         <div className="form-row-2">
//           <div className="form-group">
//             <label className="form-label">Court / Chamber</label>
//             <input className="form-input" value={form.court} onChange={f("court")} placeholder="Sindh High Court" />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Bar / Reg. No.</label>
//             <input className="form-input" value={form.bar_no} onChange={f("bar_no")} placeholder="SHC-2024-..." />
//           </div>
//         </div>
//       </div>

//       {msg && <div className={`settings-msg ${msg.startsWith("Error") ? "settings-msg--error" : "settings-msg--success"}`}>{msg}</div>}

//       <button className="btn btn--primary btn--full" onClick={handleSave} disabled={saving}>
//         {saving ? "Saving…" : "Update Profile"}
//       </button>
//     </div>
//   );
// }

// function PasswordTab({ user }) {
//   const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
//   const [saving, setSaving] = useState(false);
//   const [msg,    setMsg]    = useState("");

//   const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

//   const handleChange = async () => {
//     if (form.newPw !== form.confirm) { setMsg("New passwords do not match."); return; }
//     if (form.newPw.length < 8) { setMsg("Password must be at least 8 characters."); return; }
//     setSaving(true);
//     try {
//       const cred = EmailAuthProvider.credential(user.email, form.current);
//       await reauthenticateWithCredential(user, cred);
//       await updatePassword(user, form.newPw);
//       setMsg("Password changed successfully!");
//       setForm({ current: "", newPw: "", confirm: "" });
//     } catch (err) {
//       setMsg("Error: " + (err.code === "auth/wrong-password" ? "Current password is incorrect." : err.message));
//     }
//     setSaving(false);
//     setTimeout(() => setMsg(""), 4000);
//   };

//   return (
//     <div className="settings-body">
//       <div className="settings-form">
//         {[
//           { k:"current", label:"Current Password",  ph:"Enter current password" },
//           { k:"newPw",   label:"New Password",      ph:"Min 8 characters" },
//           { k:"confirm", label:"Confirm Password",  ph:"Repeat new password" },
//         ].map(({ k, label, ph }) => (
//           <div key={k} className="form-group">
//             <label className="form-label">{label}</label>
//             <input className="form-input" type="password" placeholder={ph} value={form[k]} onChange={f(k)} />
//           </div>
//         ))}
//       </div>
//       {msg && <div className={`settings-msg ${msg.startsWith("Error") ? "settings-msg--error" : "settings-msg--success"}`}>{msg}</div>}
//       <button className="btn btn--primary" onClick={handleChange} disabled={saving}>
//         {saving ? "Changing…" : "Change Password"}
//       </button>
//     </div>
//   );
// }

// function PreferencesTab() {
//   const [notif, setNotif] = useState({ email: true, sms: false, browser: true });
//   return (
//     <div className="settings-body">
//       <h3 className="pref-heading">Notification Preferences</h3>
//       {[
//         { k:"email",   label:"Email Notifications",   sub:"Receive updates via email" },
//         { k:"sms",     label:"SMS Notifications",     sub:"Receive SMS alerts for hearings" },
//         { k:"browser", label:"Browser Notifications", sub:"Show push notifications in browser" },
//       ].map(({ k, label, sub }) => (
//         <div key={k} className="pref-row">
//           <div>
//             <div className="pref-label">{label}</div>
//             <div className="pref-sub">{sub}</div>
//           </div>
//           <label className="toggle">
//             <input type="checkbox" checked={notif[k]} onChange={(e) => setNotif((p) => ({ ...p, [k]: e.target.checked }))} />
//             <span className="toggle-slider" />
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// }

// src/pages/Settings.jsx
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { db, auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const ROLES = ["Judge","Lawyer","Prosecutor","Court Clerk","Investigator","Paralegal"];

export default function Settings() {
  const { user, profile, refreshProfile } = useAuth();
  const [tab, setTab] = useState("profile");

  return (
    <div className="page">
      <div className="breadcrumb">Dashboard › Settings</div>
      <h1 className="page-title">Profile / Settings</h1>

      <div className="settings-card">
        {/* Tabs - Preferences removed from the array */}
        <div className="settings-tabs">
          {["profile", "password"].map((t) => (
            <button
              key={t}
              className={`settings-tab ${tab === t ? "settings-tab--active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === "password" && " Change"}
            </button>
          ))}
        </div>

        {tab === "profile"  && <ProfileTab user={user} profile={profile} refreshProfile={refreshProfile} />}
        {tab === "password" && <PasswordTab user={user} />}
      </div>
    </div>
  );
}

function ProfileTab({ user, profile, refreshProfile }) {
  const [form, setForm] = useState({
    name:     profile?.name     || "",
    email:    profile?.email    || user?.email || "",
    phone:    profile?.phone    || "",
    category: profile?.category || "",
    court:    profile?.court    || "",
    bar_no:   profile?.bar_no   || "",
  });
  const [saving, setSaving] = useState(false);
  const [msg,    setMsg]    = useState("");

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: form.name, phone: form.phone,
        category: form.category, court: form.court, bar_no: form.bar_no,
      });
      await refreshProfile();
      setMsg("Profile updated successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="settings-body">
      <div className="settings-form">
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={f("name")} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" value={form.email} disabled style={{ opacity:.6 }} />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input className="form-input" value={form.phone} onChange={f("phone")} placeholder="+1 987 654 3210" />
          </div>
          <div className="form-group">
            <label className="form-label">Role / Category</label>
            <select className="form-select" value={form.category} onChange={f("category")}>
              <option value="">Select role</option>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Court / Chamber</label>
            <input className="form-input" value={form.court} onChange={f("court")} placeholder="Sindh High Court" />
          </div>
          <div className="form-group">
            <label className="form-label">Bar / Reg. No.</label>
            <input className="form-input" value={form.bar_no} onChange={f("bar_no")} placeholder="SHC-2024-..." />
          </div>
        </div>
      </div>

      {msg && <div className={`settings-msg ${msg.startsWith("Error") ? "settings-msg--error" : "settings-msg--success"}`}>{msg}</div>}

      <button className="btn btn--primary btn--full" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Update Profile"}
      </button>
    </div>
  );
}

function PasswordTab({ user }) {
  const [form, setForm] = useState({ current: "", newPw: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [msg,    setMsg]    = useState("");

  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleChange = async () => {
    if (form.newPw !== form.confirm) { setMsg("New passwords do not match."); return; }
    if (form.newPw.length < 8) { setMsg("Password must be at least 8 characters."); return; }
    setSaving(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, form.current);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, form.newPw);
      setMsg("Password changed successfully!");
      setForm({ current: "", newPw: "", confirm: "" });
    } catch (err) {
      setMsg("Error: " + (err.code === "auth/wrong-password" ? "Current password is incorrect." : err.message));
    }
    setSaving(false);
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="settings-body">
      <div className="settings-form">
        {[
          { k:"current", label:"Current Password",  ph:"Enter current password" },
          { k:"newPw",   label:"New Password",      ph:"Min 8 characters" },
          { k:"confirm", label:"Confirm Password",  ph:"Repeat new password" },
        ].map(({ k, label, ph }) => (
          <div key={k} className="form-group">
            <label className="form-label">{label}</label>
            <input className="form-input" type="password" placeholder={ph} value={form[k]} onChange={f(k)} />
          </div>
        ))}
      </div>
      {msg && <div className={`settings-msg ${msg.startsWith("Error") ? "settings-msg--error" : "settings-msg--success"}`}>{msg}</div>}
      <button className="btn btn--primary" onClick={handleChange} disabled={saving}>
        {saving ? "Changing…" : "Change Password"}
      </button>
    </div>
  );
}