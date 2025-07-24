import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const KycModal = ({ isVisible, onClose, onOk }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      useNativeDriver
      backdropOpacity={0.5}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={styles.kycModalBox}>
        <Text style={styles.modalTitle}>Submitted</Text>
        <Text style={styles.modalMessage}>KYC details submitted successfully.</Text>

        <TouchableOpacity
          onPress={onOk}
          style={styles.okButton}
        >
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default KycModal;


const styles = StyleSheet.create({
  kycModalBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111',
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
