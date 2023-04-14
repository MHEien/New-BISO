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

const screenWidth = Dimensions.get('window').width;

const Profile: React.FC = () => {
const icon = <IonIcons name="information-circle-outline" size={24} color={useThemeColor({}, 'iconColor')} />;
    
    const { user } = useAuthentication();
    const { profile, updateUserProfile } = useUserProfile();
    const [newProfile, setNewProfile] = React.useState<UserProfile | null>(null);
    const [selectedDepartment, setSelectedDepartment] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [favoritesOnly, setFavoritesOnly] = React.useState(false);
    const [departments, setDepartments] = React.useState([
        { campus: "", id: 0, name: "" }
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
          setDepartments(departments);
        };
        fetchDepartments();
      }, []);
      



    if (!user) return null;

    const addressDetails = (
        <View>
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
            data={departments.map((department) => ({ id: department.id ? department.id.toString() : '', color: 'blue', label: department.name }))}
            enableSearch
            onSelect={(item) => {
              if (item) {
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
            if (newProfile) {
                updateUserProfile(newProfile);
            }

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
