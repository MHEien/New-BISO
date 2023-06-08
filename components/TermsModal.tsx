import React from 'react';
import { Linking } from 'react-native';
import ContentModal from './ContentModal';
import { Button, Text } from '@ui-kitten/components';
import { useUserProfile } from '../hooks';

interface TermsAndConditionsModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const TermsModal = (props: TermsAndConditionsModalProps) => {
  const { visible, setVisible } = props;
    const { updateUserProfile, profile } = useUserProfile();

  const handleAccept = () => {
    updateUserProfile({ newFeatures: true });
    setVisible(false);

  }

  const handleOpenTerms = () => {
    // TODO: Configure the Terms page on biso.no and replace the URL here
    Linking.openURL('https://biso.no');
  }
/*
Welcome back to the BISO App! Exciting things are happening, and we can't wait to share them with you! 
As part of our commitment to transparency and user protection, we want to make sure you are informed about our privacy policy, cookie policy, and compliance with the General Data Protection Regulation (GDPR). 
To learn more, please visit the following pages: https://biso.no
Then a button that says "I have read and accepted"
*/

  return (
    <ContentModal
      visible={visible}
      setVisible={setVisible}
      title="Welcome back to the BISO App!"
    >
      <Text category="h1">Welcome back to the BISO App!</Text>
      <Text>
        Exciting things are happening, and we can't wait to share them with you!
      </Text>
          <Text category="h6" style={{ marginBottom: 8 }}>
            Our Policies
          </Text>
          <Text style={{ marginBottom: 16 }}>
            As part of our commitment to transparency and user protection, we want to make sure you are informed about our privacy policy, cookie policy, and compliance with the General Data Protection Regulation (GDPR).
          </Text>
          <Text style={{ textDecorationLine: 'underline' }} onPress={handleOpenTerms}>
          Click here to view the full Terms and Conditions.
        </Text>
          <Button onPress={handleAccept}>I have read and accepted</Button>
    </ContentModal>
  );
}

export default TermsModal;