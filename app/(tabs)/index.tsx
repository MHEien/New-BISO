import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Banner from '../../components/Banner';
import NewsList from '../../components/NewsList';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function Home() {
  
  const { user } = useAuthentication();
  const isAuthenticated = user ? true : false;
  const [bannerVisible, setBannerVisible] = useState(true);
  //Keeping this state while under development.
  //const isAuthenticated = false;


  const newsPosts = [
    {
      departmentLogo: "https://picsum.photos/200/300",
      title: "Title",
      subtitle: "This is the title of a newsworthy post",
      department: "Department",
      date: "20.01.2023",
      image: "https://picsum.photos/200/300",
    },
    {
      departmentLogo: "https://picsum.photos/200/300",
      title: "Title",
      subtitle: "Subtitle",
      department: "Department",
      date: "22.02.2023",
      image: "https://picsum.photos/200/300",
      isFeatured: true,
    },
    {
      departmentLogo: "https://picsum.photos/200/300",
      title: "Title",
      subtitle: "Subtitle",
      department: "Department",
      date: "18.04.2023",
      image: "https://picsum.photos/200/300",
    }
  ]

 const onLoginPress = () => {
    <Link href={'/login'} />
  }

  return (
    <View style={styles.container}>
      {bannerVisible && <Banner isAuthenticated={isAuthenticated} onLoginPress={onLoginPress} />}
        <NewsList newsPosts={newsPosts} onBannerVisibilityChange={setBannerVisible} />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
