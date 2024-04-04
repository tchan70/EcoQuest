import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const { width } = Dimensions.get("window"); // Get the device width for responsive design

export default function SignUpPage({ navigation: { replace } }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const handleSignUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          sendEmailVerification(userCredentials.user);
          alert("Please check your email inbox to verify your account!");
          replace('LogInVsSignUpPage');
        })
        .catch(err => alert('Could not sign up! ' + err.message));
    } else {
      alert("Password and Confirm password do not match.");
    }
  };

  function handleGoBack() {
    replace("LogInVsSignUpPage");
  }

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Create Your Account</Text>
      <Image
        source={require("../../../assets/EcoQuestLogo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        autoCapitalize="none"
        secureTextEntry
      />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoBack} style={[styles.button, styles.buttonBack]}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5DC",
  },
  headerText: {
    color: "#228B22",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center', 
  },
  input: {
    height: 50,
    borderColor: "#228B22",
    borderWidth: 2,
    borderRadius: 30,
    width: width * 0.8, 
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8, 
  },
  button: {
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#228B22",
    padding: 10,
    elevation: 4,
  },
  buttonBack: {
    backgroundColor: "grey",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: width * 0.8, // Adjust logo size for balance
    height: width * 0.4, // Maintain aspect ratio
    resizeMode: "contain",
    marginBottom: 20,
  },
});
