import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LogInVsSignUpPage({ navigation: { replace } }) {
  function handleSignUpClick() {
    replace("SignUpPage");
  }

  function handleLoginClick() {
    replace("LoginPage");
  }

  return (
    <View style={styles.view}>
      <Image
        source={require("../../../assets/EcoQuestLogo.png")}
        style={styles.logo}
      />
      <TouchableOpacity onPress={handleLoginClick} style={[styles.LoginButton]}>
        <Text style={styles.text}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignUpClick}
        style={[styles.SignUpButton]}
      >
        <Text style={styles.text}>SIGN UP</Text>
      </TouchableOpacity>
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
  LoginButton: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#b0ca8c",
    backgroundColor: "#a8c47f",
    width: width * 0.8,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 4,
  },
  SignUpButton: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#9ec8e4",
    backgroundColor: "#93c2e1",
    width: width * 0.8,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 4,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  logo: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
