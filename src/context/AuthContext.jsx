import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const defaultValue = {
  user: null,
  profile: null,
  loading: true,
  searchQuery: "",
  setSearchQuery: () => {},
  refreshProfile: () => Promise.resolve(),
};

const AuthContext = createContext(defaultValue);

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx ?? defaultValue;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 2. Add the global search state here
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, "users", firebaseUser.uid);
        
        try {
          const snap = await getDoc(userDocRef);
          
          if (snap.exists()) {
            setProfile({ id: snap.id, ...snap.data() });
          } else {
            const newProfile = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || "User",
              photoURL: firebaseUser.photoURL || "",
              role: "Member",
              createdAt: serverTimestamp(),
            };
            
            await setDoc(userDocRef, newProfile);
            setProfile({ id: firebaseUser.uid, ...newProfile });
          }
        } catch (error) {
          console.error("Error fetching/creating profile:", error);
          setProfile({});
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    
    return unsub;
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setProfile({ id: snap.id, ...snap.data() });
      }
    } catch (err) {
      console.error("Error refreshing profile:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      searchQuery, 
      setSearchQuery, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}