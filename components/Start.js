import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      backgroundColor: '',
      backColor: '',
    };
  }
  // onPressChat = (name, imgBackground) => {
  //   if (name == '') {
  //     console.log(name);
  //     return Alert.alert('Please Enter a Name .');
  //   }
  //   this.props.navigation.navigate("Chat", {
  //     name: `${name}`,
  //     backgroundColor: `${imgBackground}`,
  //   });
  // };
  render() {
    return (
      <ImageBackground source={require('../assets/Background-Image.png')} style={styles.imgBackground}>
        <View style={styles.main}>
          <Text style={styles.title}>Let's Chat</Text>
        </View>
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
        <View style={styles.chatOptions}>

          <TextInput
            // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            style={styles.nameInput}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Your Name ...'
          />
          <View style={styles.box}>
            <Text
              style={styles.backgroundColorText}>
              Choose a background color
            </Text>
            <View style={styles.chatBackgroundColour}>
              <TouchableOpacity
                style={styles.chatBackgroundColour1}
                onPress={(color) => this.setState({ backgroundColor: "#090C08" })}
              />
              <TouchableOpacity
                style={styles.chatBackgroundColour2}
                onPress={(color) => this.setState({ backgroundColor: "#474056" })}
              />
              <TouchableOpacity
                style={styles.chatBackgroundColour3}
                onPress={(color) => this.setState({ backgroundColor: "#8A95A5" })}
              />
              <TouchableOpacity
                style={styles.chatBackgroundColour4}
                onPress={(color) => this.setState({ backgroundColor: "#B9C6AE" })}
              />
            </View>
          </View>

          {/* navigate to chat screen */}
          <View style={styles.chatButton}>
            <Button
              accessible={true}
              accessibilityLabel="More color options to choose"
              accessibilityHint="Lets you choose color of your choice"
              accessibilityRole="button"
              color="#757083"
              title="Start Chat"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  backgroundColor: this.state.backgroundColor,
                })
              }
            />
          </View>
        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 40,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    top: 10,
    height: 50,
  },
  main: {
    flex: 0.20,
  },
  chatOptions: {
    flex: 0.70,
    backgroundColor: 'white',
    width: '90%',
    paddingLeft: '1%',
    // paddingRight: '5%',
    paddingBottom: '2%',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 2,
    fontSize: 16,
    fontWeight: "600",
    color: '#000000',
    paddingLeft: '3%',
    backgroundColor: '#f4c2a7',
    width: '60%',
    margin: '3%',
  },
  box: {
    flexDirection: 'column'
  },
  backgroundColorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757083',
    textAlign: 'center',
    // marginBottom: 10,
    paddingTop: 10,
  },
  chatBackgroundColour: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },

  chatBackgroundColour1: {
    backgroundColor: "#090C08",
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },

  chatBackgroundColour2: {
    backgroundColor: "#474056",
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },

  chatBackgroundColour3: {
    backgroundColor: "#8A95A5",
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },

  chatBackgroundColour4: {
    backgroundColor: "#B9C6AE",
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },

  chatButton: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    // marginBottom: 10,
    width: "60%",
    borderRadius: 10,
  },
})

// import React from 'react';
// import {
//   ImageBackground,
//   StyleSheet,
//   Alert,
//   TextInput, KeyboardAvoidingView,
//   Text,
//   View, Platform,
// } from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";


// // const image = require('../assets/background-image.png');

// export default class Start extends React.Component {
//   constructor(props) {
//     super(props),
//       this.state = {
//         backgroundColor: "",
//         name: "",
//       }
//   }

//   onPressChat = (name, backgroundColor) => {
//     if (name == "") {
//       console.log(name);
//       return Alert.alert('Please Enter a Name .');
//     }
//     this.props.navigation.navigate("Chat", {
//       name: `${name}`,
//       backgroundColor: `${backgroundColor}`,
//     });
//   };

//   render() {
//     return (
//       <ImageBackground source={require('../assets/Background-Image.png')} >


//         <Text >Chat Time</Text>
//         <View >
//           <TextInput
//             onChangeText={(name) => this.setState({ name })}
//             value={this.state.name}
//             placeHolder='choose a name.'
//           >
//           </TextInput>
//           <View >
//             <Text >
//               Choose Background Color:
//             </Text>
//             <View >
//               <TouchableOpacity accessible={true}
//                 accessibilityLabel="More options"
//                 accessibilityHint="Lets you choose the color chatinterface."
//                 onPress={() => this.setState({ backgroundColor: "#090C08" })}
//               >
//               </TouchableOpacity>

//               <TouchableOpacity
//                 accessible={true}
//                 accessibilityLabel="More options"
//                 accessibilityHint="Lets you choose the color chatinterface."
//                 onPress={() => this.setState({ backgroundColor: "#474056" })}
//               >
//               </TouchableOpacity>

//               <TouchableOpacity
//                 accessible={true}
//                 accessibilityLabel="More options"
//                 accessibilityHint="Lets you choose the color chatinterface."
//                 onPress={() => this.setState({ backgroundColor: "#8A95A5" })}
//               >
//               </TouchableOpacity>

//               <TouchableOpacity
//                 accessible={true}
//                 accessibilityLabel="More options"
//                 accessibilityHint="Lets you choose the color chatinterface."
//                 onPress={() => this.setState({ backgroundColor: "#B9C6AE" })}
//               ></TouchableOpacity>
//             </View>
//           </View>


//           <TouchableOpacity
//             accessible={true}
//             accessibilityLabel='Start Chatting'
//             accessibilityHint='Let you start chatting'

//             onPress={() => this.onPressChat(this.state.name, this.state.backgroundColor)}
//           >
//             <Text >Start Chatting</Text>
//           </TouchableOpacity>



//           {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
//           }

//         </View>
//       </ImageBackground>
//     )
//   }
// }