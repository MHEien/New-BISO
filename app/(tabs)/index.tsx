import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Banner from '../../components/Banner';
import NewsList from '../../components/NewsList';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Link } from 'expo-router';

export default function Home() {
  
  const { user } = useAuthentication();
  //const isAuthenticated = user ? true : false;

  //Keeping this state while under development.
  const isAuthenticated = false;


  const newsPosts = [
    {
      departmentLogo: "https://picsum.photos/200/300",
      title: "Title",
      subtitle: "This is the title of a newsworthy post",
      department: "Department",
      date: "Date",
      image: "https://picsum.photos/200/300",
    },
    {
      departmentLogo: "https://picsum.photos/200/300",
      title: "Title",
      subtitle: "Subtitle",
      department: "Department",
      date: "Date",
      image: "https://picsum.photos/200/300",
    },
    {
      departmentLogo: "https://picsum.photos/200/300",
      title: "Title",
      subtitle: "Subtitle",
      department: "Department",
      date: "Date",
      image: "https://picsum.photos/200/300",
    }
  ]

 const onLoginPress = () => {
    <Link href={'/login'} />
  }

  return (
    <View style={styles.container}>
        <Banner isAuthenticated={isAuthenticated} onLoginPress={onLoginPress} />
      <View style={styles.contentContainer}>
           <NewsList newsPosts={newsPosts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
