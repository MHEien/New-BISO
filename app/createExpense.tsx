import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Button, KeyboardAvoidingView, ScrollView, Platform, Switch, } from 'react-native';
import { useThemeColor, Text } from '../components/Themed';
import { useRouter } from 'expo-router';
import { getDepartments, useAuthentication } from '../hooks';
import { Expense, Attachment, Subunit } from '../types';
import Accordion from '../components/Accordion';
import TextInput from '../components/TextInput';
import IonIcons from '@expo/vector-icons/Ionicons';
import { getNextInvoiceId } from '../hooks/getInvoiceId';
import generatePurpose from '../hooks/getPurpose';
import { Camera, CameraType } from 'expo-camera';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Modal from '../components/Modal';
import CameraScreen from '../components/CameraModal';
import MlkitOcr from 'react-native-mlkit-ocr';
import axios from 'axios';
import Selector from '../components/Selector';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../config/firebase';

const CreateExpenseScreen: React.FC = () => {
  const router = useRouter();
  const { user, profile } = useAuthentication();
  const emptyExpense: Expense = {
    uid: user?.uid || '',
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    date: new Date(),
    outstanding: 0,
    prepayment: false,
    purpose: '',
    bankAccountNumber: '',
    campus: '',
    department: '',
    totalAmount: 0,
    attachments: [] as Attachment[],
    isApproved: false,
  };

  const [expenseDetails, setExpenseDetails] = useState<Expense>(emptyExpense);
  const [favoriteUnits, setFavoriteUnits] = useState<Subunit[]>([]);
  const [showDepartments, setShowDepartments] = useState(false);
  const [descriptionStringified, setDescriptionStringified] = useState<string>('');
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [purposeEnabled, setPurposeEnabled] = useState(false);
  const [allDepartments, setAllDepartments] = useState<Subunit[]>([]);
  const [showPurposeModal, setShowPurposeModal] = useState(false);


  React.useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setAllDepartments(departments);
    };
    fetchDepartments();
  }
  , []);

  const handleContactDetailsPress = () => {
    router.push('profile');
  };

  const handlePayoutDetailsPress = () => {
    router.push('profile');
  };

  const backgroundColor = useThemeColor({}, 'background');
  const primaryBackgroundColor = useThemeColor({}, 'primaryBackground');
  const textColor = useThemeColor({}, 'text');

// Initialize profile values or empty data.
useEffect(() => {
  if (profile) {
    setExpenseDetails({
      ...expenseDetails,
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: profile.address || '',
      city: profile.city || '',
      zip: profile.zip || '',
      bankAccountNumber: profile.bankAccount || '',
      campus: profile.campus || '',
      department: Array.isArray(profile.subunits) && profile.subunits.length > 0
      ? profile.subunits[0].name || ''
      : '',
      attachments: [] as Attachment[],
    });

    if (profile.subunits ) {
      if (profile.subunits.length > 0) {
      const favoriteUnits: Subunit[] = profile.subunits.map((subunit: string | Subunit) => {
        if (typeof subunit === 'string') {
          return { id: '0', name: subunit, campus: '' }; // Provide default values for id and campus
        }
        return subunit;
      });
      setFavoriteUnits(favoriteUnits);
    }
    else {
      setFavoriteUnits([]);
    }
  }
  }
}, [profile]);


const createExpense = async (expense: Expense) => {
  try {
  const expenseRef = collection(db, `users/${user?.uid}/expenses`);
  await addDoc(expenseRef, expense);
  } catch (error) {
    console.log(error);
  }
  const attachments = expenseDetails.attachments.map((attachment) => ({
    attachmentDescription: attachment.description,
    dateOfAttachment: attachment.date,
    amount: attachment.amount,
    image: attachment.file,
  }));
  const powerAutomateData = {
    firstname: expenseDetails.firstName,
    lastname: expenseDetails.lastName,
    address: expenseDetails.address,
    phone: expenseDetails.phone,
    city: expenseDetails.city,
    zip: expenseDetails.zip,
    email: expenseDetails.email,
    bank: expenseDetails.bankAccountNumber,
    org: expenseDetails.department,
    campus: expenseDetails.campus,
    purpose: expenseDetails.purpose,
    unit: expenseDetails.department,
    date: expenseDetails.date.toISOString(),
    prepayment: expenseDetails.prepayment || '',
    prepaymentAmount: expenseDetails.prepaymentAmount,
    attachments: attachments,
    total: expenseDetails.totalAmount.toString(),
    outstanding: expenseDetails.outstanding.toString(),
  };

  try {
    // Submit expense to Power Automate endpoint
    await axios.post('https://prod-137.westeurope.logic.azure.com:443/workflows/57b3e0b3246d4fa68c8c88a04c7f8c0c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=G3ENciWITukSRZfV39m-vFsvOI8_MFWGXJytIwSYQCI', powerAutomateData);
  } catch (error) {
    console.log(error);
  }
  router.push('expenses');
};


const DepartmentSelector = () => {
  const [showDepartments, setShowDepartments] = useState(false);
  
  // Return a TextInput if there are no favorite units available
  if (favoriteUnits.length === 0) {
    return (
      <View>
      <TouchableOpacity
        onPress={() => setShowDepartments(true)}
        style={[styles.fieldContainer, { backgroundColor: primaryBackgroundColor }]}
      >
        <Text style={{ color: textColor, fontSize: 16 }}>
          {expenseDetails.department || 'Velg avdeling'}
        </Text>
      </TouchableOpacity>
      <Selector
        allData={allDepartments}
        visible={showDepartments}
        onClose={() => setShowDepartments(false)}
        onSelect={(items: { id: string; name: string; campus: string }[]) => {
          if (items.length > 0) {
            setExpenseDetails({
              ...expenseDetails,
              department: items[0].name,
              campus: items[0].campus,
            });
          }
          setShowDepartments(false);
        }
        }
      />
    </View>
    );
  }

  if (favoriteUnits.length > 1) {
    return (
      <View>
        <TouchableOpacity
          onPress={() => setShowDepartments(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: textColor, fontSize: 16 }}>
            {expenseDetails.department}
          </Text>
          <IonIcons name="chevron-down" size={20} color={textColor} />
        </TouchableOpacity>
        <Selector
          allData={favoriteUnits.map((department) => ({
            id: department.id ? department.id.toString() : '',
            name: department.name || '',
            campus: department.campus || '',
          }))}
          visible={showDepartments}
          onClose={() => setShowDepartments(false)}
          onSelect={(items: { id: string; name: string; campus: string }[]) => {
            if (items.length > 0) {
              const selectedDepartment = items[0];
              setExpenseDetails({
                ...expenseDetails,
                department: selectedDepartment.name,
                campus: selectedDepartment.campus,
              });
            }
          }}
        />
      </View>
    );
  }
  
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowDepartments(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: textColor, fontSize: 16 }}>
          {expenseDetails.department}
        </Text>
        <IonIcons name="chevron-down" size={20} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

  
  


  

  //Calculate attachment amounts to number, and calculate total amount
  useEffect(() => {
    let totalAmount = 0;
    if (expenseDetails.attachments) {
      expenseDetails.attachments.forEach((attachment) => {
        if (attachment.amount) {
          totalAmount += Number(attachment.amount);
        }
      });
    }
    setExpenseDetails({
      ...expenseDetails,
      totalAmount,
    });
  }, [expenseDetails.attachments]);

  //Get description from all attachments, and convert to a single string.
  const stringifyAttachmentDescriptions = (attachments: Attachment[]) => {
    let purpose = '';
    attachments.forEach((attachment) => {
      if (attachment.description) {
        purpose += attachment.description + ', ';
      }
    });
    setDescriptionStringified(purpose);
  };

  useEffect(() => {
    stringifyAttachmentDescriptions(expenseDetails.attachments);
  }, [expenseDetails.attachments]);
  
  const handleOcr = async (image: string) => {
    const result = await MlkitOcr.detectFromUri(image);
    const text = result.map((block) => block.text).join('\n');
    await axios.post('https://api.web.biso.no/openai', {
      text,
      token: 'sdbashdb13123ksadjdsn'
    }).then((response) => {
      const data = response.data;
      const attachments = data.attachments;
      const newAttachments = attachments.map((attachment: any) => {
        return {
          ...attachment,
          date: attachment.date || '',
          description: attachment.description || '',
          amount: attachment.amount || '',
        };
      });
      setExpenseDetails({
        ...expenseDetails,
        attachments: [...expenseDetails.attachments, ...newAttachments],
      });
      setCameraModalVisible(false);
    });
  };
  
  const handleSubmit = async () => {
    const attachmentsArray = expenseDetails.attachments;
  
    // Upload images to the database
    const uploadedAttachments = await Promise.all(
      attachmentsArray.map(async (attachment) => {
        if (attachment.file) {
          // Generate a unique filename for the image
          const filename = `${user?.uid}_${Date.now()}`;
          const storageRef = ref(storage, `images/${filename}`);
  
          // Convert the file to a Blob
          const blob = new Blob([attachment.file]);
  
          // Upload the Blob to the storage
          await uploadBytes(storageRef, blob);
  
          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(storageRef);
  
          // Return the updated attachment with the download URL
          return {
            ...attachment,
            image: downloadURL,
          };
        } else {
          return attachment;
        }
      })
    );
  
    // Update the expense details with the uploaded attachments
    setExpenseDetails({
      ...expenseDetails,
      attachments: uploadedAttachments,
    });
  
    const purpose = await generatePurpose(uploadedAttachments);
    const invoiceId = await getNextInvoiceId();
    setExpenseDetails({
      ...expenseDetails,
      purpose: purpose,
    });
  
    createExpense(expenseDetails);
  };
  



return (
  <KeyboardAvoidingView
  style={[styles.container, { backgroundColor }]}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
>
    <ScrollView>
      <View>
        <Text style={[styles.header, { color: textColor }]}>Contact details</Text>
        <TouchableOpacity style={[styles.fieldContainer, { backgroundColor: primaryBackgroundColor }]} onPress={handleContactDetailsPress}>
          <Text style={[styles.fieldText, { color: textColor }]}>Contact details fetched from profile.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fieldContainer, { backgroundColor: primaryBackgroundColor }]} onPress={handlePayoutDetailsPress}>
          <Text style={[styles.fieldText, { color: textColor }]}>Payout details fetched from profile.</Text>
        </TouchableOpacity>
        <DepartmentSelector />
        <Text> Creating a profile is required for submitting expenses.</Text>
      </View>
      <View style={{ marginBottom: 16, flex: 1 }}>
        <View style={styles.row}>
          <Text style={[styles.header, { color: textColor }]}>Attachments</Text>
          <TouchableOpacity  onPress={() => setModalVisible(true)}>
          <IonIcons
            name="add-circle"
            size={24}
            color={textColor}
          />
          </TouchableOpacity>
        </View>

          <ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  {expenseDetails.attachments.map((attachment, index) => (
    <Accordion
      title={`Attachment ${index + 1}`}
      key={index}
      item={attachment}
      index={index}
      deleteable
      expandable
      onDelete={() => {
        const newAttachments = expenseDetails.attachments.filter((_, i) => i !== index);
        setExpenseDetails({
          ...expenseDetails,
          attachments: newAttachments,
        });
      }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <TextInput
          style={{ marginBottom: 8 }}
          label="Description"
          value={attachment.description}
          onChangeText={(text) => {
            const newAttachments = expenseDetails.attachments;
            newAttachments[index].description = text;
            setExpenseDetails({
              ...expenseDetails,
              attachments: newAttachments,
            });
          }}
        />
        <TextInput
          style={{ marginBottom: 8 }}
          label="Date"
          value={attachment.date}
          onChangeText={(text) => {
            const newAttachments = expenseDetails.attachments;
            newAttachments[index].date = text;
            setExpenseDetails({
              ...expenseDetails,
              attachments: newAttachments,
            });
          }}
        />
        <TextInput
          style={{ marginBottom: 8 }}
          label="Amount"
          value={attachment.amount}
          onChangeText={(text) => {
            const newAttachments = expenseDetails.attachments;
            newAttachments[index].amount = text;
            setExpenseDetails({
              ...expenseDetails,
              attachments: newAttachments,
            });
          }}
        />
      </View>
    </Accordion>
  ))}
</View>
          </ScrollView>
      </View>
      <Button title="Submit" onPress={() => handleSubmit()} />
    </ScrollView>
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      title="Add attachment"
      options={['Camera', 'Files']}
      onConfirm={() => setCameraModalVisible(true)}
      onCancel={() => setModalVisible(false)}
     />
     <CameraScreen
      isVisible={cameraModalVisible}
      onClose={() => setCameraModalVisible(false)}
      onPictureTaken={async (image) => {
        await handleOcr(image);
        setCameraModalVisible(false);
      }}
    />
  </KeyboardAvoidingView>
);
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 5,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  fieldText: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '40%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: '#FF0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default CreateExpenseScreen;
