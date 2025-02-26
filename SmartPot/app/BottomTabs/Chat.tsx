import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { IPAddress } from "@/state/store";

import IncommingChat from "@/components/IncommingChat";
import OutgoingChat from "@/components/OutgoingChat";

const messageData: { type: string; message: string }[] = [
  { type: "out", message: "hi" },
  { type: "in", message: "bye" },
  
];

const renderItem = ({ type, message }: { type: string; message: string }) => {
  if (type == "in") {
    return <IncommingChat message={message} />;
  } else {
    return <OutgoingChat message={message} />;
  }
};

export default function Chat() {
  const IP = IPAddress.useState((s) => s.IPAddress);
  const [sendPressed, setsendPressed] = useState(false);

  const sendToLLM = () => {
    const sentence = "how to water the plant";
    const fetchQuery = "`http://" + IP + encodeURIComponent(sentence);
    fetch(
      // `http://192.168.1.5:8000/run-script?sentence=${encodeURIComponent(
      //   sentence
      // )}`
      fetchQuery,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
      })
      .catch((error) => {
        console.error("Error calling the API:", error);
      });
  };

  const speak = () => {
    const thingToSay = "hai how are you";
    Speech.VoiceQuality.Enhanced;
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.backgroudStyles}>
      <View style={styles.chatsWrapper}>
        <FlatList
          renderItem={({ item }) =>
            renderItem({ type: item.type, message: item.message })
          } // ✅ Corrected way to call renderItem
          keyExtractor={(item, index) => index.toString()}
          data={messageData}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setsendPressed(!sendPressed);
          sendToLLM();
        }}
        style={[
          styles.sendButtonStyles,
          sendPressed
            ? { backgroundColor: "red" }
            : { backgroundColor: "green" },
        ]}
      >
        <Ionicons name="send-sharp" size={36} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroudStyles: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  sendButtonStyles: {
    marginBottom: "7%",
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "43%",
    borderRadius: 40,
    paddingVertical: "2%",
  },
  chatsWrapper: {
    flex: 1,
  },
});
