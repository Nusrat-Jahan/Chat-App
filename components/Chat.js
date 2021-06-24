import React from 'react';
import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';
//Gifted Chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');

// The application’s main Chat component that renders the chat UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
    };

    const firebaseConfig = {
      apiKey: "AIzaSyB3pqfADjHPX8LQA7SLWBVVC-R6gUpF2Ds",
      authDomain: "chatapp-7ad15.firebaseapp.com",
      projectId: "chatapp-7ad15",
      storageBucket: "chatapp-7ad15.appspot.com",
      messagingSenderId: "136705746734",
      appId: "1:136705746734:web:436a6b91534ab284c27cbf",
      measurementId: "G-KT69EPQQW7"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //reference to Firestore collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        // user: data.user,
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({
      messages,
    });
  }

  addMessage() {
    const message = this.state.messages[0];
    // add a new list to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
      uid: this.state.uid,
    });
  }

  componentDidMount() {
    // Added name to the text message
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello ' + name,
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: name + " has entered to the chat",
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ],
    // })
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        user: {
          _id: user.uid,
          name: name,
        },
        messages: [],
      });
      this.referenceChatMessages = firebase.firestore().collection("messages");

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // when a user sends a message, Gifted chat custom function onSend() is called 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        //a callback function to setState so that once the state object is updated, you’ll save its current state into asyncStorage
        this.addMessage();
      }
    );
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
    // this.props.navigation.setOptions({ title: name });
    let backgroundColor = this.props.route.params.backgroundColor;
    return (
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          // user={{
          //   _id: 1,
          // }}
          user={this.state.user}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    )
  }
}