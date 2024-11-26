import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Dimensions } from 'react-native';

import { OrderContext } from '../contexts/OrderContext';
import styles from '../styles/CheckoutStyles';
import { insertOrder } from '../database';

export default function CheckoutScreen({ navigation }) {
  const { order, getTotal, completeOrder } = useContext(OrderContext);
  const [paymentType, setPaymentType] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [isLandscape, setIsLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height);

  // Handle orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(Dimensions.get('window').width > Dimensions.get('window').height);
    };
  
    // Add the event listener
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);
  
    // Clean up the subscription
    return () => subscription?.remove();
  }, []);

  const handlePaymentSelection = (type) => {
    setPaymentType(type);
  };

  const handleCompleteOrder = async () => {
    console.log('Order at checkout:', order);
  
    if (!paymentType) {
      Alert.alert("Select Payment Method", "Please choose a payment method before completing the order.");
      return;
    }
  
    if (order.length === 0) {
      Alert.alert("Empty Order", "Please add items to the order before completing.");
      return;
    }
  
    try {
      await completeOrder(paymentType, customerName); // Call completeOrder
      Alert.alert("Order Completed", "Your order has been placed successfully!", [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({
              index: 0, // Reset the stack and make HomeScreen the root
              routes: [{ name: "Home" }],
            }),
        },
      ]);
    } catch (error) {
      console.error("Failed to complete the order:", error);
      Alert.alert("Order Failed", "Could not complete your order. Please try again.");
    }
  };

  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <FlatList
        data={order}
        keyExtractor={(item) => item.uid || `order-${item.name}`}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name} - Rp {item.totalPrice || item.price}</Text>
            {item.addons && item.addons.map((addon, index) => (
              <Text key={`${item.uid}-addon-${addon.id || index}`} style={styles.addonText}>
                - {addon.name} - Rp {addon.price}
              </Text>
            ))}
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: Rp {getTotal()}</Text>
      <TextInput
        style={styles.customerNameInput}
        placeholder="Enter Customer Name (Optional)"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text style={styles.paymentOptionsHeader}>Select Payment Method</Text>
      <TouchableOpacity
        style={[styles.paymentOption, paymentType === 'Cash' && styles.selectedPaymentOption]}
        onPress={() => handlePaymentSelection('Cash')}
      >
        <Text style={styles.paymentOptionText}>Cash</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.paymentOption, paymentType === 'Card' && styles.selectedPaymentOption]}
        onPress={() => handlePaymentSelection('Card')}
      >
        <Text style={styles.paymentOptionText}>Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteOrder}>
        <Text style={styles.completeButtonText}>Complete Order</Text>
      </TouchableOpacity>
    </View>
  );
}
