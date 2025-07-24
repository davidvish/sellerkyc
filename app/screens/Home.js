import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import {  logout } from '../redux/action/AuthAction';
import Modal from 'react-native-modal';
import LogoutModal from '../components/LogoutModel';
import ToggleSwitch from '../components/ToggleSwitch';

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isOnline, setIsOnline] = useState(true);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

 const handleLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
    navigation.replace('Login');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back 👋</Text>
        <View style={styles.toggleContainer}>
          <ToggleSwitch
            value={isOnline}
            onToggle={() => setIsOnline((prev) => !prev)}
            activeText="Online"
            inactiveText="Offline"
            activeColor="#22C55E"
            inactiveColor="#EF4444"
      />
        </View>
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <MaterialIcons name="cart-outline" size={30} color="#4CAF50" />
          <Text style={styles.metricValue}>24</Text>
          <Text style={styles.metricLabel}>Today’s Orders</Text>
        </View>
        <View style={styles.metricCard}>
          <MaterialIcons name="cube-outline" size={30} color="#FF9800" />
          <Text style={styles.metricValue}>5</Text>
          <Text style={styles.metricLabel}>Out of Stock</Text>
        </View>
        <View style={styles.metricCard}>
          <MaterialIcons name="wallet-outline" size={30} color="#2196F3" />
          <Text style={styles.metricValue}>₹12,800</Text>
          <Text style={styles.metricLabel}>Last Payout</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <MaterialIcons name="cart-arrow-down" size={22} color="#fff" />
          <Text style={styles.actionText}>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
          onPress={() => navigation.navigate('ProductView')}
        >
          <MaterialIcons name="cart" size={22} color="#fff" />
          <Text style={styles.actionText}>View Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLogoutModalVisible(true)}
      >
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <LogoutModal
          isVisible={isLogoutModalVisible}
          onCancel={() => setLogoutModalVisible(false)}
          onConfirm={handleLogout}
        />

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginVertical: 6,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 12,
    marginLeft: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 12,
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
 logoutButton: {
  marginTop: 30,
  backgroundColor: '#EF4444', // red
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
},
logoutText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: '600',
  marginLeft: 8,
},

});
