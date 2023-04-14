import { query, collectionGroup, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthentication } from "./useAuthentication";
import { useState } from "react";
import { Expense } from "../types";

const getExpenses = async (): Promise<Expense[]> => {

    const { user } = useAuthentication();

    if (!user) return [];

    const q = query(collectionGroup(db, 'expenses'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const expenses: Expense[] = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        expenses.push(doc.data() as Expense);
    });
    return expenses;
};

export { getExpenses };
