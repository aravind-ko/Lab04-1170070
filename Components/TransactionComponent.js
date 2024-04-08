import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import TransactionListComponent from './TransactionListComponent';
import TransactionDetailsComponent from './TransactionDetailsComponent';

const Stack = createStackNavigator();

const TransactionComponent = () => {
  return (
    <Stack.Navigator 
      initialRouteName="TransactionsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFA500',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="TransactionsList" 
        component={TransactionListComponent}
        options={{
          title: 'Transactions',
          headerLeft: () => (
            <Ionicons 
              name="document-text-outline" 
              size={24} 
              color="#fff" 
              style={{ marginLeft: 10 }} 
            />
          ),
        }}
      />
      <Stack.Screen 
        name="TransactionDetail" 
        component={TransactionDetailsComponent} 
        options={{
          title: 'Transaction Detail',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <Ionicons 
              name="arrow-back-outline" 
              size={24} 
              color="#fff" 
              style={{ marginLeft: 10 }} 
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export default TransactionComponent;
