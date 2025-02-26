import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import { IPAddress } from "@/state/store";

export default function Settings() {
    const[inputIP,setInputIP] = useState("")
    const IP = IPAddress.useState(s => s.IPAddress)

  return (
    <View style={styles.backgroundWrapper}>
      <Text style={styles.textStyles}>Enter The IP:</Text>
      <TextInput onChangeText={setInputIP} style={styles.textinputStyles} />
      <Pressable 
      onPress={()=>IPAddress.update(s=>{s.IPAddress = inputIP})}
      style={styles.buttonStyles}>
        <Text style={styles.buttonTextStyles}>Set</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  backgroundWrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  textinputStyles: {
    height: "7%",
    backgroundColor: "lightblue",
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 17,
    borderWidth: 2,
    paddingLeft: "4%",
    fontSize: 30,
  },
  textStyles: {
    marginTop: "45%",
    marginLeft: "13%",
    color: "black",
    fontSize: 20,
  },
  buttonStyles: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    height: "6%",
    width: "20%",
    backgroundColor: "lightblue",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonTextStyles: {
    fontSize: 20,
  },
});
