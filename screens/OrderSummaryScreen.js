import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';
import styles from '../styles/OrderSummaryStyles';

export default function OrderSummaryScreen({ navigation }) {
  const { order, getTotal, updateOrder } = useContext(OrderContext);

  // Debugging: Log the order to confirm structure
  console.log('Order data:', order);

  const removeItem = (uid) => {
    const updatedOrder = order.filter((item) => item.uid !== uid);
    updateOrder(updatedOrder);
  };

  const handleProceedToCheckout = () => {
    if (order.length === 0) {
      Alert.alert('Empty Order', 'Please add items before proceeding to checkout.', [{ text: 'OK' }]);
      return;
    }
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={order}
        keyExtractor={(item, index) => {
          const key = item.uid || `${item.name}-${index}`;
          //console.log('FlatList key:', key); // Debugging log
          return key;
        }}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name} - Rp {item.price}</Text>
            {item.addons &&
              item.addons.map((addon, index) => {
                const addonKey = `${item.uid}-addon-${addon.id || index}`;
                console.log('Addon key:', addonKey); // Debugging log
                return (
                  <Text key={addonKey} style={styles.addonText}>
                    - {addon.name} - Rp {addon.price}
                  </Text>
                );
              })}
            <Text style={styles.itemTotal}>Total: Rp {item.totalPrice}</Text>
            <TouchableOpacity onPress={() => removeItem(item.uid)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: Rp {getTotal()}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
