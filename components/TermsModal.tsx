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
    const { updateUserProfile } = useUserProfile();

  const handleAccept = () => {
    updateUserProfile({ newFeatures: true });
    setVisible(false);

  }

  const handleOpenTerms = () => {
    // TODO: Configure the Terms page on biso.no and replace the URL here
    Linking.openURL('https://biso.no');
  }

  return (
    <ContentModal
      visible={visible}
      setVisible={setVisible}
      title="Terms and Conditions"
    >
      <Text>
        We've updated our Terms and Conditions. Please read and accept our new Terms and Conditions to continue using our service.
        {'\n\n'}
        <Text style={{ textDecorationLine: 'underline' }} onPress={handleOpenTerms}>
          Click here to view the full Terms and Conditions.
        </Text>
      </Text>
      <Button style={{ marginTop: 20 }} onPress={handleAccept}>
        I have read and accepted
      </Button>
    </ContentModal>
  );
}

export default TermsModal;
