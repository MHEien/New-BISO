import { db } from '../config/firebase';
import { ElectionProps } from '../types';
import { query, getDocs, collection, collectionGroup, where, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

const getElections = async (email: string) => {
    const elections: ElectionProps[] = [];
    const q = query(collectionGroup(db, 'elections'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        elections.push(doc.data() as ElectionProps);
    }, []);
    return elections;
}

const getCurrentElection = async (electionCode: string) => {
    const electionRef = collection(db, 'elections');
    const q = query(electionRef, where('code', '==', electionCode));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data() as ElectionProps;
}

const getActivePositions = async (electionId: string) => {
    const positions: any[] = [];
    const q = query(collectionGroup(db, `positions`), where('status', '==', 'true'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        positions.push(doc.data());
    }, []);
    return positions;
}

const getCandidatesForPosition = async (positionId: string) => {
    const candidates: any[] = [];
    const q = query(collectionGroup(db, `candidates`), where('positionId', '==', positionId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        candidates.push(doc.data());
    });
    return candidates;
}
    



const castVote = async (electionId: string, positionId: string, candidateId: string, voterKey: string) => {
    const votesRef = doc(db, `elections/${electionId}/positions/${positionId}/candidates/${candidateId}/votes/${voterKey}`);
    await setDoc(votesRef, { voterKey });
}

const getVoterKey = async (electionId: string, email: string) => {
    const voterRef = doc(db, `elections/${electionId}/voters/${email}`);
    const voterDoc = await getDoc(voterRef);
    if (!voterDoc.exists()) {
        return null;
    }
    return voterDoc.data().voterKey
}


export { getElections, getCurrentElection, getActivePositions, castVote, getVoterKey, getCandidatesForPosition };