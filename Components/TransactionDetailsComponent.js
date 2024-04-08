import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
const TransactionDetailsComponent = ({ route }) => {
  const { transaction } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Transaction Name:</Text>
        <Text style={styles.detail}>{transaction.name}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Amount:</Text>
        <Text style={styles.detail}>${transaction.amount}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Location:</Text>
        <View style={styles.locContainer}>
          <FontAwesome5 name="map-marker-alt" size={16} color="#FFA500" style={styles.icon} />
          <Text style={styles.detail}>{transaction.location}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Transaction Date:</Text>
        <View style={styles.dateContainer}>
          <FontAwesome5 name="calendar-alt" size={16} color="#FFA500" style={styles.icon} />
          <Text style={styles.detail}>{transaction.date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  detail: {
    fontSize: 16,
  },
  locContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});
export default TransactionDetailsComponent;
