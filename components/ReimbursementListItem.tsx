import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import { ReimbursementListItemProps } from '../types';
import { expenseStatus } from '../hooks/expenseStatus';
import { useThemeColor } from './Themed';

const ReimbursementListItem = ({ item, onPress, isApproved }: ReimbursementListItemProps) => {

  const backgroundColor = useThemeColor({}, 'background');
  const primaryBackgroundColor  = useThemeColor({}, 'primaryBackground');
  const textColor = useThemeColor({}, 'text');


  const prepaymentReceived = item.prepayment === 'Yes';
  const spentAmount = item.total;
  const prepaidAmount = item.prepaymentAmount;
  const outstandingAmount = prepaymentReceived ? spentAmount - prepaidAmount : spentAmount;
  const containerStyle = isApproved ? { backgroundColor: primaryBackgroundColor } : { backgroundColor: backgroundColor };



  const { height: windowHeight } = Dimensions.get('window');
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    if (listHeight < windowHeight) {
      const paddingHeight = windowHeight - listHeight;
      const paddingElement = <View key="padding" style={{ height: paddingHeight }} />;
      setListHeight(listHeight + paddingHeight);
    }
  }, [listHeight]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
      <View style={styles.leftContainer}>
        <Text style={[styles.title, { color: textColor}]}>Expense #{item.invoiceId}</Text>
        <Text style={[styles.subtitle, { color: textColor}]}>{item.purpose}</Text>
        <Text style={[styles.date, { color: textColor}]}>{item.date.toDate().toLocaleDateString()}</Text>
      </View>
      <View style={styles.rightContainer}>
        {prepaymentReceived && (
          <>
            <View style={styles.amountContainer}>
              <Text style={[styles.amountDescription, styles.paidText]}>Paid</Text>
              <Text style={[styles.amountText, styles.paidText]}>{`${prepaidAmount} NOK`}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={[styles.amountDescription, styles.outstandingText]}>Outstanding</Text>
              <Text style={[styles.amountText, styles.outstandingText]}>{`${outstandingAmount} NOK`}</Text>
            </View>
          </>
        )}
        {!prepaymentReceived && (
          <Text style={[styles.amountText, styles.outstandingText]}>{`${outstandingAmount} NOK`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  leftContainer: {
    flex: 1,
    marginRight: 16,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    marginBottom: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountDescription: {
    fontSize: 14,
    marginRight: 4,
  },
  paidText: {
    color: '#1976d2',
  },
  outstandingText: {
    color: '#4caf50',
  },
});

export default ReimbursementListItem;
