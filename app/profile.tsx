import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Accordion from '../components/Accordion';
import IonIcons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '../components/Themed';
import TextInput from '../components/TextInput';

const screenWidth = Dimensions.get('window').width;

const Profile: React.FC = () => {
const icon = <IonIcons name="information-circle-outline" size={24} color={useThemeColor({}, 'iconColor')} />;
    

    const addressDetails = (
        <View>
            <TextInput label="Address" style={styles.input} />
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
            <TextInput label="Bank account" style={styles.input} />
            <TextInput label="BIC (Only if IBAN is provided)" style={styles.input} />
        </View>
    );



  return (
    <View style={styles.container}>
        <Text>Email</Text>
        <Text>Full Name</Text>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: screenWidth - 20,
    },
});

export default Profile;
