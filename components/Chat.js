import React from 'react';
import { View, Text, Button } from 'react-native';


export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    let backgroundColor = this.props.route.params.backgroundColor;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, }}>
        <View >
          <Text style={{ color: '#f4c2a7', marginBottom: 20 }}> Welcome to the Chat </Text>
        </View>
        <Button title="Go to start"
          onPress={() => this.props.navigation.navigate('Start')} />
      </View >
    )
  }
}