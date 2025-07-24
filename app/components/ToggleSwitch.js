// components/ToggleSwitch.js
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const ToggleSwitch = ({
  label,
  value,
  onToggle,
  activeText = 'Active',
  inactiveText = 'Inactive',
  activeColor = '#10B981',
  inactiveColor = '#9CA3AF',
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.switchRow}>
        <Text style={[styles.statusText, { color: value ? activeColor : inactiveColor }]}>
          {value ? activeText : inactiveText}
        </Text>

        <Switch
          value={value}
          onValueChange={onToggle}
          thumbColor={value ? activeColor : '#ccc'}
          trackColor={{ false: '#d1d5db', true: '#a7f3d0' }}
        />
      </View>
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
