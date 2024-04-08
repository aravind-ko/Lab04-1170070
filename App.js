import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import TransactionComponent from './Components/TransactionComponent';
import SummaryComponent from './Components/SummaryComponent';
import AddTransactionComponent from './Components/AddTransactionComponent';
import { TransactionContainer } from './Components/TransactionContainer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TransactionContainer>
      <NavigationContainer>
        <StatusBar style="auto" backgroundColor="#0077B6" />
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#FFA500',
            inactiveTintColor: '#333333',
            style: {
              backgroundColor: '#E5E5E5',
            },
            labelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
          }}>
          <Tab.Screen
            name="Add Transaction"
            component={AddTransactionComponent}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="plus-circle" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Transactions"
            component={TransactionComponent}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="exchange-alt" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Summary"
            component={SummaryComponent}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="chart-bar" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TransactionContainer>
  );
}
