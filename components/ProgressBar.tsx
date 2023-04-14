import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBarProps, ProgressBarData } from '../types';
import { useThemeColor } from '../components/Themed';


const ProgressBar: React.FC<ProgressBarProps> = ({ data, style, header, valueLabel }) => {

    
    const backgroundColor = useThemeColor({}, 'primaryBackground');
  return (
    <View style={[{ backgroundColor }, style, { borderRadius: 10 }]}>
      {header && <Text style={styles.header}>{header}</Text>}
      {data.map((item, index) => {
        const progressPercentage = (item.value / item.maxValue) * 100;

        return (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.progressBackground}>
              <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.valueText}>
              {item.value}/{item.maxValue} {valueLabel}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
  },
  label: {
    marginBottom: 5,
  },
  progressBackground: {
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    height: 10,
    marginBottom: 5,
  },
  progressBar: {
    backgroundColor: '#3F51B5',
    borderRadius: 5,
    height: 10,
  },
  valueText: {
    fontSize: 12,
    textAlign: 'right',
  },
});

export default ProgressBar;
