import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { IPAddress } from "@/state/store";

import IncommingChat from "@/components/IncommingChat";
import OutgoingChat from "@/components/OutgoingChat";

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
  const [message, setMessage] = useState("");

  type MessageDataType = { type: string; message: string }[] | null;
  const [messageData, setMessageData] = useState<MessageDataType>(null);

  const sendToLLM = async (message: string) => {
    setMessageData((prev) =>
      prev
        ? [...prev, { type: "out", message: message }]
        : [{ type: "out", message: message }]
    );
    const fetchQuery = "`http://" + IP + encodeURIComponent(message);
    console.log(IP);
    fetch(`http://${IP}/run-script?sentence=${encodeURIComponent(message)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageData((prev) =>
          prev
            ? [...prev, { type: "in", message: data[0] }]
            : [{ type: "in", message: data[0] }]
        );
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
          } 
          keyExtractor={(item, index) => index.toString()}
          data={messageData}
        />

      </View>
      <View style={styles.BottomView}>
        <TouchableOpacity
          onPress={() => {
            setsendPressed(!sendPressed);
            
            sendToLLM(message);
            setMessage("")
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
        <TextInput
          onChangeText={setMessage}
          style={styles.textboxStyles}
        />
      </View>
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
    marginBottom: "4%",
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "43%",
    borderRadius: 40,
    paddingVertical: "2%",
  },
  chatsWrapper: {
    flex: 5,
  },
  BottomView: {
    flex: 1,
  },
  textboxStyles: {
    // backgroundColor:"red",
    // marginBottom:"5%",
    fontSize: 20,
    height: "35%",
    marginHorizontal: "10%",
    borderRadius: 15,
    paddingLeft: "2%",
    borderWidth: 2,
  },
});
