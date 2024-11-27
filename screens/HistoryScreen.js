/*
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';
import styles from '../styles/HistoryScreenStyles';

export default function HistoryScreen({ navigation }) {
  const { orderHistory } = useContext(OrderContext); // Load order history from context
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);
  const [showJsonIds, setShowJsonIds] = useState([]);

  const toggleExpand = (orderId) => {
    setExpandedOrderIds((prevExpanded) =>
      prevExpanded.includes(orderId)
        ? prevExpanded.filter((id) => id !== orderId)
        : [...prevExpanded, orderId]
    );
  };

  const toggleJsonView = (orderId) => {
    setShowJsonIds((prevShowJson) =>
      prevShowJson.includes(orderId)
        ? prevShowJson.filter((id) => id !== orderId)
        : [...prevShowJson, orderId]
    );
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name} - Rp {item.price}</Text>
      {item.addons && item.addons.map((addon, index) => (
        <Text key={index} style={styles.addonText}>
          - {addon.name} - Rp {addon.price}
        </Text>
      ))}
      <Text style={styles.itemTotal}>Total: Rp {item.totalPrice}</Text>
    </View>
  );

  const renderOrder = ({ item }) => {
    const isExpanded = expandedOrderIds.includes(item.id);
    const isJsonView = showJsonIds.includes(item.id);
    return (
      <View style={styles.orderContainer}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Text style={styles.orderHeader}>Order Date: {new Date(item.date).toLocaleString()}</Text>
          <Text style={styles.orderTotal}>Order Total: Rp {item.total}</Text>
          <Text style={styles.toggleText}>{isExpanded ? "Hide Items" : "Show Items"}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <>
            <FlatList
              data={item.items}
              keyExtractor={(orderItem) => orderItem.uid}
              renderItem={renderOrderItem}
            />
            <TouchableOpacity onPress={() => toggleJsonView(item.id)}>
              <Text style={styles.toggleText}>
                {isJsonView ? "Hide JSON" : "Show JSON"}
              </Text>
            </TouchableOpacity>
            {isJsonView && (
              <ScrollView style={styles.jsonContainer}>
                <Text style={styles.jsonText}>{JSON.stringify(item, null, 2)}</Text>
              </ScrollView>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.historyHeader}>Order History</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(order) => order.id.toString()} // Use order ID from database
        renderItem={renderOrder}
      />
      <TouchableOpacity
        style={styles.developerButton}
        onPress={() => navigation.navigate('DeveloperView')}
      >
        <Text style={styles.developerButtonText}>Developer View</Text>
      </TouchableOpacity>
    </View>
  );
}
  */
