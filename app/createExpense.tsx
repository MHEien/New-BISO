import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link, useRouter } from 'expo-router';
import { useThemeColor } from '../components/Themed';



interface Contact {
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

const getProfile = (): Contact | null => {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Springfield',
      departments: [{ id: 1, name: 'IT' }],
    };
  };

  const getDepartments = (): Department[] => {
    return [
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' },
      { id: 3, name: 'Marketing' },
    ];
  };

const SubmitExpense: React.FC = () => {
    const contact: Contact | null = getProfile();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [preferredDepartments, setPreferredDepartments] = useState<Department[]>([]);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const router = useRouter();

  const primaryColor = useThemeColor({}, 'primary');




  useEffect(() => {
    (async () => {
      const fetchedContact = await getProfile();
      const fetchedDepartments = await getDepartments();
      setDepartments(fetchedDepartments);
        if (fetchedContact) {
            setPreferredDepartments(fetchedContact.departments);
            setSelectedDepartment(fetchedContact.departments[0].id.toString());
        }
    })();
  }, []);

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
        <Text>Contact & Payout details fetched from</Text>
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
  
