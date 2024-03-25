import { db } from '../firebaseConfig';
import { ref, onValue, set } from 'firebase/database'


export const getPoints = (user, setData) => {
    const pointsRef = ref(db, `users/${user}/points`)
    onValue(pointsRef, (snapshot) => {
        const data = snapshot.val()
        setData(data);
    })

}


export const updatePoints = (user, points) => {
    set(ref(db, `users/${user}/points`), points)
}


