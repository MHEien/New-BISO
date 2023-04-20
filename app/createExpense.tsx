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
import AttachmentAccordion from '../components/AttachmentAccordion';

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
    const purpose = await generatePurpose(descriptionStringified);
    const invoiceId = await getNextInvoiceId();
    setExpenseDetails({
      ...expenseDetails,
      invoiceId,
      purpose,
    });
    console.log(expenseDetails);
    createExpense(expenseDetails);
  };


return (
  <KeyboardAvoidingView
  style={[styles.container, { backgroundColor }]}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
      </View>
      <View style={{ marginBottom: 16, flex: 1 }}>
        <View style={styles.row}>
          <Text style={[styles.header, { color: textColor }]}>Attachments</Text>
          <IonIcons
            name="add-circle"
            size={24}
            color={textColor}
            onPress={() => {
              const newAttachments = [...expenseDetails.attachments, {} as Attachment];
              setExpenseDetails({
                ...expenseDetails,
                attachments: newAttachments,
              });
            }}
          />
        </View>
          <ScrollView>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
  {expenseDetails.attachments.map((attachment, index) => (
    <AttachmentAccordion
      key={attachment.id}
      item={attachment}
      index={index}
      onDelete={() => {
        const newAttachments = expenseDetails.attachments.filter((_, i) => i !== index);
        setExpenseDetails({
          ...expenseDetails,
          attachments: newAttachments,
        });
      }}
      onDescriptionChange={(text) => {
        const newAttachments = expenseDetails.attachments;
        newAttachments[index].description = text;
        setExpenseDetails({
          ...expenseDetails,
          attachments: newAttachments,
        });
      }}
      onDateChange={(text) => {
        const newAttachments = expenseDetails.attachments;
        newAttachments[index].date = text;
        setExpenseDetails({
          ...expenseDetails,
          attachments: newAttachments,
        });
      }}
      onAmountChange={(text) => {
        const newAttachments = expenseDetails.attachments;
        newAttachments[index].amount = text;
        setExpenseDetails({
          ...expenseDetails,
          attachments: newAttachments,
        });
      }}
    />
  ))}
</View>

          </ScrollView>
      </View>
      <Button title="Submit" onPress={() => handleSubmit()} />
    </ScrollView>
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
