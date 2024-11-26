import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import { OrderContext } from '../contexts/OrderContext';
import EditItemModal from './EditItemModal';
import { fetchMenuItems, fetchOrders, shareDatabase } from '../database';
import styles from '../styles/HomeScreenStyles';
import uuid from 'react-native-uuid'; // For unique IDs
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function HomeScreen({ isDatabaseReady, navigation}) {
  const { order, updateOrder } = useContext(OrderContext);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  console.log('HomeScreen - isDatabaseReady:', isDatabaseReady);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {

    if (!isDatabaseReady) return; // Wait until the database is ready
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Error loading menu items:', error);
        Alert.alert('Error', 'Failed to load menu items from the database.');
      } finally {
        setLoading(false);
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('Exit App', 'Do you want to exit the app?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    });

    loadMenuItems();

    return () => backHandler.remove();
  }, [isDatabaseReady]);

  const handleAddToOrder = (item) => {
    const itemWithUID = { ...item, uid: uuid.v4(), quantity: 1 };
    setSelectedItem(itemWithUID); // Open modal with item customization
    setModalVisible(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item); // Open modal for editing
    setModalVisible(true);
  };

  const saveItemChanges = (updatedItem) => {
    const updatedTotalPrice =
      updatedItem.price +
      (updatedItem.addons ? updatedItem.addons.reduce((sum, addon) => sum + addon.price, 0) : 0);

    const modifiedItem = { ...updatedItem, totalPrice: updatedTotalPrice };

    // Check if the item exists in the cart
    const itemExists = order.some((item) => item.uid === modifiedItem.uid);

    const modifiedOrder = itemExists
      ? order.map((item) => (item.uid === modifiedItem.uid ? modifiedItem : item)) // Update if exists
      : [...order, modifiedItem]; // Append if new

    updateOrder(modifiedOrder); // Update the cart in context
    setModalVisible(false); // Close the modal
  };

  const handleFetchOrders = async () => {
    try {
      const orders = await fetchOrders();
      console.log('Fetched orders:', orders);
      Alert.alert('Orders Fetched', JSON.stringify(orders, null, 2));
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Failed to fetch orders.');
    }
  };

  const handleShareDatabase = async () => {
    try {
      const dbPath = FileSystem.documentDirectory + 'SQLite/pos1111.db';
  
      // Close the database to ensure all data is written to disk
      if (db) {
        await closeDatabase(); // Call your closeDatabase function here
      }
  
      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (!fileInfo.exists) {
        console.log('Database file does not exist at:', dbPath);
        return;
      }
  
      // Share the database file
      await Sharing.shareAsync(dbPath, {
        dialogTitle: 'Share or copy your DB via',
      });
  
      console.log('Database shared successfully!');
    } catch (error) {
      console.error('Error sharing database file:', error);
    }
  };

  const removeItemFromOrder = (uid) => {
    const updatedItems = order.filter((item) => item.uid !== uid);
    updateOrder(updatedItems);
  };

  const getTotal = () => {
    return order.reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
  };

  const handleCheckout = () => {
    if (order.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Please add items to your order before checking out.', [
        { text: 'OK' },
      ]);
      return;
    }
    navigation.navigate('OrderSummary');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Text style={styles.header}>Menu</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rp {item.price}</Text>
              <Button title="Add to Order" onPress={() => handleAddToOrder(item)} />
            </View>
          )}
        />
      </View>
      <View>
        <Button title="Fetch Orders" onPress={handleFetchOrders} />
        <Button title="Share Database" onPress={shareDatabase} />
      </View>

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.header}>Order Summary</Text>
        <FlatList
          data={order}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>{item.name} - Rp {item.price}</Text>
              {/* Addons (if any) */}
      {item.addons &&
        item.addons.map((addon, index) => (
          <Text key={`${item.uid}-addon-${index}`} style={styles.addonText}>
            - {addon.name} +Rp {addon.price}
          </Text>
        ))}
              <View style={styles.orderActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleEditItem(item)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.removeButton]}
                  onPress={() => removeItemFromOrder(item.uid)}
                >
                  <Text style={styles.actionButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <Text style={styles.totalText}>Total: Rp {getTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedItem && (
          <EditItemModal
            item={selectedItem} // Pass the selected item
            onSave={saveItemChanges}
            onCancel={() => setModalVisible(false)}
          />
        )}
      </Modal>
    </View>
  );
}






/*
// HomeScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, TouchableOpacity, Alert,BackHandler  } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';
import EditItemModal from './EditItemModal';
import { menuItems, generateItemWithUID } from '../menuData';
import styles from '../styles/HomeScreenStyles';

export default function HomeScreen({ navigation }) {
  const { order, addToOrder, updateOrder } = useContext(OrderContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Show an alert or prevent back navigation on the Home screen
      Alert.alert("Exit App", "Do you want to exit the app?", [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove();
  }, []);

  const handleAddToOrder = (item) => {
    const itemWithOptions = generateItemWithUID(item);
    setSelectedItem(itemWithOptions);
    setModalVisible(true);
  };

  const saveItemChanges = (updatedItem) => {
    const isNewItem = !order.some((item) => item.uid === updatedItem.uid);
    const updatedTotalPrice =
      updatedItem.price +
      (updatedItem.addons ? updatedItem.addons.reduce((sum, addon) => sum + addon.price, 0) : 0);

    const modifiedItem = { ...updatedItem, totalPrice: updatedTotalPrice };
    const modifiedOrder = isNewItem
      ? [...order, modifiedItem]
      : order.map((item) => (item.uid === modifiedItem.uid ? modifiedItem : item));

    updateOrder(modifiedOrder);
    setModalVisible(false);
  };

  const removeItemFromOrder = (uid) => {
    const updatedItems = order.filter((item) => item.uid !== uid);
    updateOrder(updatedItems);
  };

  const getTotal = () => {
    return order.reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
  };

  const handleCheckout = () => {
    if (order.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Your cart is empty. Please add items to your order before checking out.",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate('OrderSummary');
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <Text style={styles.header}>Menu</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rp {item.price}</Text>
              <Button title="Add to Order" onPress={() => handleAddToOrder(item)} />
            </View>
          )}
        />
      </View>

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.header}>Order Summary</Text>
        <FlatList
          data={order}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>{item.name} - Rp {item.price}</Text>
              {item.addons && item.addons.map((addon, index) => (
                <Text key={index} style={styles.addonText}>
                  - {addon.name} - Rp {addon.price}
                </Text>
              ))}
              <Text style={styles.itemTotal}>Total: Rp {item.totalPrice}</Text>
              <View style={styles.orderActions}>
  <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
    <Text style={styles.actionButtonText}>Edit</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.actionButton, styles.removeButton]} onPress={() => removeItemFromOrder(item.uid)}>
    <Text style={styles.actionButtonText}>Remove</Text>
  </TouchableOpacity>
</View>
            </View>
          )}
        />
        <Text style={styles.totalText}>Total: Rp {getTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('History')}>
          <Text style={styles.historyButtonText}>Order History</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <EditItemModal
          item={selectedItem}
          onSave={saveItemChanges}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}
*/