import axios from 'axios';
import { Alert } from 'react-native';

const fetchPublishableKey = async () => {
    try {
      const response = await axios.get('https://api.web.biso.no/api/publishable-key');
  
      const { publishableKey } = await response.data;
  
      return publishableKey;
    } catch (error) {
        Alert.alert('Error', 'Something went wrong');
        }
    };

export default fetchPublishableKey;
