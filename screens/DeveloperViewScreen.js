// DeveloperViewScreen.js
import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';
import styles from '../styles/DeveloperViewStyles';

export default function DeveloperViewScreen({ navigation }) {
  const { orderHistory } = useContext(OrderContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Developer View - Order JSON</Text>
      <ScrollView style={styles.jsonContainer}>
        <Text style={styles.jsonText}>{JSON.stringify(orderHistory, null, 2)}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Order History</Text>
      </TouchableOpacity>
    </View>
  );
}