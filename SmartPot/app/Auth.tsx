import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.BackgroundStyles}>
      <Text style={styles.HeadingStylesCommon}>
        Smart<Text style={styles.HeadingStylesPot}>Pot</Text>
      </Text>
      <Text style={styles.LoginStyles}>Login</Text>
      <View style={styles.InfoBlockStyles}>
        <Text style={{ marginLeft: "10%", marginTop: "10%", fontSize: 20 }}>
          Username
        </Text>
        <TextInput
          style={styles.TextinputStyles}
          placeholder="Enter your name"
          placeholderTextColor={"grey"}
          onChangeText={setUsername}
        />
        <View style={styles.seperator}></View>
        <Text style={{ marginLeft: "10%", marginTop: "10%", fontSize: 20 }}>
          Password
        </Text>
        <TextInput
          style={styles.TextinputStyles}
          placeholder="Enter your password"
          placeholderTextColor={"grey"}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.seperator}></View>
        <Pressable
          onPress={() => {
            // if (password == "admin" && username == "admin") {
              router.replace("/BottomTabs/Home");
            // }
          }}
          style={styles.LoginButtonStyles}
        >
          <Text style={styles.LoginTextStyles}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BackgroundStyles: {
    flex: 1,
    backgroundColor: "#FFB133",
    justifyContent: "flex-end",
  },
  HeadingStylesCommon: {
    color: "green",
    fontSize: 60,
    marginBottom: "8%",
    marginLeft: "10%",
  },
  HeadingStylesPot: {
    color: "brown",
  },
  LoginStyles: {
    marginLeft: "10%",
    fontSize: 30,
    marginBottom: "2%",
  },
  InfoBlockStyles: {
    backgroundColor: "white",
    alignSelf: "flex-end",
    height: "68%",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  TextinputStyles: {
    height: "7%",
    marginRight: "10%",
    // backgroundColor: "green",
    marginLeft: "10%",
    marginTop: "3%",
    paddingLeft: "1%",
  },
  seperator: {
    height: 1,
    backgroundColor: "black",
    marginHorizontal: "10%",
  },
  LoginButtonStyles: {
    backgroundColor: "#F9A826",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    marginTop: "10%",
    marginHorizontal: "10%",
    borderRadius: 20,
  },
  LoginTextStyles: {
    fontSize: 20,
  },
});
