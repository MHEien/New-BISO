import { db } from '../config/firebase';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";  

//generate invoiceId
export const getNextInvoiceId = async () => {
    const q = query(collectionGroup(db, "expenses"), where("invoiceId", ">", 0));
    const querySnapshot = await getDocs(q);
    let invoiceId = '';
    querySnapshot.forEach((doc) => {
        if (doc.data().invoiceId > invoiceId) {
            invoiceId = doc.data().invoiceId;
        }
    });
    return invoiceId + 1;
};