

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardTabs } from './DashboardTabs';
import AddEditProduct from '../screens/AddProduct';
import ProductListScreen from '../screens/ViewProduct';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DashboardTabs" component={DashboardTabs} />
        <Stack.Screen name="AddProduct" component={AddEditProduct} />
        <Stack.Screen name="ProductView" component={ProductListScreen} />


      </Stack.Navigator>
     </NavigationContainer>
  );
};

export default StackNavigation;

