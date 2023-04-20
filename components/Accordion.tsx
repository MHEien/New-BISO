import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from './Themed';
import { View as DefaultView } from 'react-native';
import { useThemeColor } from './Themed';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  deleteable?: boolean;
  onDelete?: () => void;
}

const screenWidth = Dimensions.get('window').width;

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  icon,
  content,
  deleteable,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const iconColor = useThemeColor({}, 'text');
  const primaryBackgroundColor = useThemeColor({}, 'primaryBackground');
  const primaryColor = useThemeColor({}, 'primary');
  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    onDelete?.();
  };

  return (
    <View style={[styles.container, { backgroundColor: primaryBackgroundColor }]}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        {icon}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.titleContainer}>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={iconColor} />
        {deleteable && (
          <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
            <Ionicons name="close" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {isExpanded && <View style={[styles.contentContainer, { backgroundColor: primaryBackgroundColor }]}>{content}</View>}
      {deleteable && (
       <Modal
       animationType="slide"
       transparent={true}
       visible={showDeleteModal}
       onRequestClose={() => setShowDeleteModal(false)}
     >
       <View style={[styles.modalView, { backgroundColor: primaryBackgroundColor }]}>
         <Text style={styles.modalTitle}>Are you sure you want to delete this attachment?</Text>
         <DefaultView style={styles.modalButtons}>
         <TouchableOpacity onPress={handleDelete}>
           <Text style={[styles.modalText, { color: primaryColor }]}>
            Yes
            </Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
           <Text style={[styles.modalText, { color: primaryColor }]}>
            No
            </Text>
         </TouchableOpacity>
         </DefaultView>
       </View>
     </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 10,
    width: screenWidth - 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  contentContainer: {
    padding: 15,
  },
  modalView: {
    position: 'absolute',
    bottom: 20, // Customize the distance from the bottom of the screen
    left: 20,
    right: 20,
    opacity: 1,
    height: 200,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default Accordion;