import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Subunit } from '../types';

const getDepartments = async (): Promise<Subunit[]> => {
  const departmentsCollection = collection(db, 'departments');
  const departmentsSnapshot = await getDocs(departmentsCollection);
  const departmentsArray = departmentsSnapshot.docs.map(doc => ({
    name: doc.data().Name,
    id: doc.data().DepartmentId,
    campus: doc.data().Campus,
  }));
  return departmentsArray;
};

export default getDepartments;
