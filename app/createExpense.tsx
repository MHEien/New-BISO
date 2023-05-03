import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Button, KeyboardAvoidingView, ScrollView, Platform, } from 'react-native';
import { useThemeColor, Text } from '../components/Themed';
import { useRouter } from 'expo-router';
import { useAuthentication } from '../hooks';
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

const CreateExpenseScreen: React.FC = () => {
  const router = useRouter();
  const { user, profile, createExpense } = useAuthentication();
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
    invoiceId: '',
    outstanding: 0,
    prepayment: false,
    purpose: '',
    bankAccountNumber: '',
    campus: '',
    department: '',
    totalAmount: 0,
    attachments: [] as Attachment[],
  };

  const [expenseDetails, setExpenseDetails] = useState<Expense>(emptyExpense);
  const [favoriteUnits, setFavoriteUnits] = useState<Subunit[]>([]);
  const [descriptionStringified, setDescriptionStringified] = useState<string>('');
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);


  const handleContactDetailsPress = () => {
    router.push('profile');
  };

  const handlePayoutDetailsPress = () => {
    router.push('profile');
  };

  const backgroundColor = useThemeColor({}, 'background');
  const primaryBackgroundColor = useThemeColor({}, 'primaryBackground');
  const textColor = useThemeColor({}, 'text');

  //Initialize profile values or empty data.
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
        department: profile.expenseDepartment || '',
        attachments: [] as Attachment[],
        invoiceId: '',
      });
    }
  }, [profile]);

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
  
  
  
  const handleSubmit = async () => {

const attachmentsArray = expenseDetails.attachments;

    const purpose = await generatePurpose(attachmentsArray);
    const invoiceId = await getNextInvoiceId();
    setExpenseDetails({
      ...expenseDetails,
      invoiceId,
      purpose: purpose,
    });
    console.log(expenseDetails);
    createExpense(expenseDetails);
  };


  const isAttachmentFilled = (attachment: Attachment) => {
    return !!attachment.description || !!attachment.date || !!attachment.amount;
  };

  //Handle OCR, and POST data to backend, ap
  const handleOcr = async (image: string) => {
    const result = await MlkitOcr.detectFromUri(image);
    const text = result.map((block) => block.text).join('\n');
    await axios.post('http://192.168.40.245:3000/openai', {
      text,
    }).then((response) => {
      const data = response.data;
      const attachments = data.attachments;
      const newAttachments = attachments.map((attachment: any) => {
        return {
          ...attachment,
          date: new Date(attachment.date) || new Date(),
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
        <Text>Click one of the above if you have not set a profile yet.</Text>
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
});

export default CreateExpenseScreen;
