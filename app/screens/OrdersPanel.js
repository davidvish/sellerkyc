import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const dummyOrders = [
  {
    id: 'ORD123',
    customer: 'Ravi Kumar',
    items: ['T-Shirt (L)', 'Shoes (9)'],
    status: 'New',
  },
  {
    id: 'ORD124',
    customer: 'Anita Sharma',
    items: ['Smartwatch'],
    status: 'Packed',
  },
  {
    id: 'ORD125',
    customer: 'John Doe',
    items: ['Backpack', 'Water Bottle'],
    status: 'Delivered',
  },
];

const OrdersPanel = () => {
  const [orders, setOrders] = useState(dummyOrders);

  const handleAction = (id, action) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: action === 'accept' ? 'Packed' : 'Rejected' }
          : order
      )
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return { backgroundColor: '#FFB300' };
      case 'Packed':
        return { backgroundColor: '#1E88E5' };
      case 'Delivered':
        return { backgroundColor: '#43A047' };
      case 'Rejected':
        return { backgroundColor: '#E53935' };
      default:
        return { backgroundColor: '#9E9E9E' };
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>

      <View style={{ marginTop: 8 }}>
        <Text style={styles.label}>
          <Text style={styles.bold}>Customer:</Text> {item.customer}
        </Text>
        <Text style={[styles.label, { marginTop: 4 }]}>
          <Text style={styles.bold}>Items:</Text>
        </Text>
        {item.items.map((product, index) => (
          <Text key={index} style={styles.itemText}>
            • {product}
          </Text>
        ))}
      </View>

      {item.status === 'New' && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => handleAction(item.id, 'accept')}
          >
            <Text style={styles.actionText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F44336' }]}
            onPress={() => handleAction(item.id, 'reject')}
          >
            <Text style={styles.actionText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Orders Panel</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrdersPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  status: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  bold: {
    fontWeight: '600',
    color: '#333',
  },
  itemText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 12,
    marginTop: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
