import 'react-native-reanimated';

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import { enableScreens } from 'react-native-screens';
import StackNavigation from './app/navigations/StackNavigation';
enableScreens();


const App = () => {
  return (
     <Provider store={store}>
      <StackNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})