import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../redux/action/AuthAction';

const LogoutComponent = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const confirmLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Logout Trigger */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        isVisible={isLogoutModalVisible}
        onBackdropPress={() => setLogoutModalVisible(false)}
        useNativeDriver
        backdropOpacity={0.4}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Confirm Logout</Text>
          <Text style={styles.message}>Are you sure you want to log out?</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => setLogoutModalVisible(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmLogout} style={styles.logoutBtn}>
              <Text style={styles.logoutConfirmText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogoutComponent;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  logoutButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  logoutText: { color: 'white', fontWeight: 'bold' },

  modal: { justifyContent: 'center', margin: 20 },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  message: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  cancelBtn: {
    padding: 10,
    marginRight: 12,
  },
  cancelText: { color: '#666' },
  logoutBtn: {
    backgroundColor: '#dc2626',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoutConfirmText: { color: '#fff', fontWeight: 'bold' },
});
