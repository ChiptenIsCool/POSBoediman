import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, Dimensions  } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import * as Print from 'expo-print';
import { OrderContext } from '../contexts/OrderContext';
import styles from '../styles/CheckoutStyles';
import { insertOrder } from '../database';

export default function CheckoutScreen({ navigation }) {
  const { order, getTotal, completeOrder } = useContext(OrderContext);
  const [paymentType, setPaymentType] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [shouldPrintReceipt, setShouldPrintReceipt] = useState(true);
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

  const generateReceiptHTML = () => {
    const itemsHTML = order
      .map((item) => {
        const addonsHTML = item.addons
          ? item.addons
              .map((addon) => `<div style="margin-left: 10px;">+ ${addon.name} - Rp ${addon.price}</div>`)
              .join('')
          : '';
        return `
          <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <span>${item.name}</span>
            <span>Rp ${item.totalPrice || item.price}</span>
          </div>
          ${addonsHTML}
        `;
      })
      .join('');
  
    return `
      <html>
        <head>
          <style>
            body {
              width: 48mm;
              font-family: Arial, sans-serif;
              font-size: 12px;
              margin: 0;
              padding: 0;
            }
            .header, .footer {
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .items {
              margin-bottom: 10px;
            }
            .total {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              font-weight: bold;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>Thank You!</div>
            <div>Receipt</div>
          </div>
          <div style="margin-bottom: 10px;">
            <div>Customer: ${customerName || 'Guest'}</div>
            <div>Payment: ${paymentType}</div>
          </div>
          <div class="items">
            ${itemsHTML}
          </div>
          <div class="total">
            <span>Total</span>
            <span>Rp ${getTotal()}</span>
          </div>
          <div class="footer">
            Visit Again!
          </div>
        </body>
      </html>
    `;
  };
  

  const handlePrint = async () => {
    try {
      const html = generateReceiptHTML();
      await Print.printAsync({ html });
    } catch (error) {
      console.error('Print error:', error);
    }
  };

  const handleCompleteOrder = async () => {
    console.log("Order at checkout:", order);
  
    if (!paymentType) {
      Alert.alert("Select Payment Method", "Please choose a payment method before completing the order.");
      return;
    }
  
    if (order.length === 0) {
      Alert.alert("Empty Order", "Please add items to the order before completing.");
      return;
    }
  
    try {
      console.log("Starting order completion...");
      await completeOrder(paymentType, customerName); // Call completeOrder
      console.log("Order completed successfully.");
  
      const navigateToHome = async (shouldPrint) => {
        if (shouldPrint) {
          try {
            await handlePrint(); // Print receipt
            console.log("Receipt printed successfully.");
          } catch (printError) {
            console.error("Printing failed:", printError);
            Alert.alert("Print Failed", "Could not print the receipt.");
          }
        }
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      };
  
      Alert.alert("Order Completed", "Your order has been placed successfully!", [
        {
          text: "OK",
          onPress: () => navigateToHome(shouldPrintReceipt),
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
      <View style={styles.paymentRow}>
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
        <TouchableOpacity
          style={[styles.paymentOption, paymentType === 'QRIS' && styles.selectedPaymentOption]}
          onPress={() => handlePaymentSelection('QRIS')}
        >
          <Text style={styles.paymentOptionText}>QRIS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        onPress={() => setShouldPrintReceipt(!shouldPrintReceipt)}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          {shouldPrintReceipt && (
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>✔</Text>
          )}
        </View>
        <Text style={styles.checkboxLabel}>Print Receipt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteOrder}>
        <Text style={styles.completeButtonText}>Complete Order</Text>
      </TouchableOpacity>
    </View>
  );
}
