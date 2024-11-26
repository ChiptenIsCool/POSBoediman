import React, { createContext, useState, useEffect } from 'react';
import { initializeDatabase, fetchOrders, insertOrder, insertOrderDetails } from '../database'; // SQLite helper functions

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]); // Current order (in-memory only)
  const [orderHistory, setOrderHistory] = useState([]); // Loaded order history (from SQLite)

  // Fetch order history from SQLite when app initializes
  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        const orders = await fetchOrders(); // Fetch all historical orders from database
        setOrderHistory(orders);
      } catch (error) {
        console.error('Failed to load order history:', error);
      }
    };

    initializeDatabase().then(loadOrderHistory); // Ensure database is initialized before fetching
  }, []);

  const addToOrder = (item) => {
    setOrder((prevOrder) => [...prevOrder, item]); // Add item to in-memory order
  };

  const updateOrder = (updatedOrder) => {
    setOrder(updatedOrder); // Update in-memory order
  };

  const getTotal = () => {
    return order.reduce((sum, item) => sum + (item.totalPrice || item.price), 0); // Calculate total cost
  };

  const completeOrder = async (paymentType, customerName = '') => {
    if (!order || !Array.isArray(order) || order.length === 0) {
      console.warn('Attempted to complete an empty order');
      Alert.alert("Empty Order", "No items in the order. Please add items before completing.");
      return;
    }
  
    try {
      console.log('Order data before completion:', order);
  
      // Call insertOrder to save the order to the database
      await insertOrder(customerName, paymentType, order);
      console.log('Order saved successfully to the database.');
  
      // Clear the current order
      setOrder([]);
      console.log('Order state cleared.');
  
      // Optional: Notify other parts of the app, such as updating order history
      setOrderHistory((prevHistory) => [
        ...prevHistory,
        {
          id: Date.now(), // Temporary unique ID for local state
          customerName,
          paymentType,
          items: [...order],
          total: getTotal(),
          date: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Failed to complete the order:', error);
      Alert.alert("Order Failed", "Could not complete your order. Please try again.");
      throw error; // Rethrow to propagate error if needed
    }
  };
  

  

  return (
    <OrderContext.Provider
      value={{
        order,
        orderHistory,
        addToOrder,
        updateOrder,
        getTotal,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
