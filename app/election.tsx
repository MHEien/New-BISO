import React, { useState, useEffect } from 'react';
import { View, Text, useThemeColor } from '../components/Themed';
import { StyleSheet } from 'react-native';
import { useAuthentication } from '../hooks/useAuthentication';
import {
    ElectionProps,
    Position,
} from '../types';
import { getActivePositions, getCurrentElection, getVoterKey } from '../hooks/electionHooks';
import { useRouter, useSearchParams } from 'expo-router';
import VotingSession from '../components/VotingSession';

const ElectionScreen = () => {
    const { user } = useAuthentication();
    const uid = user?.uid;
    const email = user?.email;



    const params = useSearchParams();

    const { electionCode } = params as { electionCode: string };

    const router = useRouter();

    const [election, setElection] = useState<ElectionProps>();
    const electionId = election?.id || '';
    const [positions, setPositions] = useState<Position[]>([]);
    const [voterKey, setVoterKey] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const election = await getCurrentElection(electionCode);
            setElection(election);

            const positions = await getActivePositions(election.id);
            setPositions(positions);
        };

        fetchData();
    }, [electionCode]);

    useEffect(() => {
        if (election?.voterKeyRequired) {
            getVoterKey(electionId, email || '').then((voterKey) => {
                if (!voterKey) {
                    router.push('/elections');
                } else {
                    setVoterKey(voterKey);
                }
            });
        }
    }, [electionCode, uid]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{election?.name}</Text>
            <Text style={styles.description}>{election?.description}</Text>
            <VotingSession
                positions={positions}
                election={electionId}
                voterKey={voterKey}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default ElectionScreen;
