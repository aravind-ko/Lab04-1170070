import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { TransactionsContext } from './TransactionContainer';
import { collection, getDocs } from 'firebase/firestore';
import firebase from './FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './StylesComponent';

const TransactionListComponent = ({ navigation }) => {
  const { transactionsData, setTransactionsData } = useContext(TransactionsContext);
  const [loading, setLoading] = React.useState(true);

  const fetchTransactions = async () => {
    console.log("Getting transactions");
    try {
      const transactionsCollection = collection(firebase, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log("Fetched successfully", transactions);
      setTransactionsData(transactions);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
      style={styles.listItemContainer}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="chevron-forward-outline" size={24} color="#FFA500" style={{ marginRight: 10 }} />
        <Text style={styles.itemPrice}>{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.listItemSeparator} />;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default TransactionListComponent;
