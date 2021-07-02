import React from 'react';
import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';
//Gifted Chat library
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
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
        avatar: '',
      },
      isConnected: false,
      image: null,
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

  componentDidMount() {
    // Added name to the text message
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    // this.referenceChatMessages = firebase.firestore().collection("messages");
    this.getMessages();
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
            messages: [],
          });
          // this.referenceChatMessages = firebase.firestore().collection("messages");

          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || "",
        createdAt: data.createdAt.toDate(),
        // user: data.user,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
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
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
      uid: this.state.uid,
      image: message.image || null,
      location: message.location || null,
    });
  }

  //retrieve chat messages from asyncStorage instead of filling message state with static data
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //Saves messages to client-side storage
  //saving message asynchronously and using the setItem method which takes two parameters: a key and a value.
  async saveMessages() {
    try {
      // JSON.stringify() to convert your messages object into a string
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }



  // when a user sends a message, Gifted chat custom function onSend() is called 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        //a callback function to setState so that once the state object is updated, you’ll save its current state into asyncStorage
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  // makes the toolbar disappear when one is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
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

  // renderCustomActions function is responsible for creating the circle button
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    let name = this.props.route.params.name;
    // this.props.navigation.setOptions({ title: name });
    let backgroundColor = this.props.route.params.backgroundColor;
    return (
      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <GiftedChat
          messages={this.state.messages}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
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