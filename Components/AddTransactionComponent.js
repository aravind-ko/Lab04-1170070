import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firebase from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddTransactionComponent = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [location, setLoc] = useState('');

  const addTransaction = async () => {
    try {
      const transactionRef = collection(firebase, 'transactions');
      await addDoc(transactionRef, { name, amount, date, location });
      console.log("Adding data:", { name, amount, date, location });
      Alert.alert('Successful', 'Transaction successful');
      clearFields();
    } catch (error) {
      console.error("Adding failed ", error);
      Alert.alert('Error', 'Adding Failed');
    }
  };

  const clearFields = () => {
    setName('');
    setAmount('');
    setDate('');
    setLoc('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter the transaction name"
      />
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter the amount"
        keyboardType="numeric" 
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Give the date of transaction"
        keyboardType="numeric" 
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLoc}
        placeholder="Give the location of transaction"
      />
      <TouchableOpacity style={styles.button} onPress={addTransaction}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTransactionComponent;
