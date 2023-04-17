import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useThemeColor } from './Themed';
import { NewsPost, NewsListProps } from '../types';



const screenWidth = Dimensions.get('window').width;

const NewsList: React.FC<NewsListProps> = ({ newsPosts }) => {
  const newsPostContainerColor = useThemeColor({}, 'primaryBackground');
  const textColor = useThemeColor({}, 'text');

  // Sort the newsPosts array to display featured posts first
  const sortedNewsPosts = newsPosts.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) {
      return -1;
    } else if (!a.isFeatured && b.isFeatured) {
      return 1;
    } else {
      return 0;
    }
  });

  const renderItem = ({ item }: { item: NewsPost }) => (
    <View style={[styles.newsPostContainer, { backgroundColor: newsPostContainerColor }]}>
      <View style={styles.header}>
        <Image source={{ uri: item.departmentLogo }} style={styles.departmentLogo} />
        <View style={styles.departmentInfo}>
          <Text style={[styles.departmentTitle, { color: textColor }]}>{item.department}</Text>
          <Text style={styles.postDate}>{item.date}</Text>
        </View>
        {item.isFeatured && (
          <View style={styles.featuredContainer}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={{ height: 200 }}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      </View>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>{item.subtitle}</Text>
    </View>
  );

return (
    <FlatList
      data={sortedNewsPosts}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  newsPostContainer: {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    width: screenWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
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
  featuredContainer: {
    backgroundColor: '#3F51B5',
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 'auto',
  },
  featuredText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: 'gray',
  },
  postImage: {
    width: screenWidth,
    height: 220, // Increased height from 200 to 220
    resizeMode: 'stretch',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 3,
  },
});



export default NewsList;
