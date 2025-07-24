import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AddProductAction } from '../redux/action/AddProductAction';
import { v4 as uuidv4 } from 'uuid';
import DropdownSelect from '../components/DropdownSelect';
import { categoryData } from '../assets/categoryData';
import { getData, saveData } from '../utils/storage';


const AddEditProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [inventory, setInventory] = useState('');
  const [shippingDetails, setShippingDetails] = useState('');
  const [category, setCategory] = useState('');

  const handleImagePick = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response?.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleAddProduct = async () => {
    const productData = {
      id: Date.now().toString(), // or use uuid()
      name: productName,
      description,
      size,
      color,
      price,
      sku,
      inventory,
      shippingDetails,
      image: imageUri,
      category,
      active: true,
    };

      try {
        const cachedProducts = await getData('cachedProducts') || [];
        const updatedProducts = [productData, ...cachedProducts];
        await saveData('cachedProducts', updatedProducts);
        dispatch(AddProductAction(productData));
        navigation.goBack();
      } catch (error) {
        console.error('Error adding product:', error);
      }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter product name"
          placeholderTextColor={'#000'}
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter product description"
          placeholderTextColor={'#000'}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.pickerContainer}>
        <DropdownSelect
        label="Select Category"
        data={categoryData}
        value={category}
        onChange={(item) => setCategory(item.value)}
      />
        </View>

        <Text style={styles.label}>Variants</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholderTextColor={'#000'}
            placeholder="Size"
            value={size}
            onChangeText={setSize}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Color"
                      placeholderTextColor={'#000'}

            value={color}
            onChangeText={setColor}
          />
        </View>

        <Text style={styles.label}>Price (₹)</Text>
        <TextInput
          style={styles.input}
                    placeholderTextColor={'#000'}

          keyboardType="numeric"
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>SKU</Text>
        <TextInput
          style={styles.input}
                    placeholderTextColor={'#000'}

          placeholder="Enter SKU"
          value={sku}
          onChangeText={setSku}
        />

        <Text style={styles.label}>Inventory</Text>
        <TextInput
          style={styles.input}
                    placeholderTextColor={'#000'}

          keyboardType="numeric"
          placeholder="Enter stock quantity"
          value={inventory}
          onChangeText={setInventory}
        />

        <Text style={styles.label}>Shipping Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
                    placeholderTextColor={'#000'}

          placeholder="e.g., Free shipping, ₹50 charge, etc."
          multiline
          numberOfLines={3}
          value={shippingDetails}
          onChangeText={setShippingDetails}
        />

        <Text style={styles.label}>Product Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="add-a-photo" size={32} color="#aaa" />
              <Text style={{ color: '#999', marginTop: 5 }}>Upload Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
          <Text style={styles.submitText}>Save Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEditProduct;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  container: {
    flex: 1,
    padding: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 14,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  imagePicker: {
    backgroundColor: '#fff',
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    marginTop: 32,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  overflow: 'hidden',
  marginTop: 6,
},
picker: {
  height: 50,
  width: '100%',
},

});
