import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import * as Speech from "expo-speech";
import { IPAddress } from "@/state/store";

import { LoadingState } from "@/state/store";

import IncommingChat from "@/components/IncommingChat";
import OutgoingChat from "@/components/OutgoingChat";

import SendIconCustom from "@/components/SendIconCustom";

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
  const [messageData, setMessageData] = useState<MessageDataType>([
    {
      type: "in",
      message: "Hello! 😊 I'm here to assist you. How can I help you today?",
    },
  ]);

  const sendToLLM = async (message: string) => {
    setMessageData((prev) =>
      prev
        ? [...prev, { type: "out", message: message }]
        : [{ type: "out", message: message }]
    );
    const fetchQuery = "`http://" + IP + encodeURIComponent(message);
    // console.log(IP);
    fetch(`http://${IP}/run-script?sentence=${encodeURIComponent(message)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageData((prev) =>
          prev
            ? [...prev, { type: "in", message: data["prediction"] }]
            : [{ type: "in", message: data["prediction"] }]
        );
        console.log(data)
        speak(data["prediction"]);
        LoadingState.update((s) => {
          s.isLoaded = true;
        });
      })
      .catch((error) => {
        console.error("Error calling the API:", error);
      });
  };

  const speak = (response: string) => {
    const thingToSay = response;
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
      <KeyboardAvoidingView
      keyboardVerticalOffset={100}
      style={styles.BottomView}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.textboxStyles}
        />
        <TouchableOpacity
          onPress={() => {
              if(!(message=="")){
                setsendPressed(!sendPressed);
                LoadingState.update((s) => {
                  s.isLoaded = false;
                });
    
                sendToLLM(message);
                setMessage("");
              }


          }}
          style={[styles.sendButtonStyles]}
        >
          <SendIconCustom />
        </TouchableOpacity>
      </KeyboardAvoidingView> 
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
    // marginBottom: "4%",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: "43%",
    borderRadius: 40,
    height: "100%",
    width: "12%",
    marginRight: "10%",
    paddingVertical: "2%",
    // paddingHorizontal:"%",
    marginLeft: "2%",
  },
  chatsWrapper: {
    flex: 15,
    // backgroundColor:"red",
    paddingBottom: "5%",
  },
  BottomView: {
    flex: 1,
    flexDirection: "row",
    // paddingTop:"10%",
    // backgroundColor:"red",
  },
  textboxStyles: {
    // backgroundColor:"red",
    // marginBottom:"5%",
    marginTop:"1%",
    fontSize: 20,
    height: "85%",
    width: "70%",
    // marginHorizontal: "10%",
    marginLeft: "10%",
    borderRadius: 15,
    paddingLeft: "2%",
    borderWidth: 2,
  },
});
