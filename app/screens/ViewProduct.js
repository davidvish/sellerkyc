import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getData } from '../utils/storage'; // Adjust path if needed

const { width } = Dimensions.get('window');

const ProductListScreen = ({ navigation }) => {
  const products = useSelector(state => state.product?.product ?? []);
  const [localProducts, setLocalProducts] = useState(products);

  useEffect(() => {
    const loadCachedProducts = async () => {
      const cached = await getData('cachedProducts');
      if (cached) setLocalProducts(cached);
    };
    loadCachedProducts();
  }, []);

  const toggleActive = (id) => {
    setLocalProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, active: !product.active } : product
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product List</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Product List */}
      <FlatList
        data={localProducts}
        keyExtractor={(item, index) => `${item.id ?? item.sku ?? index}`}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onToggle={toggleActive}
            onPress={(product) => console.log('View product:', product)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20, padding: 15 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#888' }}>
            No products added yet.
          </Text>
        }
      />
    </View>
  );
};

export default ProductListScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    // paddingHorizontal: 16,
    // paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: '#F3F4F6',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 2,
    color: '#1F2937',
  },
  meta: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 1,
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
   statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#DCFCE7', // light green bg
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A', // green text
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
