import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useThemeColor } from './Themed';

interface NewsPost {
  title: string;
  subtitle: string;
  department: string;
  date: string;
  departmentLogo: string;
  image: string;
}

interface NewsListProps {
  newsPosts: NewsPost[];
}

const screenWidth = Dimensions.get('window').width;

const NewsList: React.FC<NewsListProps> = ({ newsPosts }) => {
  const newsPostContainerColor = useThemeColor({}, 'primaryBackground');

  const renderItem = ({ item }: { item: NewsPost }) => (
    <View style={[styles.newsPostContainer, { backgroundColor: newsPostContainerColor }]}>
      <View style={styles.header}>
        <Image source={{ uri: item.departmentLogo }} style={styles.departmentLogo} />
        <View style={styles.departmentInfo}>
          <Text style={styles.departmentTitle}>{item.department}</Text>
          <Text style={styles.postDate}>{item.date}</Text>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <FlatList
      data={newsPosts}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  newsPostContainer: {
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
    width: screenWidth - 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  departmentLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  departmentInfo: {
    marginLeft: 10,
  },
  departmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: 'gray',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default NewsList;
