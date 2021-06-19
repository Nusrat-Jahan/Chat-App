import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { text: "" };
  // }

  // alert the user input
  alertMyText(input = []) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <NavigationContainer>
        {/* the first screen to load upon starting your app */}
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}
