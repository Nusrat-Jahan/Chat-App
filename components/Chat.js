import React from 'react';
import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';
//Gifted Chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// The application’s main Chat component that renders the chat UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    // Added name to the text message
    let name = this.props.route.params.name;
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello ' + name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: name + " has entered to the chat",
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // when a user sends a message, Gifted chat custom function onSend() is called 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // Changing the color of the message bubble to black
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    let backgroundColor = this.props.route.params.backgroundColor;
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor, }}>
      //   <View >
      //     <Text style={{ color: '#f4c2a7', marginBottom: 20 }}> Welcome to the Chat </Text>
      //   </View>
      //   {/* <Button title="Go to start"
      //     onPress={() => this.props.navigation.navigate('Start')} /> */}
      // </View >
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    )
  }
}