import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from './Themed';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

const screenWidth = Dimensions.get('window').width;

const Accordion: React.FC<AccordionProps> = ({ title, subtitle, icon, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        {icon}
        <Text style={styles.icon}>{title}</Text>
        <View style={styles.titleContainer}>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} />
      </TouchableOpacity>
      {isExpanded && <View style={styles.contentContainer}>{content}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: screenWidth - 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  contentContainer: {
    padding: 10,
  },
});

export default Accordion;
