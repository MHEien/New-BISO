import React from 'react';
import { ProgressBarProps, ProgressBarData } from '../types';
import { useTheme, Layout, Text, StyleService } from '@ui-kitten/components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const ProgressBar: React.FC<ProgressBarProps> = ({ data, style, header, valueLabel }) => {

    
    const theme = useTheme()


  return (
    <Layout style={{backgroundColor: 'transparent', ...style}}>
      {header && <Text style={[styles.header, { color: theme['color-basic-100'] }]}>{header}</Text>}
      {data.map((item, index) => {
        const progressPercentage = (item.value / item.maxValue) * 100;

        return (
          <Layout key={index} style={styles.itemContainer}>
            <Text style={[styles.label, { color: theme['color-basic-100'] }]}>{item.label}</Text>
            <Layout style={styles.progressBackground}>
              <Layout style={[styles.progressBar, { width: `${progressPercentage}%`, backgroundColor: theme['color-primary-500'] }]} />
            </Layout>
            <Text style={[styles.valueText, { color: theme['color-basic-100'] }]}>
              {item.value}/{item.maxValue} {valueLabel}
            </Text>
          </Layout>
        );
      })}
    </Layout>
  );
};

const styles = StyleService.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    width: 
    width - 40,
    backgroundColor: 'transparent',
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
    borderRadius: 5,
    height: 10,
  },
  valueText: {
    fontSize: 12,
    textAlign: 'right',
  },
});

export default ProgressBar;
