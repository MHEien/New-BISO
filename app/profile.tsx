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
import SwitchSelector from 'react-native-switch-selector';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUserProfile, getDepartments } from '../hooks';
import { Department, UserProfile } from '../types';
import LanguageSwitcher from '../components/LanguangeSwitcher';
import i18n from '../constants/localization';

const screenWidth = Dimensions.get('window').width;

const Profile: React.FC = () => {
const icon = <IonIcons name="information-circle-outline" size={24} color={useThemeColor({}, 'iconColor')} />;
const primaryBackgroundColor = useThemeColor({}, 'primaryBackground');
    
    const { user } = useAuthentication();
    const { profile, updateUserProfile } = useUserProfile();
    const [newProfile, setNewProfile] = React.useState<UserProfile | null>(null);
    const [selectedDepartment, setSelectedDepartment] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [favoritesOnly, setFavoritesOnly] = React.useState(false);
    const [departments, setDepartments] = React.useState([
        { campus: "", id: 0, label: "" }
    ]);
    const [selectorVisible, setSelectorVisible] = React.useState(false);

    React.useEffect(() => {
        if (profile) {
            setNewProfile(profile);
            setSelectedTags(profile?.subunits || []);
        }
    }, [profile]);

    React.useEffect(() => {
      const fetchDepartments = async () => {
        const departments = await getDepartments();
        // Ensure each department has a campus property
        const departmentsWithCampus = departments.map(department => ({ 
          ...department, 
          campus: department.campus || "default_campus" // Replace "default_campus" with a suitable default
        }));
        setDepartments(departmentsWithCampus);
      };
      fetchDepartments();
    }, []);
      



    if (!user) return null;

    const addressDetails = (
        <View style={{ backgroundColor: primaryBackgroundColor }}>
            <TextInput label="Address" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, address: value })} value={newProfile?.address} />
            <TextInput label="Postal code" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, zip: value })} value={newProfile?.zip} />
            <TextInput label="City" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, city: value })} value={newProfile?.city} />
        </View>
    );

    const contactDetails = (
        <View>
            <TextInput label="Phone number" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, phone: value })} value={newProfile?.phone} />
            <TextInput label="Email" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, email: value })} value={newProfile?.email} />
        </View>
    );


    //Display a SwitchSelector to choose between norwegian and international bank account. If norwegian, display bank account number input field, if international display a IBAN and BIC field.
    const paymentDetails = (
        <View>
            <TextInput label="Bank account number" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, bankAccount: value })} value={newProfile?.bankAccount} />
            <TextInput label="BIC (If international bank)" style={styles.input} onChangeText={(value) => setNewProfile({ ...newProfile, bic: value })} value={newProfile?.bic} />
        </View>
    );


    const dummyFavorites = [
        { id: '1', campus: 'Oslo', label: 'Favoritt 1' },
        { id: '2', campus: 'Oslo', label: 'Favoritt 2' },
        { id: '3', campus: 'oslo', label: 'Favoritt 3' }
      ];


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
        allData={departments.map((department) => ({ 
          id: department.id ? department.id.toString() : '', 
          label: department.label,
          campus: department.campus // Ensure we're passing the campus property
        }))}
            enableSearch
            multiSelect
            onSelect={(item: { id: string, label: string, campus: string } | Array<{ id: string, label: string, campus: string }>) => {
              if (Array.isArray(item)) {
                // If item is an array, map over it and extract the labels
                const newTags = [...selectedTags, ...item.map(i => i.label)];
                setSelectedTags(newTags);
              } else {
                // If item is a single object, just add its label
                const newTags = [...selectedTags, item.label];
                setSelectedTags(newTags);
              }
            }}
            
            
            
            onClose={() => setSelectorVisible(false)}
          />
          <TouchableOpacity
            style={styles.addTagButton}
            onPress={() => setSelectorVisible(true)}
          >
            <Text style={styles.addTagButtonText}>Add units</Text>
          </TouchableOpacity>
        </View>
      );
      
      
    


  return (
    <View style={styles.container}>
      <ProfileImage />
        <Accordion
        title={i18n.t('address_details')}
        icon={icon}
        content={addressDetails}
        expandable
        />
        <Accordion
        title={i18n.t('contact_details')}
        icon={icon}
        content={contactDetails}
        expandable
        />
        <Accordion
        title={i18n.t('payment_details')}
        icon={icon}
        content={paymentDetails}
        expandable
        />
      <Accordion
        title={i18n.t('login_biso')}
        icon={icon}
        content={<Text>Login lenke til å knytte profil mot BISO-konto. Dette vil tilgjengeliggjøre visse funksjoner som er i bruk for frivillige, blant annet Elections</Text>}
        expandable
      />
      <Accordion
        title={i18n.t('favorite_units')}
        icon={icon}
        content={departmentDetails}
        expandable
      />
    <Button
  title={i18n.t('save')}
  onPress={() => {
    if (newProfile) {
      const updatedProfile = { ...newProfile, subunits: selectedTags };
      updateUserProfile(updatedProfile);
    }
  }}
/>
    <LanguageSwitcher />
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
