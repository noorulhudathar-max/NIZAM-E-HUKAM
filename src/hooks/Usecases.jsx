import { useState, useEffect } from "react";
import { db } from "../firebase";
import { 
  collection, query, where, onSnapshot, 
  doc, updateDoc, deleteDoc, addDoc, serverTimestamp 
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function useCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "cases"), where("userId", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setCases(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [user]);

  const addCase = async (caseData) => {
    return await addDoc(collection(db, "cases"), {
      ...caseData,
      userId: user.uid,
      done: false,
      createdAt: serverTimestamp()
    });
  };

  const updateCase = async (id, data) => {
    return await updateDoc(doc(db, "cases", id), data);
  };

  const deleteCase = async (id) => {
    return await deleteDoc(doc(db, "cases", id));
  };

  const markDone = async (id, isDone) => {
    return await updateDoc(doc(db, "cases", id), { done: isDone });
  };

  return { cases, loading, addCase, updateCase, deleteCase, markDone };
}
