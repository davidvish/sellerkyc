// components/ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, Switch, Pressable } from 'react-native';
import Card from './Card';

const ProductCard = ({ product, onToggle, onPress }) => {
  return (
    <Pressable onPress={() => onPress?.(product)}>
      <Card>
        <View style={styles.row}>
          <Image source={{ uri: product.image }} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.meta}>SKU: {product.sku}</Text>
            <Text style={styles.meta}>₹{product.price} • Qty: {product.inventory}</Text>
          </View>

          <View style={styles.actions}>
            <Text style={[styles.status, { color: product.active ? '#059669' : '#DC2626' }]}>
              {product.active ? 'Active' : 'Inactive'}
            </Text>
            <Switch
              value={product.active}
              onValueChange={() => onToggle?.(product.id)}
              thumbColor={product.active ? '#10B981' : '#ccc'}
              trackColor={{ false: '#ddd', true: '#A7F3D0' }}
            />
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  meta: {
    color: '#555',
    fontSize: 13,
    marginTop: 2,
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
});
