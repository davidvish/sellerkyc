// components/DropdownSelect.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownSelect = ({
  label,
  data,
  value,
  onChange,
  placeholder = 'Select item',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.dropdown}
        itemTextStyle={styles.itemText}
        selectedTextStyle={styles.selectedText}
        containerStyle={styles.dropdownContainer}
      />
    </View>
  );
};

export default DropdownSelect;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal:10
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  dropdown: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    fontSize: 14,
    color: '#111',
  },
  dropdownContainer: {
    borderRadius: 10,
  },
});
