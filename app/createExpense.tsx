import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { useThemeColor } from '../components/Themed';
import { useAuthentication } from '../hooks/useAuthentication';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { View, Text } from '../components/Themed';
import { getDepartments, useUserProfile } from '../hooks';
import { Attachment, Department } from '../types';
import Selector from '../components/Selector';



const SubmitExpense: React.FC = () => {
  const { user } = useAuthentication();
  const uid = user?.uid
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [favoriteDepartments, setFavoriteDepartments] = useState<Department[]>([]);
  const [activeDepartments, setActiveDepartments] = useState<Department[]>([]);

  const { profile } = useUserProfile();
  const [withoutProfile, setWithoutProfile] = useState('');
  
  const primaryColor = useThemeColor({}, 'primary');
  
  React.useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
    };
    fetchDepartments();
  }, []);

  React.useEffect(() => {
    if (profile && profile.subunits) {
      setFavoriteDepartments(
        profile.subunits
          .map((id) => departments.find((dept) => dept.id === Number(id)))
          .filter((dept): dept is Department => dept !== undefined)
      );
    }
  }, [profile, departments]);
  
  
  
  

  const addAttachment = () => {
    setAttachments([
      ...attachments,
      { description: '', amount: 0, date: new Date() },
    ]);
  };


    const switchDepartments = () => {
    setShowAllDepartments(!showAllDepartments);
    };
    



  return (
    <View>
        <View style={[{ flexDirection: 'row', paddingTop: 10 }]}>
        <Text>Hi {profile?.firstName} {profile?.lastName}!</Text>
        <Link href="/profile" style={{ color: primaryColor, fontWeight: 'bold' }}>
            <Text> Profile</Text>
        </Link>
        </View>
      <View style={styles.column}>
        {favoriteDepartments.length === 1 && !showAllDepartments ? (
          <Text style={styles.departmentText}>Department: {favoriteDepartments[0].name}</Text>
        ) : (
        <View style={styles.column}>
             <Text>Department:</Text>
             <Selector
                visible={showAllDepartments}
                data={departments.map((department) => ({ id: department.id ? department.id.toString() : '', color: 'blue', label: department.name }))}
                enableFavorites={true}
                enableSearch={true}
                onSelect={(item) => {
                  setSelectedDepartment(item.id);
                  setShowAllDepartments(false);
                }}
                onClose={() => setShowAllDepartments(false)}
                selectedItems={favoriteDepartments.map((dept) => dept.id.toString())}
              />
              <Button title="Select department" onPress={switchDepartments} />
        </View>
        )}
        </View>
        <Text>Attachments:</Text>
      {attachments.map((attachment, index) => (
        <View key={index}>
          <Text>Attachment {index + 1}:</Text>
          <TextInput
            placeholder="Description"
            value={attachment.description}
            onChangeText={(text) =>
              setAttachments([
                ...attachments.slice(0, index),
                { ...attachment, description: text },
                ...attachments.slice(index + 1),
              ])
            }
          />
          <TextInput
            placeholder="Amount"
            value={attachment.amount.toString()}
            onChangeText={(text) =>
              setAttachments([
                ...attachments.slice(0, index),
                { ...attachment, amount: parseFloat(text) },
                ...attachments.slice(index + 1),
              ])
            }
          />
          <TextInput
            placeholder="Date (yyyy-mm-dd)"
            value={attachment.date.toISOString().split('T')[0]}
            onChangeText={(text) =>
                setAttachments([
                  ...attachments.slice(0, index),
                  { ...attachment, date: new Date(text) },
                  ...attachments.slice(index + 1),
                ])
              }
            />
          </View>
        ))}
        <Button title="Add Attachment" onPress={addAttachment} />
        <Button
          title="Submit Expense"
          onPress={() => {
            // Add functionality to submit the expense
            console.log('Submitting expense...');
          }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    departmentText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
  });
  
  export default SubmitExpense;
  
