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
import Accordion from '../components/Accordion';



const SubmitExpense: React.FC = () => {
  const { user } = useAuthentication();
  const uid = user?.uid
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [favoriteDepartments, setFavoriteDepartments] = useState<Department[]>([]);
  const [activeDepartments, setActiveDepartments] = useState<Department[]>(favoriteDepartments);
  const [allSelected, setAllSelected] = useState(false);

  const { profile } = useUserProfile();
  const [withoutProfile, setWithoutProfile] = useState('');
  
  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  
  React.useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
    };
    fetchDepartments();
  }, []);

  React.useEffect(() => {
    if (profile && profile.subunits) {
      const favDepartments = departments.filter((dept) =>
        profile.subunits.includes(dept.name)
      );
      setFavoriteDepartments(favDepartments);
    }
  }, [profile, departments]);
  
  
  
  
  

  const addAttachment = () => {
    setAttachments([
      ...attachments,
      { description: '', amount: 0, date: new Date() },
    ]);
  };


  const switchDepartments = () => {
    setAllSelected(!allSelected);
  };
  
  const openModal = () => {
    setModalOpen(true);
  };

    



  return (
    <View>
        <View style={[{ flexDirection: 'row', paddingTop: 10 }]}>
        <Link href="/profile" style={{ color: primaryColor, fontWeight: 'bold' }}>
        <Text>Hi {profile?.firstName}! We have fetched your details from your profile. If you require any changes, please update your profile.</Text>
        </Link>
        </View>
      <View style={styles.column}>
      {favoriteDepartments.length === 1 && !allSelected ? (
        <Text style={styles.departmentText}>
          Department: {favoriteDepartments[0].name}
        </Text>
      ) : (
        <View style={styles.column}>
          <Text>Department:</Text>
          <Selector
            visible={modalOpen}
            data={(allSelected ? departments : favoriteDepartments).map(
              (department) => ({
                id: department.id ? department.id.toString() : '',
                color: 'blue',
                label: department.name,
              })
            )}
            enableFavorites={true}
            enableSearch={true}
            onSelect={(item) => {
              setSelectedDepartment(item.id);
              setShowAllDepartments(false);
            }}
            onClose={() => setModalOpen(false)}
            selectedItems={favoriteDepartments.map((dept) =>
              dept.id.toString()
            )}
          />
          <TouchableOpacity onPress={openModal}>
            <Text style={{ color: textColor, fontWeight: 'bold' }}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
        )}
        </View>
<Text>Attachments:</Text>
{attachments.map((attachment, index) => (
 <Accordion
 key={index}
 title={`Attachment ${index + 1}`}
 deleteable={true}
 onDelete={() => {
  console.log('Deleted attachment');
   const updatedAttachments = [...attachments];
   updatedAttachments.splice(index, 1);
   setAttachments(updatedAttachments);
  }}
  content={
    <View>
        <TextInput
          placeholder="Amount"
          style={{ color: textColor }}
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
          style={{ color: textColor }}
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
    }
  />
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
  
