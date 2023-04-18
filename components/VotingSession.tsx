import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Position, ActiveVotingSession, Candidate, Vote } from '../types';
import { getCandidatesForPosition } from '../hooks/electionHooks';
import { useThemeColor } from '../components/Themed';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const VotingSession = ({ positions, election, voterKey }: ActiveVotingSession) => {
    const [votes, setVotes] = useState<Vote[]>([]);
    const [currentPosition, setCurrentPosition] = useState(0);
    const router = useRouter();
    const backgroundColor = useThemeColor({}, 'primaryBackground');
    const textColor = useThemeColor({}, 'text');

    const fetchCandidates = async () => {
        console.log('Fetching candidates for positions:', positions);
        const updatedPositions = await Promise.all(
            positions.map(async (position) => {
                console.log('Fetching candidates for position:', position);
                const candidates = await getCandidatesForPosition(position.id);
                console.log('Candidates fetched for position:', position, candidates);
                return { ...position, candidates };
            })
        );
        console.log('Updated positions:', updatedPositions);
    };

    useEffect(() => {
        if (positions.length > 0) {
            fetchCandidates();
        }
    }, [positions]);


    const handleVote = (candidateId: string | null) => {
        if (candidateId) {
            setVotes([
                ...votes,
                {
                    id: '',
                    candidate: candidateId,
                    voterKey,
                    election: election,
                    position: positions[currentPosition].id,
                },
            ]);
        }
        if (currentPosition < positions.length - 1) {
            setCurrentPosition(currentPosition + 1);
        } else {
            router.push('/elections');
        }
    };

    const resetVotes = () => {
        setVotes([]);
        setCurrentPosition(0);
    };

    if (positions.length === 0) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title, { color: textColor }]}>
                {positions[currentPosition].name}
            </Text>
            {positions[currentPosition].candidates.map((candidate) => (
                <TouchableOpacity
                    key={candidate.id}
                    style={[styles.candidate, { backgroundColor }]}
                    onPress={() => handleVote(candidate.id)}
                >
                    <Text style={[styles.candidateName, { color: textColor }]}>
                        {candidate.name}
                    </Text>
                </TouchableOpacity>
            ))}
            <View style={styles.buttons}>
                <TouchableOpacity

                    style={styles.resetButton}
                    onPress={resetVotes}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => handleVote(null)}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.voterKeyContainer}>
                <Text style={{ color: textColor }}>{voterKey}</Text>
            </View>
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
        marginBottom: 20,
    },
    candidate: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
    },
    candidateName: {
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.8,
        marginTop: 20,
    },
    resetButton: {
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    submitButton: {
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    voterKeyContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    voterKeyText: {
        fontSize: 16,
    },
});

export default VotingSession;
