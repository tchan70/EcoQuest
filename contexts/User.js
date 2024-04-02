import { createContext, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { FIREBASE_AUTH } from "../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
  });

  const updateUserPoints = (pointsToAdd) => {
    const newPoints = user.points + pointsToAdd;
    const userRef = ref(db, `users/${user.username}/points`);
    set(userRef, newPoints)
      .then(() => {
        setUser((currentUser) => ({
          ...currentUser,
          points: newPoints,
        }));
      })
      .catch((error) => {
        console.error("Error updating user points in Firebase:", error);
      });
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, updateUserPoints }}>
      {children}
    </UserContext.Provider>
  )
}
