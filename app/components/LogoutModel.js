import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutModal = ({ isVisible, onCancel, onConfirm }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      useNativeDriver
      backdropOpacity={0.4}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <MaterialIcons name="logout" size={40} color="#EF4444" style={{ marginBottom: 12 }} />
        <Text style={styles.modalTitle}>Log Out?</Text>
        <Text style={styles.modalMessage}>Are you sure you want to log out of your account?</Text>

        <View style={styles.modalButtonRow}>
          <TouchableOpacity
            onPress={onCancel}
            style={[styles.modalButton, styles.cancelButton]}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onConfirm}
            style={[styles.modalButton, styles.confirmButton]}
          >
            <Text style={styles.confirmText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;


const styles = StyleSheet.create({

 modal: {
  justifyContent: 'center',
  margin: 20,
},
modalContent: {
  backgroundColor: '#fff',
  borderRadius: 16,
  paddingVertical: 30,
  paddingHorizontal: 24,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#111827',
  marginBottom: 6,
},
modalMessage: {
  fontSize: 14,
  color: '#6B7280',
  textAlign: 'center',
  marginBottom: 24,
  lineHeight: 20,
},
modalButtonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginHorizontal: 5,
},
cancelButton: {
  backgroundColor: '#E5E7EB',
},
confirmButton: {
  backgroundColor: '#EF4444',
},
cancelText: {
  color: '#111827',
  fontWeight: '600',
},
confirmText: {
  color: '#fff',
  fontWeight: '600',
},


})
