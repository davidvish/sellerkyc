
// Import your screens
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';


import OrdersPanel from '../screens/OrdersPanel';
import PaymentsOverview from '../screens/PaymentsOverview';
import ShopSettings from '../screens/ShopSettings';
import Home from '../screens/Home';


const Tab = createBottomTabNavigator();

export const DashboardTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'OrdersPanel') {
            iconName = 'receipt';
          } else if (route.name === 'PaymentsOverview') {
            iconName = 'account-balance-wallet';
          } else if (route.name === 'ShopSettings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
     <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="OrdersPanel"
        component={OrdersPanel}
        options={{ title: 'Orders' }}
      />
      <Tab.Screen
        name="PaymentsOverview"
        component={PaymentsOverview}
        options={{ title: 'Payments' }}
      />
      <Tab.Screen
        name="ShopSettings"
        component={ShopSettings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

