import React, { useState } from 'react';
import { Button, View } from 'react-native';
import axios from 'axios';
import { Text } from '../components/Themed'
import { useSearchParams } from 'expo-router';
import TextInput from '../components/TextInput';

const VippsPaymentScreen = () => {
  const params = useSearchParams();

  const { productId, price, name } = params as { productId: string; price: string; name: string };
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('https://api.web.biso.no/api/vipps-epayment', {
        productId, price, name, phoneNumber
      });

      // Use response data
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <View>
        <Text>Product ID: {productId}</Text>
        <Text>Price: {price}</Text>
        <Text>Name: {name}</Text>
        <TextInput label="Phone number" value={phoneNumber} onChangeText={setPhoneNumber} />
      <Button title="Pay with Vipps" onPress={handlePayment} />
    </View>
  );
};

export default VippsPaymentScreen;
