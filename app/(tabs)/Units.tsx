import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import i18n from '../../constants/localization';

export default function TabOneScreen() {


  const fetchSubunits = async () => {
    try {
      // Replace 'your-site.com' with your actual WordPress site URL.
      const response = await fetch('https://your-site.com/wp-json/acf/v3/subunits');
      const data = await response.json();
  
      // Process the fetched data as needed.
      console.log(data);
    } catch (error) {
      console.error('Error fetching subunits:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('units')}</Text>
      <View style={styles.contentView}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>{i18n.t('coming_soon')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
