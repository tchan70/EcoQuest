import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { get, ref, set } from "firebase/database";

export const UserContext = createContext();

export const UserProvider = ({ children, loggedInUser }) => {
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
    fetchUser();
  }, [loggedInUser]);

  const updateUserPoints = (pointsToAdd) => {
    const newPoints = user.points + pointsToAdd;
    const userRef = ref(db, `users/${user.username}/points`);
    console.log(user, "this is user in updateUserPoints before updating");
    console.log(userRef, "this is user in updateUserPoints before updating");
    console.log(pointsToAdd, "this is pointsToAdd");
    console.log(newPoints, "this is newPoints");
    set(userRef, newPoints)
      .then(() => {
        setUser((currentUser) => ({
          ...currentUser,
          points: newPoints,
        }));
        console.log(user, "this is user after being set in updateUserPoints");
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