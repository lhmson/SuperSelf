import React from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";
import Text from "../components/Text";

export default function FooterList(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        large
        style={{
          marginTop: 16,
          marginBottom: Dimensions.get("screen").height / 5,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
