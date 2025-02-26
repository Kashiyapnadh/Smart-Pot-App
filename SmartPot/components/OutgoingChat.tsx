import { View, StyleSheet, Text } from "react-native";

export default function OutgoingChat({message}:{message:string}) {
  return (
    <View style={styles.bubbleContainer}>
      <View style={styles.bubbleStyle}>
        <Text style={styles.textStyles}>{message}</Text>
      </View>
      <View style={styles.profileStyles}>
        <Text style={{ fontSize: 27 }}>{"U"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: "row",
    minHeight: "7%",
    justifyContent: "flex-end", // Align content to the right
    alignItems: "center",
  },
  bubbleStyle: {
    backgroundColor: "orange",
    maxWidth: "70%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  profileStyles: {
    backgroundColor: "green",
    height: 45,
    width: 45, // Use fixed width to maintain shape
    alignSelf: "center",
    marginLeft: 8, // Space between message and profile
    borderRadius: 100,

    // Center the text inside the profile icon
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"3%"
  },
  textStyles: {
    fontSize: 20,
    color: "black",
  },
});
