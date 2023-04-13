import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Department } from '../types';

const getDepartments = async (): Promise<Department[]> => {
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
