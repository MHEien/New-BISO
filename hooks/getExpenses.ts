import { query, collectionGroup, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthentication } from "./useAuthentication";
import { useState } from "react";
import { Expense } from "../types";

const getExpenses = async (uid: string): Promise<Expense[]> => {


    const q = query(collectionGroup(db, 'expenses'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const expenses: Expense[] = [];
    querySnapshot.forEach((doc) => {
        expenses.push(doc.data() as Expense);
    });
    return expenses;
};

export { getExpenses };
