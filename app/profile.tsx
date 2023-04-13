import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import Accordion from '../components/Accordion';
import IonIcons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '../components/Themed';
import TextInput from '../components/TextInput';
import Tag from '../components/Tag';
import Selector from '../components/Selector';
import { useAuthentication } from '../hooks/useAuthentication';
import ProfileImage from '../components/ProfileImage';
import Switch from '../components/Switch';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const screenWidth = Dimensions.get('window').width;

const Profile: React.FC = () => {
const icon = <IonIcons name="information-circle-outline" size={24} color={useThemeColor({}, 'iconColor')} />;
    
    const { user, profile } = useAuthentication();
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [allTags, setAllTags] = React.useState<string[]>([
        'Tag 1',
        'Tag 2',
        'Tag 3',	
        'Tag 4',
        'Tag 5',
        'Tag 6'
    ]);
    const [selectorVisible, setSelectorVisible] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [firstName, setFirstName] = React.useState(profile?.firstName || '');
    const [lastName, setLastName] = React.useState(profile?.lastName || '');
    const [address, setAddress] = React.useState(profile?.address || '');
    const [postalCode, setPostalCode] = React.useState(profile?.zipCode || '');
    const [city, setCity] = React.useState(profile?.city || '');
    const [phoneNumber, setPhoneNumber] = React.useState(profile?.phoneNumber || '');
    const [email, setEmail] = React.useState(profile?.email || '');
    const [bankAccount, setBankAccount] = React.useState(profile?.bankAccount || '');
    const [bic, setBic] = React.useState(profile?.bic || '');
    


    if (!user) return null;

    const addressDetails = (
        <View>
            <TextInput label="Address" style={styles.input} onChangeText={setAddress} value={address} />
            <TextInput label="Postal code" style={styles.input} />
            <TextInput label="City" style={styles.input} />
        </View>
    );

    const contactDetails = (
        <View>
            <TextInput label="Phone number" style={styles.input} />
            <TextInput label="Email" style={styles.input} />
        </View>
    );

    const paymentDetails = (
        <View>
            <View style={styles.column}>
                <TextInput label="Bank account" style={styles.input} />
                <TextInput label="BIC (Only if IBAN is provided)" style={styles.input} />
            </View>
            <View 
                style={[styles.column, { alignItems: 'center' }]}
            >
                <Switch initialValue={true} onClick={(value) => console.log(value)} isEnabled={true} mode='horizontal' />
            </View>
        </View>

    );


    const departmentDetails = (
        <View>
            {selectedTags.map((tag) => (
                <Tag
                    color='blue'
                    content={tag}
                    onRemove={() => {
                        const newTags = selectedTags.filter((t) => t !== tag);
                        setSelectedTags(newTags);
                    }}
                    key={tag}
                />
            ))}
            <Selector
                visible={selectorVisible}
                data={allTags.map((tag) => ({ id: tag, color: 'blue', label: tag }))}
                onSelect={(item) => {
                    const newTags = [...selectedTags, item.label];
                    setSelectedTags(newTags);
                    setSelectorVisible(false);
                }}
                onClose={() => setSelectorVisible(false)}
            />
            <TouchableOpacity
                style={styles.addTagButton}
                onPress={() => setSelectorVisible(true)}
            >
                <Text style={styles.addTagButtonText}>Add tag</Text>
            </TouchableOpacity>
        </View>
    );

    const saveProfile = async (profileData: any) => {
        if (user) {
          await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
        }
      };
      



  return (
    <View style={styles.container}>
      <ProfileImage />
        <Accordion
        title="Address details"
        icon={icon}
        content={addressDetails}
        />
        <Accordion
        title="Contact details"
        icon={icon}
        content={contactDetails}
        />
        <Accordion
        title="Payment details"
        icon={icon}
        content={paymentDetails}
        />
      <Accordion
        title="Login with your BISO account"
        icon={icon}
        content={<Text>Login lenke til å knytte profil mot BISO-konto. Dette vil tilgjengeliggjøre visse funksjoner som er i bruk for frivillige, blant annet Elections</Text>}
      />
      <Accordion
        title="Preferred subunits"
        icon={icon}
        content={departmentDetails}
      />
    <Button
        title="Save"
        onPress={() => {
            console.log(user.uid);
        }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: screenWidth,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: screenWidth,
    },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: screenWidth - 20,
    },
    addTagButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
    },
    addTagButtonText: {
        fontSize: 16,
    },
});

export default Profile;
