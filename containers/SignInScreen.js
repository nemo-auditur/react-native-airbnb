// Import React
import React, { useState } from "react";

// Import ReactNative
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

//import element to handle the status bar
import Constants from "expo-constants";

//Import icons
import { MaterialIcons } from "@expo/vector-icons";

// import axios

import axios from "axios";

export default function SignInScreen({ setToken }) {
  // Set déclaration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async event => {
    try {
      const response = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/log_in",
        {
          email: email,
          password: password
        }
      );

      if (response) {
        console.log(response.data);
        setToken(response.data.token);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      {/*       <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={200}
        enabled
      > */}
      <ScrollView style={[styles.container]}>
        <View style={[styles.globalMargin]}>
          <MaterialIcons name="home" size={128} color="white" />
          <Text style={[styles.title]}>Welcome</Text>
          <TextInput
            placeholder="email"
            autoCapitalize="none"
            style={[styles.input]}
            placeholderTextColor="white"
            value={email}
            onChangeText={email => {
              setEmail(email);
            }}
          ></TextInput>
          <TextInput
            placeholder="password"
            style={[styles.input]}
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          ></TextInput>
          <TouchableOpacity
            style={[styles.signInButton]}
            title="Sign in"
            mode="contained"
            onPress={signIn}
          >
            <Text style={[styles.signInText]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/*       </KeyboardAvoidingView>
       */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    backgroundColor: "#FF5A5F"
  },
  globalMargin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 50,
    marginLeft: 50,
    marginTop: 30
  },
  title: {
    marginTop: 80,
    marginBottom: 80,
    fontSize: 50,
    color: "white"
  },
  input: {
    width: 300,
    marginBottom: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: 35,
    color: "white"
  },
  signInButton: {
    borderRadius: 40,
    backgroundColor: "white",
    marginTop: 60,
    width: 200,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  signInText: {
    color: "#FF5A5F",
    fontSize: 40
  }
});
