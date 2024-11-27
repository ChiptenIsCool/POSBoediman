import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { OrderProvider } from './contexts/OrderContext';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import { initializeDatabase, populateDataFromJson, shareDatabase } from './database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        console.log('Initializing database........');
        await initializeDatabase();
        console.log('Populating database...');
        await populateDataFromJson();
        setIsDatabaseReady(true); // Mark database as ready
        console.log('Database setup complete!');

      } catch (error) {
        console.error('Error setting up database:', error);
        Alert.alert('Database Error', 'Failed to initialize the database.');
      }
    };

    setupDatabase();
  }, []);


  return (
    <OrderProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
  {(props) => <HomeScreen {...props} isDatabaseReady={isDatabaseReady} />}
</Stack.Screen>

          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </OrderProvider>
  );
}
