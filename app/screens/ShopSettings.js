import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const ShopSettings = () => {
  const [shopName, setShopName] = useState('');
  const [logoUri, setLogoUri] = useState('');
  const [category, setCategory] = useState('');
  const [zones, setZones] = useState([]);

  const allZones = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets?.length) {
        setLogoUri(response.assets[0].uri);
      }
    });
  };

  const toggleZone = (zone) => {
    if (zones.includes(zone)) {
      setZones(zones.filter((z) => z !== zone));
    } else {
      setZones([...zones, zone]);
    }
  };

  const handleSave = () => {
    if (!shopName || !category || zones.length === 0) {
      Alert.alert('Missing Fields', 'Please complete all required fields.');
      return;
    }

    // Submit logic here...
    Alert.alert('Saved', 'Shop settings updated successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shop Settings</Text>

      {/* Shop Name */}
      <Text style={styles.label}>Shop Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        value={shopName}
        onChangeText={setShopName}
      />

      {/* Shop Logo */}
      <Text style={styles.label}>Shop Logo</Text>
      <TouchableOpacity style={styles.logoPicker} onPress={handleImagePick}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logoImage} />
        ) : (
          <Text style={styles.logoPlaceholder}>Select Image</Text>
        )}
      </TouchableOpacity>

      {/* Category */}
      <Text style={styles.label}>Shop Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Grocery" value="grocery" />
          <Picker.Item label="Pharmacy" value="pharmacy" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Fashion" value="fashion" />
        </Picker>
      </View>

      {/* Delivery Zones */}
      <Text style={styles.label}>Delivery Zones</Text>
      <View style={styles.zoneContainer}>
        {allZones.map((zone) => (
          <TouchableOpacity
            key={zone}
            style={[
              styles.zoneChip,
              zones.includes(zone) && styles.zoneChipSelected,
            ]}
            onPress={() => toggleZone(zone)}
          >
            <Text
              style={[
                styles.zoneText,
                zones.includes(zone) && styles.zoneTextSelected,
              ]}
            >
              {zone}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ShopSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1F2937',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#111827',
  },
  logoPicker: {
    height: 120,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  logoPlaceholder: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D1D5DB',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  zoneContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  zoneChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    margin: 4,
  },
  zoneChipSelected: {
    backgroundColor: '#10B981',
  },
  zoneText: {
    color: '#374151',
    fontWeight: '500',
  },
  zoneTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
    shadowColor: '#22C55E',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
