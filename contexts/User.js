import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { get, ref, set } from "firebase/database";
import { LoggedInUser } from "./LoggedInUser";

export const UserContext = createContext();

export const UserProvider = ({ children, setIsUsernameCreated }) => {
  const { loggedInUser } = useContext(LoggedInUser);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = ref(db, `users/${loggedInUser.displayName}`);
      try {
        const snapshot = await get(userRef);
        setUser({
          ...snapshot.val(),
          uid: loggedInUser.uid,
          username: loggedInUser.displayName,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (loggedInUser && loggedInUser.displayName) fetchUser();
  }, [loggedInUser, setIsUsernameCreated]);

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
  );
};
