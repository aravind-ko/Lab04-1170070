import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { TransactionsContext } from './TransactionContainer';
import { collection, getDocs } from 'firebase/firestore';
import db from './FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const SummaryComponent = () => {
  const { transactionsData } = useContext(TransactionsContext);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSummaryData = async () => {
    try {
      const transactionsCollection = collection(db, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
      const data = querySnapshot.docs.map(doc => doc.data());

      console.log('Fetched data:', data);

      const parsedAmounts = data.map(t => {
        const amount = t.amount ? parseFloat(t.amount.replace('$', '')) : 0;
        return { ...t, amount };
      });

      console.log('Parsed amounts:', parsedAmounts);

      const transactionsCount = parsedAmounts.length;
      const totalBalance = parsedAmounts.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2);
      const highestTransaction = Math.max(...parsedAmounts.map(t => t.amount));
      const lowestTransaction = Math.min(...parsedAmounts.map(t => t.amount));
      const highSpending = parsedAmounts.find(t => t.amount === highestTransaction);
      const lowSpending = parsedAmounts.find(t => t.amount === lowestTransaction);

      console.log('Transactions Count:', transactionsCount);
      console.log('Total Balance:', totalBalance);
      console.log('Highest Spending:', highSpending);
      console.log('Lowest Spending:', lowSpending);

      console.log('Lowest Spending Name:', lowSpending?.name);
      console.log('Highest Spending Name:', highSpending?.name);

      setSummaryData([
        { title: 'Transactions', value: transactionsCount },
        { title: 'Balance', value: `$${totalBalance}` },
        { title: 'Least expensive transaction', transaction: lowSpending?.name, amount: lowSpending?.amount },
        { title: 'Highest expensive transaction', transaction: highSpending?.name, amount: highSpending?.amount }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error occurred while fetching', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSummaryData();
    }, [transactionsData])
  );

  const renderItem = ({ item }) => {
    console.log('Item:', item);
    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.title, { color: '#FFA500' }]}>{item.title}</Text>
        <Text style={styles.value}>{item.value}</Text>
        {item.title === 'Least expensive transaction' && (
          <View>
            <Text>{item.transaction}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
        {item.title === 'Highest expensive transaction' && (
          <View>
            <Text> {item.transaction}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <FlatList
      data={summaryData}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={(item) => item.title}
      style={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#FFA500',
    marginVertical: 5,
  },
});

export default SummaryComponent;
