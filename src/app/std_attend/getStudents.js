import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const students = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
