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



interface Profile {
    name: string;
    email: string;
    phone: string;
    address: string;
    departments: Department[];
  }

interface Department {
  id: number;
  name: string;
}

interface Attachment {
  description: string;
  amount: number;
  date: Date;
}


  const getDepartments = (): Department[] => {
    return [
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' },
      { id: 3, name: 'Marketing' },
    ];
  };

const SubmitExpense: React.FC = () => {
  const { user } = useAuthentication();
  const uid = user?.uid
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [preferredDepartments, setPreferredDepartments] = useState<Department[]>([]);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    departments: [],
  });  


  //Fetch profile data from users collection
  const getProfile = async () => {
    if (!user) {
      setProfile({
        name: '',
        email: '',
        phone: '',
        address: '',
        departments: [],
      });
      return;
    }
    
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    if (userData) {
      setProfile({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        departments: userData.departments,
      });
    } else {
      setProfile({
        name: '',
        email: '',
        phone: '',
        address: '',
        departments: [],
      });
    }
  };
  

  const primaryColor = useThemeColor({}, 'primary');




  useEffect(() => {
    (async () => {
      setDepartments(getDepartments());
      await getProfile();
    })();
  }, [user]);
  

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
        <Text>Hi {profile.name}</Text>
        <Link href="/profile" style={{ color: primaryColor, fontWeight: 'bold' }}>
            <Text> Profile</Text>
        </Link>
        </View>
      <View style={styles.column}>
        {preferredDepartments.length === 1 && !showAllDepartments ? (
          <Text style={styles.departmentText}>Department: {preferredDepartments[0].name}</Text>
        ) : (
        <View style={styles.column}>
             <Text>Department:</Text>
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
            style={{ height: 50, width: 150 }}
          >
            {(preferredDepartments.length > 0 && showAllDepartments === false
              ? preferredDepartments
              : departments
            ).map((dept) => (
              <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
            ))}
          </Picker>
        </View>
        )}
        <Switch
          onValueChange={switchDepartments}
          value={showAllDepartments}
        />
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
  
